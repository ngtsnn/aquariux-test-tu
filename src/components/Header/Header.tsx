import {
  addSearch,
  removeSearch,
  useHistorySearch,
} from "@/states/app/useHistorySearch";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  cn,
} from "@nextui-org/react";
import { Search, Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "zustand";

const Header = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const query = router.query;
  const q = typeof query?.q === "string" ? query?.q : "";
  const historySearch = useStore(useHistorySearch, (s) => s.search);
  const [showMbSearch, setShowMbSearch] = useState(false);

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = searchRef.current;
    if (!input) {
      return;
    }

    const val = input.value.trim();
    if (val.length < 3) {
      toast("Search is too short", { type: "info" });
      return;
    }

    addSearch(val);
    router.push(
      {
        pathname: "/search",
        query: {
          q: val,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div className="border-b border-divider shadow-md">
      <div
        className={cn(
          "absolute sm:hidden w-full h-screen z-[100]",
          showMbSearch ? "block" : "hidden"
        )}
      >
        <div
          className="fixed z-[10] bg-black/40 h-full w-full"
          onClick={() => setShowMbSearch(false)}
        ></div>
        <form
          action="/search"
          method="GET"
          onSubmit={onSearchSubmit}
          className="relative z-[20]"
        >
          <div className="group z-10" tabIndex={0}>
            <div className="flex items-center gap-x-2 p-4 bg-background shadow-lg border-b border-divider">
              <Input
                variant="flat"
                type="search"
                defaultValue={q}
                key={q}
                ref={searchRef}
                placeholder="Enter city"
                className="peer w-full"
                isClearable
                labelPlacement="outside"
                startContent={<Search size={20} className="text-foreground" />}
                autoComplete="off"
                size="sm"
              />

              <X className="cursor-pointer" size={20} onClick={() => setShowMbSearch(false)} />
            </div>
            <div className="absolute z-10 top-full w-full shadow-md py-4 bg-background text-foreground flex flex-col divide-y divide-divider">
              {historySearch?.map((q, idx) => {
                return (
                  <div
                    className="flex items-center justify-between py-2.5 px-4 hover:bg-content2"
                    key={q}
                  >
                    <span
                      className="truncate font-semibold text-sm w-full cursor-pointer"
                      onClick={(e) => {
                        if (router.pathname === "search") {
                          return router.replace({
                            query: {
                              q,
                            },
                          });
                        }
                        return router.push({
                          pathname: "search",
                          query: {
                            q,
                          },
                        });
                      }}
                    >
                      {q}
                    </span>
                    <Trash
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        removeSearch(idx);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
      <Navbar position="sticky" maxWidth="xl">
        <NavbarBrand>
          <Image alt="" src="/icons/logo.png" width={48} height={48} />
          <p className="font-bold text-inherit">Weather</p>
        </NavbarBrand>
        <NavbarContent justify="center" className="w-full">
          <NavbarItem className="sm:block hidden">
            <form action="/search" method="GET" onSubmit={onSearchSubmit}>
              <div className="relative group z-10" tabIndex={0}>
                <Input
                  variant="flat"
                  type="search"
                  defaultValue={q}
                  key={q}
                  ref={searchRef}
                  placeholder="Enter city"
                  className="w-80 peer"
                  isClearable
                  labelPlacement="outside"
                  startContent={
                    <Search size={20} className="text-foreground" />
                  }
                  autoComplete="off"
                />
                <div className="absolute z-10 top-full translate-y-2 w-full shadow-md rounded-xl py-4 bg-background text-foreground hidden peer-data-[focus]:block group-focus:block">
                  {historySearch?.map((q, idx) => {
                    return (
                      <div
                        className="flex items-center justify-between py-2 px-4 hover:bg-content2"
                        key={q}
                      >
                        <span
                          className="truncate font-semibold text-sm w-full cursor-pointer"
                          onClick={(e) => {
                            if (router.pathname === "search") {
                              return router.replace({
                                query: {
                                  q,
                                },
                              });
                            }
                            return router.push({
                              pathname: "search",
                              query: {
                                q,
                              },
                            });
                          }}
                        >
                          {q}
                        </span>
                        <Trash
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            removeSearch(idx);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarContent
            className="sm:hidden"
            onClick={() => setShowMbSearch(true)}
          >
            <Search size={20} />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Header;
