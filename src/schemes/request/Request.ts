import { FilterParams } from './Filter';
import { GroupParams } from './Group';

interface RequestParametersInterface {
  bundle?: string;
  fields: string | string[];
  limit: number;
  offset: number;
  sort: string | string[];
  filter: FilterParams[] | FilterParams;
  groups: GroupParams[] | GroupParams;
  comment: string;
}

export type RequestParams = Partial<RequestParametersInterface>;
