import { createRoute } from "@tanstack/react-router";
import { eventsRoute } from "./events";
import { EventDetailPage } from "../pages/EventDetailPage";

export const eventDetailRoute = createRoute({
  getParentRoute: () => eventsRoute,
  path: "$eventId",
  component: EventDetailPage,
});
