export default function manifest() {
  return {
    name: "TreeTherium",
    short_name: "TreeTherium",
    description: "Tokenizing tree planting world wide",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/assets/img/TT-Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
