import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { MinyanDatesPage } from "../pages/MinyanDatesPage";

export const minyanDatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/minyan-dates",
  component: MinyanDatesPage,
});
