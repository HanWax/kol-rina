import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { GetInvolvedPage } from "../pages/GetInvolvedPage";

export const getInvolvedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/get-involved",
  component: GetInvolvedPage,
});
