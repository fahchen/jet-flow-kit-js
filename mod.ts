import type { workflow } from "./examples/traffic_light/workflow/main.ts";
import { workflows } from "./workflow.ts";

await workflows.startEnactment<typeof workflow>(
  "traffic_light",
  {},
  { version: 1 },
);

