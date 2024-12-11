import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../app/styles/main.scss";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
