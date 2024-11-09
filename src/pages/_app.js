// src/pages/_app.js or pages/_app.js

// Import CSS files
import "../../public/assets/css/responsive.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/components/_buttons.css";
import "../../public/assets/demo/css/demo.css";
import "../../public/assets/css/vendor.css";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import Head from "next/head";

// Import Font files (if needed for specific font settings)
// You don't need to explicitly import fonts in most cases as they're linked in the CSS.
// However, if you have custom fonts in your Sass, you may want to import font settings in the Sass file.

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

// Function to initialize the app
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
