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
        const search = query.q;
        if (typeof search !== "string") {
          return res.status(400).send("Bad request");
        }

        const locations = await openWeatherApi.search(search);
        return res.status(200).json(locations);
      } catch (error) {
        return res.status(400).send("Bad request");
      }
    }
  }

  return res.status(404).send("Not found");
  
}
