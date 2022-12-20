import client from "../utils/prismadb";
import { DateTime, Duration } from "luxon";

export const getMultiData = async (website_id, user_id, indicator) => {
  let clientTable;
  if (indicator === "view") {
    clientTable = client.view;
  }
  if (!clientTable) return "invalid indicator";

  let chartdata = [];
  const timeunits = await getUserTimerange(user_id);
  let timerange = Object.values(timeunits.minus)[0];
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
    const sessions = await client.session
      .findMany({
        where: {
          website_id: parseInt(website_id),
          updated: {
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
    if (sessions === undefined || sessions.length === 0) return "0s";

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
    let avg = Duration.fromObject({ seconds: Math.round(visitTimeAllSessions / sessions.length) });
    avg = avg.shiftTo("hours", "minutes", "seconds").toObject();
    if (avg.hours) return avg.hours + "h " + avg.minutes + "m " + avg.seconds + "s";
    else if (avg.minutes) return avg.minutes + "m " + avg.seconds + "s";
    else if (avg.seconds) return avg.seconds + "s";
    else return "0s";
  }

  if (indicator === "bounce-rate") {
    const sessions = await client.session
      .findMany({
        where: {
          website_id: parseInt(website_id),
          updated: {
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
    const bouncers = sessions.filter((session) => session._count.views === 1).length;

    return Math.floor((bouncers / sessions.length) * 100) + "%";
  }

  return await clientTable
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
};

export const getBigChartData = async (website_id, user_id, indicator) => {
  let clientTable;
  if (indicator === "country") {
    clientTable = client.session;
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
        created: {
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

export const getSmallTextData = async (website_id, user_id, indicator) => {
  let clientTable;
  if (indicator === "path") {
    clientTable = client.view;
  } else {
    clientTable = client.session;
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
        created: {
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

export const getLiveData = async (website_id) => {
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

const getUserTimerange = async (user_id) => {
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
  if (timerange.timerange === "year") return { minus: { month: 11 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "180") return { minus: { month: 5 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "90") return { minus: { days: 90 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "month") return { minus: { days: 30 }, startOf: "month", timeunit: timerange.timerange };
  else if (timerange.timerange === "30") return { minus: { days: 30 }, startOf: "week", timeunit: timerange.timerange };
  else if (timerange.timerange === "week") return { minus: { days: 6 }, startOf: "week", timeunit: timerange.timerange };
  else if (timerange.timerange === "7") return { minus: { days: 6 }, startOf: "day", timeunit: timerange.timerange };
  else if (timerange.timerange === "day") return { minus: { hours: 23 }, startOf: "day", timeunit: timerange.timerange };
  else if (timerange.timerange === "24") return { minus: { hours: 23 }, startOf: "hour", timeunit: timerange.timerange };
  return timerange;
};
