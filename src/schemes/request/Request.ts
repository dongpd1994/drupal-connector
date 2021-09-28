import { FilterInterface } from 'src/schemes/request/Filter';

interface RequestParametersInterface {
  bundle?: string;
  fields: string | string[];
  limit: number;
  offset: number;
  sort: string | string[];
  filter: FilterInterface;
  groups: string | string[];
  comment: string;
}

export type RequestParams = Partial<RequestParametersInterface>;