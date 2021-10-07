/* eslint-disable @typescript-eslint/ban-types */
import { NodeIncludedInterface } from '../response/Node';

interface FieldDataInterface {
  value: any;
  include: NodeIncludedInterface[];
  settingField: {};
}

interface FieldOptionsInterface {
  label: string;
  cssClass: string[];
}

export interface FieldInterface {
  data: FieldDataInterface;
  basePath?: string;
  fieldType?: string;
  optionParams?: FieldOptionsInterface;
}
