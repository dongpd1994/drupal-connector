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
  basePath: string;
  fieldType: string;
  data: FieldDataInterface;
  optionParams: FieldOptionsInterface;
}
