// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openWeatherApi from "@/services/server/OpenWeather/openWeatherService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "GET": {
      try {
        const query = req.query;
        const lon = query?.lon;
        const lat = query?.lat;
        if (!lon || !lat || typeof lon !== 'string' || typeof lat !== 'string' || isNaN(+lon) || isNaN(+lat)) {
          return res.status(400).send("Bad request");
        }

        const forecast = await openWeatherApi.forecast({
          lon: +lon,
          lat: +lat,
        });
        return res.status(200).json(forecast);
      } catch (error) {
        console.log('error:', error)
        return res.status(400).send("Bad request");
      }
    }
  }

  return res.status(404).send("Not found");
}
