// TODO: Add more types
export interface WorkflowDefinition<
  PName extends string = string,
  TName extends string = string,
> {
  colourSets?: Record</* name */ string, unknown>;
  places?: Record<PName, unknown>;
  transitions?: Record<TName, unknown>;
  arcs?: {
    name: string;
    orientation: "t_to_p" | "p_to_t";
    transition: TName;
    place: PName;
    expression: string;
  };
  variables?: Record</* name */ string, unknown>;
}

export interface Workflow<WName extends string, WVersion extends number> {
  /**
   * The name of the Workflow.
   */
  name: WName;

  /**
   * The definition of the Workflow.
   */
  versions: Record<WVersion, WorkflowDefinition>;
}

export type AnyWorkflow = Workflow<string, number>;

export function defineWorkflow<WName extends string, WVersion extends number>(
  name: WName,
  versions: Record<WVersion, WorkflowDefinition>,
): Workflow<WName, WVersion> {
  return {
    name,
    versions,
  };
}

type WorkflowName<T> = T extends Workflow<infer WName, number> ? WName : never;
type EnactmentId = string;

function startEnactment<W extends AnyWorkflow>(
  _name: WorkflowName<W>,
  _initialMarkings: Record<string, unknown>,
  _options: { version: keyof W["versions"] | -1; foo?: string },
): Promise<EnactmentId> {
  return Promise.resolve("enactmentId");
}

function terminateEnactment<W>(
  _name: WorkflowName<W>,
  _enactmentId: EnactmentId,
  _options?: { version: number },
): Promise<void> {
  return Promise.resolve();
}

export interface Workitem {
  id: string;
  flowVersion: number;
  transition: string;
}

function workitemStream<W>(
  _name: WorkflowName<W>,
  // 0 is a special version that means all versions
  // -1 is a special version that means the latest version
  _options: { version: number },
): AsyncIterable<Workitem> {
  async function* foo() {
    yield await Promise.resolve({
      id: "foo",
      flowVersion: 1,
      transition: "bar",
    });
  }

  return foo();
}

export declare const workflows: {
  startEnactment: typeof startEnactment;
  terminateEnactment: typeof terminateEnactment;
  workitemStream: typeof workitemStream;
  // getEnactment: typeof getEnactment;
  // allocateWorkitem: typeof allocateWorkitem;
  // startWorkitem: typeof startWorkitem;
  // completeWorkitem: typeof completeWorkitem;
};
