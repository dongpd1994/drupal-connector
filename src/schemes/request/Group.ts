

type GroupConjunction = "AND" | "OR";

interface RequiredGroupDataInterface {
  conjunction: GroupConjunction;
}

interface OptionalGroupDataInterface {
  memberOf: string;
}

export interface GroupDataInterface
  extends RequiredGroupDataInterface,
  Partial<OptionalGroupDataInterface> { }

export interface GroupInterface {
  "group": GroupDataInterface;
}

export interface GroupParams {
  [condition: string]: GroupInterface;
}