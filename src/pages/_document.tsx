import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <div id="modal-root"></div>
        <div id="root">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
