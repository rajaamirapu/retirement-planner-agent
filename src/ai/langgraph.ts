export const START = '__start__';
export const END = '__end__';

type NodeHandler<TState> = (state: TState) => Partial<TState>;

type AnnotationShape<TState extends Record<string, unknown>> = {
  [K in keyof TState]: TState[K];
};

export const Annotation = {
  Root: <TState extends Record<string, unknown>>(shape: AnnotationShape<TState>): AnnotationShape<TState> => shape,
};

export class StateGraph<TState extends Record<string, unknown>> {
  private nodes = new Map<string, NodeHandler<TState>>();
  private edges = new Map<string, string>();

  constructor(private _annotation: AnnotationShape<TState>) {}

  addNode(name: string, handler: NodeHandler<TState>): this {
    this.nodes.set(name, handler);
    return this;
  }

  addEdge(from: string, to: string): this {
    this.edges.set(from, to);
    return this;
  }

  compile(): { invoke: (initialState: Partial<TState>) => Promise<TState> } {
    return {
      invoke: async (initialState: Partial<TState>) => {
        const state = { ...initialState } as TState;
        let current = this.edges.get(START);

        while (current && current !== END) {
          const node = this.nodes.get(current);
          if (!node) {
            throw new Error(`Graph node "${current}" not found.`);
          }

          Object.assign(state, node(state));
          current = this.edges.get(current);
        }

        return state;
      },
    };
  }
}
