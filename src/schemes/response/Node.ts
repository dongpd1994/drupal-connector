/* eslint-disable @typescript-eslint/ban-types */
interface NodeDataInterface {
  type: string;
  id: string;
  links: object;
  attributes: object;
  relationships: object;
}

export type NodeIncludedInterface = Partial<NodeDataInterface>

export interface NodeResponseInterface {
  jsonapi: object;
  data: NodeDataInterface;
  links: object;
  included?: NodeIncludedInterface[];
}