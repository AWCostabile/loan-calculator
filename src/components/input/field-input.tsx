import Grid from '@material-ui/core/Grid';
import { InputProps } from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, ReactNode, useMemo, useRef } from 'react';
import { IFieldOption } from 'types/form';
import './field-input.css';

interface IBaseInputProps<
  Name extends string = string,
  Value extends string | number = any,
> {
  InputProps?: InputProps;
  label?: ReactNode | string;
  name: Name;
  onChange: (name: Name, value: Value) => void;
  value?: Value;
}

type FieldInputProps<
  Name extends string = string,
  Value extends string | number = any,
> = IBaseInputProps<Name, Value> &
  (
    | {
        options: IFieldOption[];
        type?: 'number-select' | 'text-select';
      }
    | {
        type?: 'number' | 'text';
      }
  );

export const FieldInput = <
  Name extends string = string,
  Value extends string | number = any,
>(
  props: FieldInputProps<Name, Value>,
) => {
  const {
    InputProps,
    label = '',
    name,
    onChange,
    options = [],
    type = 'text',
    value = undefined,
  } = props as IBaseInputProps<Name, Value> & {
    options: IFieldOption[];
    type: 'number' | 'number-select' | 'text' | 'text-select';
  };

  const anchorEl = useRef<HTMLSelectElement | null>(null);

  const { changeHandler, className } = useMemo(() => {
    const extractValue = ['number', 'number-select'].includes(type)
      ? (event: ChangeEvent<{ name?: string; value?: unknown }>): number =>
          Number(event.target.value)
      : (event: ChangeEvent<{ name?: string; value?: unknown }>): string =>
          String(event.target.value);

    return {
      changeHandler: (event: ChangeEvent<{ name?: string; value?: unknown }>) =>
        onChange(name, extractValue(event) as Value),
      className: type === 'number' ? 'numberField' : 'textField',
    };
  }, [name, type]);

  return (
    <React.Fragment>
      <Grid item xs={4} md={2} className="field-label">
        <InputLabel htmlFor={name}>{label}</InputLabel>
      </Grid>
      <Grid item xs={8} md={4} className={className}>
        {['number-select', 'text-select'].includes(type) ? (
          <Select
            fullWidth
            id={name}
            input={<OutlinedInput {...InputProps} />}
            key={name}
            name={name}
            onChange={changeHandler}
            ref={anchorEl}
            value={value}
          >
            {options.map((option) => (
              <MenuItem key={`${option.value}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <OutlinedInput
            {...InputProps}
            fullWidth
            id={name}
            key={name}
            name={name}
            onChange={changeHandler}
            value={value}
            type={type === 'number' ? type : 'text'}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
