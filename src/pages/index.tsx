import Empty from "@/assets/graphics/Empty";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import { useGeoStore } from "@/states/app/useGeo";
import { useForecast } from "@/states/server/useForecast";
import { useGeoWeather } from "@/states/server/useGeoWeather";
import { Forecast } from "@/types/weather";
import { isNil } from "@/utils/object";
import { getWeatherIcon } from "@/utils/weather";
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { format, isValid } from "date-fns";
import { capitalize, groupBy } from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useStore } from "zustand";

const Home = () => {

  const router = useRouter();
  const geoId = router.query.city;
  const cachedId = useStore(useGeoStore, (s) => s.id);
  const geo = useStore(useGeoStore, (s) => s.geo);
  const id =
    !!geoId && typeof geoId === "string" && !isNaN(+geoId) ? geoId : cachedId;
  const { data: weatherCondition, isLoading } = useGeoWeather(+id);
  const { data: forecast, isLoading: forecastLoading } = useForecast(geo?.lon, geo?.lat);

  const forecastData = useMemo(() => {
    if (!Array.isArray(forecast?.list)) {
      return {};
    }

    const group = groupBy(forecast.list, (f) => {
      if (!isValid(f?.dt * 1000)) {
        return 'unknown';
      }
      return format(f.dt * 1000, 'dd-MM-yyyy');

    });

    return group;
  }, [forecast]);

  const renderWeatherCard = () => {
    console.log({ forecastData });
    if (isLoading) {
      return (
        <Card className="p-4 h-60">
          <Spinner color="primary" />
        </Card>
      );
    }
    if (!weatherCondition) {
      return (
        <Card className="p-4 flex flex-col items-center justify-center">
          <Empty size={120} />
          <div className="h-4"></div>
          <span className="text-danger font-medium">
            Error to load data, try again later.
          </span>
        </Card>
      );
    }
    return <WeatherCard weather={weatherCondition} />;
  };

  const renderForecast = useCallback(() => {
    const keys = Object.keys(forecastData);
    if (forecastLoading) {
      return (
        <div className="h-60 flex items-center justify-center">
          <Spinner color="primary" />
        </div>
      );
    }
    if (keys?.length > 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Accordion defaultExpandedKeys={keys} className="text-sm">
            {keys.map((group) => {
              if (group === "unknown") {
                return <></>;
              }
              const items = forecastData[group] as Forecast[];

              return (
                <AccordionItem
                  key={group}
                  aria-label={group}
                  title={group}
                  className="flex flex-col"
                >
                  {items?.map((item) => {
                    const desc = item?.weather
                      ?.map((recap) =>
                        recap?.description
                          ? capitalize(recap.description)
                          : undefined
                      )
                      ?.filter((desc) => !isNil(desc))
                      ?.join(". ");

                    return (
                      <div className="flex justify-between items-center hover:bg-content2 relative py-2 px-2">
                        <span className="text-sm font-semibold">
                          {format(item.dt, "HH:mm")}
                        </span>
                        <span className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
                          <img
                            src={
                              item?.weather?.[0]?.icon
                                ? getWeatherIcon(item?.weather?.[0]?.icon)
                                : "/icons/logo.png"
                            }
                            width={24}
                            height={24}
                            alt=""
                          />
                          <span className="text-sm">
                            {item.main.temp_min} - {item.main.temp_max} °C
                          </span>
                        </span>

                        <span className="text-sm">{desc}</span>
                      </div>
                    );
                  })}
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center">
        <Empty size={120} />
        <div className="h-4"></div>
        <span className="text-danger font-medium">
          Error to load forecast data, try again later.
        </span>
      </div>
    );
  }, [forecastData, forecastLoading, forecast]);

  return (
    <main className="container">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="">{renderWeatherCard()}</div>

        <Card className="p-4">
          <CardHeader className="text-2xl font-semibold">
            Weather forecast
          </CardHeader>
          <CardBody>
            {renderForecast()}
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      query: ctx.query,
    },
  };
};

export default Home;
