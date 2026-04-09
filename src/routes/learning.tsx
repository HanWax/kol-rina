import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { LearningPage } from "../pages/LearningPage";

export const learningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning",
  component: LearningPage,
});
