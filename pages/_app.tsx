import baseTheme from "@/components/chakra-ui/theme";
import { TenancyProvider } from "@/components/hook/TenancyProvider";
import { ViewportProvider } from "@/components/hook/ViewportProvider";
import Navbar from "@/components/layout/Navbar";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {Provider} from "react-redux"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={baseTheme}>
        <ViewportProvider>
          <TenancyProvider>
            <Navbar />
            <Component {...pageProps} />
          </TenancyProvider>
        </ViewportProvider>
      </ChakraProvider>
    </Provider>
  );
}
