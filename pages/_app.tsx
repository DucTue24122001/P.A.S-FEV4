import baseTheme from "@/components/chakra-ui/theme";
import { TenancyProvider } from "@/components/hook/TenancyProvider";
import { ViewportProvider } from "@/components/hook/ViewportProvider";
import Navbar from "@/components/layout/Navbar";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {Provider} from "react-redux"
import "../styles/slider.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={baseTheme} toastOptions={{ defaultOptions: { position: 'bottom', duration: 3000, isClosable: true } }}>
        <ViewportProvider>
          <TenancyProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer/>
          </TenancyProvider>
        </ViewportProvider>
      </ChakraProvider>
    </Provider>
  );
}
