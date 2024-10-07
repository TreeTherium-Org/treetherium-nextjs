// src/pages/_app.js or pages/_app.js

// Import CSS files
import '../../public/assets/css/responsive.css';
import '../../public/assets/css/style.css';
import '../../public/assets/css/components/_buttons.css';
import '../../public/assets/demo/css/demo.css';
import '../../public/assets/css/vendor.css';


// Import Font files (if needed for specific font settings)
// You don't need to explicitly import fonts in most cases as they're linked in the CSS.
// However, if you have custom fonts in your Sass, you may want to import font settings in the Sass file.

// Function to initialize the app
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
