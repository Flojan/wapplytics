import client from "../utils/prismadb";
import { DateTime, Duration, Settings } from "luxon";

export const getMultiData = async (website_id, user_id, indicator) => {
  let clientTable;
  if (indicator === "view") {
    clientTable = client.view;
  }
  if (!clientTable) return "invalid indicator";

  let chartdata = [];
  const timeunits = await getUserTimerange(user_id);
  let timerange = Object.values(timeunits.multidata)[0];
  let timeunit = timeunits.timeunit;
  if (timeunit === "24" || timeunit === "day") {
    while (timerange >= 0) {
      if (timeunit === "day" ? DateTime.now().minus({ hours: timerange }).valueOf() > DateTime.now().startOf("day").valueOf() : true) {
        chartdata.push({
          name: DateTime.now().minus({ hours: timerange }).toFormat("HH"),
          value: await clientTable
            .count({
              where: {
                website_id: parseInt(website_id),
                created: {
                  gte: DateTime.now().minus({ hours: timerange }).startOf("hour").toISO(),
                  lte: DateTime.now()
                    .minus({ hours: timerange - 1 })
                    .startOf("hour")
                    .toISO(),
                },
              },
            })
            .catch((e) => {
              console.log("ERROR", e);
            }),
        });
      }
      timerange -= 1;
    }
  } else if (timeunit === "7" || timeunit === "week") {
    while (timerange >= 0) {
      if (timeunit === "week" ? DateTime.now().minus({ days: timerange }).valueOf() > DateTime.now().startOf("week").valueOf() : true) {
        chartdata.push({
          name: DateTime.now().minus({ days: timerange }).toFormat("EEE dd.MM.yyyy"),
          value: await clientTable
            .count({
              where: {
                website_id: parseInt(website_id),
                created: {
                  gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
                  lte: DateTime.now()
                    .minus({ days: timerange - 1 })
                    .startOf("day")
                    .toISO(),
                },
              },
            })
            .catch((e) => {
              console.log("ERROR", e);
            }),
        });
      }
      timerange -= 1;
    }
  } else if (timeunit === "30" || timeunit === "month") {
    while (timerange >= 0) {
      if (timeunit === "month" ? DateTime.now().minus({ days: timerange }).valueOf() > DateTime.now().startOf("month").valueOf() : true) {
        chartdata.push({
          name: DateTime.now().minus({ days: timerange }).toFormat("EEE dd.MM.yyyy"),
          value: await clientTable
            .count({
              where: {
                website_id: parseInt(website_id),
                created: {
                  gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
                  lte: DateTime.now()
                    .minus({ days: timerange - 1 })
                    .startOf("day")
                    .toISO(),
                },
              },
            })
            .catch((e) => {
              console.log("ERROR", e);
            }),
        });
      }
      timerange -= 1;
    }
  } else if (timeunit === "90") {
    while (timerange >= 0) {
      chartdata.push({
        name: DateTime.now().minus({ days: timerange }).toFormat("EEE dd.MM.yyyy"),
        value: await clientTable
          .count({
            where: {
              website_id: parseInt(website_id),
              created: {
                gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
                lte: DateTime.now()
                  .minus({ days: timerange - 1 })
                  .startOf("day")
                  .toISO(),
              },
            },
          })
          .catch((e) => {
            console.log("ERROR", e);
          }),
      });
      timerange -= 1;
    }
  } else if (timeunit === "180") {
    while (timerange >= 0) {
      chartdata.push({
        name: DateTime.now().minus({ month: timerange }).toFormat("LLL"),
        value: await clientTable
          .count({
            where: {
              website_id: parseInt(website_id),
              created: {
                gte: DateTime.now().minus({ month: timerange }).startOf("month").toISO(),
                lte: DateTime.now()
                  .minus({ month: timerange - 1 })
                  .startOf("month")
                  .toISO(),
              },
            },
          })
          .catch((e) => {
            console.log("ERROR", e);
          }),
      });
      timerange -= 1;
    }
  } else if (timeunit === "year") {
    while (timerange >= 0) {
      chartdata.push({
        name: DateTime.now().minus({ month: timerange }).toFormat("LLL"),
        value: await clientTable
          .count({
            where: {
              website_id: parseInt(website_id),
              created: {
                gte: DateTime.now().minus({ month: timerange }).startOf("month").toISO(),
                lte: DateTime.now()
                  .minus({ month: timerange - 1 })
                  .startOf("month")
                  .toISO(),
              },
            },
          })
          .catch((e) => {
            console.log("ERROR", e);
          }),
      });
      timerange -= 1;
    }
  }
  return chartdata;
};

export const getCompactData = async (website_id, user_id, indicator) => {
  let clientTable;
  let field;
  if (indicator === "view") {
    clientTable = client.view;
    field = "created";
  } else {
    clientTable = client.session;
    field = "updated";
  }
  if (!clientTable) return "invalid indicator";
  const timeunits = await getUserTimerange(user_id);

  if (indicator === "avg-visit-time") {
    return await getAvgVisitTime(website_id, timeunits, field);
  }
  if (indicator === "bounce-rate") {
    return await getBounceRate(website_id, timeunits, field);
  }
  return await getBasicNumber(website_id, clientTable, timeunits, field);
};

const getBasicNumber = async (website_id, clientTable, timeunits, field) => {
  const number = await clientTable
    .count({
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });

  const cmpNumber = await clientTable
    .count({
      where: {
        AND: [
          {
            website_id: parseInt(website_id),
            [field]: {
              gte: DateTime.now().minus(timeunits.cmp).startOf(timeunits.startOf).toISO(),
            },
          },
          {
            website_id: parseInt(website_id),
            [field]: {
              lte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
            },
          },
        ],
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  return { number, diff: number - cmpNumber };
};

const getBounceRate = async (website_id, timeunits, field) => {
  const sessions = await client.session
    .findMany({
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
        },
      },
      select: {
        _count: {
          select: {
            views: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  let bouncers = sessions.filter((session) => session._count.views === 1).length;
  bouncers = bouncers !== 0 ? Math.floor((bouncers / sessions.length) * 100) : bouncers;

  const cmpsessions = await client.session
    .findMany({
      where: {
        AND: [
          {
            website_id: parseInt(website_id),
            [field]: {
              gte: DateTime.now().minus(timeunits.cmp).startOf(timeunits.startOf).toISO(),
            },
          },
          {
            website_id: parseInt(website_id),
            [field]: {
              lte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
            },
          },
        ],
      },
      select: {
        _count: {
          select: {
            views: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  let cmpbouncers = cmpsessions.filter((session) => session._count.views === 1).length;
  cmpbouncers = cmpbouncers !== 0 ? Math.floor((cmpbouncers / cmpsessions.length) * 100) : cmpbouncers;

  return { number: bouncers, diff: bouncers - cmpbouncers };
};

const getAvgVisitTime = async (website_id, timeunits, field) => {
  const sessions = await client.session
    .findMany({
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
        },
      },
      select: {
        views: {
          where: {
            created: {
              gte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
            },
          },
          select: {
            created: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  if (sessions === undefined || sessions.length === 0) return { number: 0, diff: 0 };

  let visitTimeAllSessions = 0;
  sessions.forEach((session) => {
    let visitTimeOneSession = 0;
    for (let i = 0; i < session.views.length; i++) {
      if (session.views[i + 1]) {
        let diffInSeconds = DateTime.fromJSDate(session.views[i + 1].created)
          .diff(DateTime.fromJSDate(session.views[i].created), ["seconds"])
          .toObject().seconds;
        if (diffInSeconds <= 1800) visitTimeOneSession += diffInSeconds;
      }
    }
    visitTimeAllSessions += visitTimeOneSession;
  });
  const avgTime = Math.round(visitTimeAllSessions / sessions.length);

  const cmpsessions = await client.session
    .findMany({
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus(timeunits.cmp).startOf(timeunits.startOf).toISO(),
        },
      },
      select: {
        views: {
          where: {
            AND: [
              {
                website_id: parseInt(website_id),
                created: {
                  gte: DateTime.now().minus(timeunits.cmp).startOf(timeunits.startOf).toISO(),
                },
              },
              {
                website_id: parseInt(website_id),
                created: {
                  lte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
                },
              },
            ],
          },
          select: {
            created: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  if (cmpsessions === undefined || cmpsessions.length === 0) return { number: avgTime, diff: 0 };

  let cmpvisitTimeAllSessions = 0;
  cmpsessions.forEach((session) => {
    let visitTimeOneSession = 0;
    for (let i = 0; i < session.views.length; i++) {
      if (session.views[i + 1]) {
        let diffInSeconds = DateTime.fromJSDate(session.views[i + 1].created)
          .diff(DateTime.fromJSDate(session.views[i].created), ["seconds"])
          .toObject().seconds;
        if (diffInSeconds <= 1800) visitTimeOneSession += diffInSeconds;
      }
    }
    cmpvisitTimeAllSessions += visitTimeOneSession;
  });
  if (website_id === "4") {
    console.log("🚀 ~ file: DeployData.js:374 ~ cmpsessions.forEach ~ cmpvisitTimeAllSessions", cmpvisitTimeAllSessions);
    console.log("🚀 ~ file: DeployData.js:378 ~ getAvgVisitTime ~ cmpsessions.length", cmpsessions.length);
  }

  let cmpavgTime = Math.round(cmpvisitTimeAllSessions / cmpsessions.length);

  return { number: avgTime, diff: avgTime - cmpavgTime };
};

export const getNameValueData = async (website_id, user_id, indicator) => {
  let clientTable, field;
  if (indicator === "path") {
    clientTable = client.view;
    field = "created";
  } else {
    clientTable = client.session;
    field = "updated";
  }
  if (!clientTable) return "invalid indicator";
  const timeunits = await getUserTimerange(user_id);

  let chartdata = [];
  let data;

  data = await clientTable
    .groupBy({
      by: [indicator],
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus(timeunits.minus).startOf(timeunits.startOf).toISO(),
        },
      },
      _count: {
        [indicator]: true,
      },
      orderBy: {
        _count: {
          [indicator]: "desc",
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });

  data.forEach((data) => {
    chartdata.push({
      name: data[indicator],
      value: data._count[indicator],
    });
  });
  return chartdata;
};

export const getLiveData = async (website_id, user_id) => {
  await getUserTimezone(user_id);
  return await client.session
    .count({
      where: {
        website_id: parseInt(website_id),
        updated: {
          gte: DateTime.now().minus({ minutes: 5 }).toISO(),
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

const getUserTimezone = async (user_id) => {
  const timezone = await client.user
    .findUnique({
      where: {
        id: parseInt(user_id),
      },
      select: {
        timezone: true,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  Settings.defaultZone = timezone.timezone;
};

const getUserTimerange = async (user_id) => {
  await getUserTimezone(user_id);
  const timerange = await client.user
    .findUnique({
      where: {
        id: parseInt(user_id),
      },
      select: {
        timerange: true,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  if (timerange.timerange === "year")
    return { multidata: { month: 11 }, minus: { month: 11 }, cmp: { month: 23 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "180")
    return { multidata: { month: 5 }, minus: { month: 5 }, cmp: { month: 11 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "90")
    return { multidata: { days: 90 }, minus: { days: 90 }, cmp: { days: 181 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "month")
    return { multidata: { days: 30 }, minus: { days: 0 }, cmp: { days: 31 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "30")
    return { multidata: { days: 30 }, minus: { days: 30 }, cmp: { days: 61 }, startOf: "week", timeunit: timerange.timerange };
  else if (timerange.timerange === "week")
    return { multidata: { days: 6 }, minus: { days: 0 }, cmp: { days: 7 }, startOf: "week", timeunit: timerange.timerange };
  else if (timerange.timerange === "7")
    return { multidata: { days: 6 }, minus: { days: 6 }, cmp: { days: 13 }, startOf: "day", timeunit: timerange.timerange };
  else if (timerange.timerange === "day")
    return { multidata: { hours: 23 }, minus: { hours: 0 }, cmp: { hours: 24 }, startOf: "day", timeunit: timerange.timerange };
  else if (timerange.timerange === "24")
    return { multidata: { hours: 23 }, minus: { hours: 23 }, cmp: { hours: 47 }, startOf: "hour", timeunit: timerange.timerange };
  return timerange;
};
