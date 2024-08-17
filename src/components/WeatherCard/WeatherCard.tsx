import { emptyString } from "@/constants/misc";
import { GeoWeather } from "@/types/weather";
import cn from "@/utils/cn";
import { capitalize } from "@/utils/string";
import { getWeatherIcon } from "@/utils/weather";
import { Card, CardProps } from "@nextui-org/react";
import { format, isValid } from "date-fns";
import { isNil } from "lodash";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import React, { FC, useMemo } from "react";

interface GeoWeatherCardProps extends CardProps {
  weather: GeoWeather;
}

const WeatherCard: FC<GeoWeatherCardProps> = ({
  weather,
  className,
  ...props
}) => {
  const weatherDesc = useMemo(() => {
    return weather?.weather
      ?.map((recap) =>
        recap?.description ? capitalize(recap.description) : undefined
      )
      ?.filter((desc) => !isNil(desc))
      ?.join(". ");
  }, [weather?.weather]);

  return (
    <Card className={cn("lg:p-4 p-4", className)} {...props}>
      <div className="text-sm space-x-2">
        <span className="font-semibold">Last updated:</span>
        <span className="text-primary">
          {isValid(weather?.dt * 1000) ? format(weather?.dt * 1000, "MMM dd, HH:mm") : emptyString}
        </span>
      </div>
      <div className="h-1"></div>
      <div className="text-2xl font-semibold">
        {weather.name}, {weather.sys?.country}
      </div>
      <div className="h-3"></div>
      <div className="flex space-x-2 items-center">
        <img
          src={
            weather?.weather?.[0]?.icon
              ? getWeatherIcon(weather?.weather?.[0]?.icon)
              : "/icons/logo.png"
          }
          alt=""
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <span className="text-2xl font-medium">
          {weather?.main?.temp ?? emptyString}°C
        </span>
      </div>
      <div className="h-3"></div>
      <div className="text-sm lg:text-base">
        Feels like {weather?.main?.feels_like}°C. {weatherDesc}
      </div>
      <div className="h-2"></div>
      <div className="list-disc list-inside grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Humidity:</span>
          <span>{weather?.main?.humidity ?? emptyString}%</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Wind:</span>
          <span className="flex items-center">
            {weather?.wind?.deg && (
              <ArrowUp
                style={{ transform: `rotateZ(${weather?.wind?.deg}deg)` }}
              />
            )}
            <span>{weather?.wind?.speed ?? emptyString} m/s</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Visibility:</span>
          <span>
            {weather?.visibility ? weather?.visibility / 1000 : emptyString}km
          </span>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
