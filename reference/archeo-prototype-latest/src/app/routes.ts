import { createBrowserRouter } from "react-router";
import { ExplorerPage } from "./pages/ExplorerPage";
import { DetailPage } from "./components/detail/DetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ExplorerPage,
  },
  {
    path: "/detail/:id",
    Component: DetailPage,
  },
]);
