import Empty from "@/assets/graphics/Empty";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import { useWeatherSearch } from "@/states/server/useWeatherSearch";
import { Spinner } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const q = router.query.q;
  const { data, isLoading } = useWeatherSearch(q as string);

  const renderSearchResult = () => {
    if (isLoading) {
      return (
        <div className="w-full max-w-2xl m-auto flex flex-col">
          <Spinner size="lg" color="primary" />
        </div>
      );
    }

    if (data && data?.list?.length > 0) {
      return (
        <div className="grid sm:grid-cols-2 ld:grid-cols-3 gap-4">
          {data.list?.map?.((weather) => {
            const search = new URLSearchParams({
              city: weather.id?.toString(),
            })?.toString();
            const url = "/" + "?" + search;
            return (
              <WeatherCard
                as={Link}
                key={weather.id}
                weather={weather}
                className="hover:cursor-pointer"
                // @ts-expect-error link props
                href={url}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="w-full max-w-2xl m-auto flex flex-col items-center justify-center text-center text-danger">
        <Empty size={160} />
        <div className="h-4"></div>
        <span className="">Sorry, we can not find out this city</span>
      </div>
    );
  };

  return <main className="container">{renderSearchResult()}</main>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const search = ctx.query.q;
  if (typeof search !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      query: ctx.query,
    },
  };
};

export default Search;
