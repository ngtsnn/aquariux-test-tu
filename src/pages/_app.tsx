import MainLayout from "@/layouts/MainLayout";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <MainLayout>
        <ToastContainer/>
        <Component {...pageProps} />
      </MainLayout>
    </NextUIProvider>
  );
}
