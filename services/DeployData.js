import client from "../utils/prismadb";
import { DateTime, Duration } from "luxon";

export const getMultiData = async (website_id, indicator) => {
  let clientTable;
  if (indicator === "view") {
    clientTable = client.view;
  }
  if (!clientTable) return "invalid indicator";

  let timerange = 6; // bekommt man von user table
  let chartdata = [];

  while (timerange >= 0) {
    chartdata.push({
      // if für anderes Zeitformat
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
  return chartdata;
};

export const getCompactData = async (website_id, indicator) => {
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

  const timerange = 6;

  if (indicator === "avg-visit-time") {
    const sessions = await client.session
      .findMany({
        where: {
          website_id: parseInt(website_id),
          updated: {
            gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
          },
        },
        select: {
          views: {
            where: {
              created: {
                gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
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
    if (!sessions.length) return "0s";

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
            gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
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
    const bouncers = sessions.filter((session) => session._count.view === 1).length;

    // console.log("sessions", sessions);
    return Math.floor((bouncers / sessions.length) * 100) + "%";
  }

  return await clientTable
    .count({
      where: {
        website_id: parseInt(website_id),
        [field]: {
          gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
        },
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const getBigChartData = async (website_id, indicator) => {
  let clientTable;
  if (indicator === "country") {
    clientTable = client.session;
  }
  if (!clientTable) return "invalid indicator";

  let chartdata = [];
  let data;
  const timerange = 6;

  data = await clientTable
    .groupBy({
      by: [indicator],
      where: {
        website_id: parseInt(website_id),
        created: {
          gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
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
      // name: referrer.referrer ? referrer.referrer : "None/Direct", // für referrer speziell, versuchen im frontend zu lösen auch wegen i18n
      value: data._count[indicator],
    });
  });
  return chartdata;
};

export const getSmallTextData = async (website_id, indicator) => {
  let clientTable;
  if (indicator === "path") {
    clientTable = client.view;
  } else {
    clientTable = client.session;
  }
  if (!clientTable) return "invalid indicator";

  let chartdata = [];
  let data;
  const timerange = 6;

  data = await clientTable
    .groupBy({
      by: [indicator],
      where: {
        website_id: parseInt(website_id),
        created: {
          gte: DateTime.now().minus({ days: timerange }).startOf("day").toISO(),
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
      // name: referrer.referrer ? referrer.referrer : "None/Direct", // für referrer speziell, versuchen im frontend zu lösen auch wegen i18n
      value: data._count[indicator],
    });
  });
  return chartdata;
};
