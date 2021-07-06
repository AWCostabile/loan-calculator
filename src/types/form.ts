import { ReactNode } from 'react';

export interface IFieldOption<
  Label extends string | ReactNode = string,
  Value extends string | number = string | number,
> {
  label: Label;
  value: Value;
}
