export type Value = number | string;

export interface ControlItem {
  value: Value;
  label: string | any;
  icon?: string;
}
