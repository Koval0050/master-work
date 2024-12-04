// import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { store } from "@/redux/store";
import "@/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }

  return (
    <div>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          theme="light"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          transition={Bounce}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ReduxProvider>
    </div>
  );
}
