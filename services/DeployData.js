import client from "../utils/prismadb";
import { DateTime } from "luxon";

const generateJSON = (timerange) => {};

const getDefaultTimerange = () => {
  return "";
};

export const getViews = async (website_id, tile) => {
  let timerange = 6; // bekommt man von user table
  let i18n = "de"; // bekommt man von user table
  let chartdata = [];

  console.log(DateTime.now().minus({ days: timerange }).startOf("day").toISO());
  console.log(
    DateTime.now()
      .minus({ days: timerange - 1 })
      .startOf("day")
      .toISO()
  );

  while (timerange >= 0) {
    chartdata.push({
      // if für anderes Zeitformat
      date: DateTime.now().minus({ days: timerange }).setLocale(i18n).toFormat("EEE dd.MM.yyyy"),
      views: await client.view
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

  // if (timeRange === 1) {
  //   return await client.view
  //     .count({
  //       where: {
  //         website_id: 2,
  //         created: {
  //           gte: dayjs().subtract(timerange, "day").toISOString(),
  //         },
  //       },
  //     })
  //     .catch((e) => {
  //       console.log("ERROR", e);
  //     });
  // }
};
