import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from "./App";
import "i18n";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);
