import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { minyanDatesRoute } from "./routes/minyan-dates";
import { learningRoute } from "./routes/learning";
import { eventsRoute } from "./routes/events";
import { eventsIndexRoute } from "./routes/events.index";
import { eventDetailRoute } from "./routes/events.$eventId";
import { getInvolvedRoute } from "./routes/get-involved";
import { adminRoute } from "./routes/admin";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  minyanDatesRoute,
  learningRoute,
  eventsRoute.addChildren([eventsIndexRoute, eventDetailRoute]),
  getInvolvedRoute,
  adminRoute,
]);
