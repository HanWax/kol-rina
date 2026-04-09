import { createRoute } from "@tanstack/react-router";
import { eventsRoute } from "./events";
import { EventsPage } from "../pages/EventsPage";

export const eventsIndexRoute = createRoute({
  getParentRoute: () => eventsRoute,
  path: "/",
  component: EventsPage,
});
