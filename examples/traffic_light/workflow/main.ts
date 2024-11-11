import { defineWorkflow } from "../../../workflow.ts";
import definitionV1 from "./v0001.ts";

export const workflow = defineWorkflow(
  "traffic_light",
  {
    1: definitionV1,
  },
);
