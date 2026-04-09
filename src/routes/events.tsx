import { createRoute, Outlet } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: () => <Outlet />,
});
