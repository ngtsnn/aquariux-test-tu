// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openWeatherApi from "@/services/server/OpenWeather/openWeatherService";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  try {
    switch (method) {
      case "GET": {
        const query = req.query;
        const geoId = query.geoId;
        if (typeof geoId !== "string") {
          return res.status(400).send("Bad request");
        }

        const weatherInfo = await openWeatherApi.getWeather(geoId);
        return res.status(200).json(weatherInfo);
      }
    }

    return res.status(404).send("Not found");
  } catch (error) {
    return res.status(400).send("Bad request");
  }
}
