import { workflows } from "../../workflow.ts";
import type { workflow } from "./workflow/main.ts";

const workitems = workflows.workitemStream<typeof workflow>(
  "traffic_light",
  {
    version: 0,
  },
);

for await (const workitem of workitems) {
  console.log(workitem.id);
}
