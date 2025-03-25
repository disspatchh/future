import React, { useState } from 'react';
import { useController, Control } from 'react-hook-form';
import ReactSelect, { Props, StylesConfig, GroupBase } from 'react-select';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_FONT,
  ACCENT_HOVER_COLOR,
  ACCENT_HOVER_COLOR_FONT,
  DARK_COLOR,
  BORDER_COLOR,
  PLACEHOLDER_COLOR,
  MAIN_TITLE_COLOR,
} from '../../constants/colors';
import { BORDER_RADIUS, BACKDROP } from '../../constants/margins';
import {
  GLASS_BACKGROUND,
  GLASS_BORDER,
  GLASS_BOX_SHADOW,
} from '../common-styles';

const styles: StylesConfig<any, boolean, GroupBase<unknown>> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    padding: '2px 0',
    background: DARK_COLOR,
    borderRadius: BORDER_RADIUS,
    boxShadow: 'none',
    textAlign: 'left',
    borderColor: state.isFocused ? ACCENT_COLOR : BORDER_COLOR,
    '&:hover': {
      borderColor: state.isFocused ? ACCENT_COLOR : BORDER_COLOR,
    },
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: PLACEHOLDER_COLOR,
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    paddingLeft: '10px',
    color: ACCENT_COLOR,
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: ACCENT_COLOR,
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: ACCENT_COLOR,
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: state.isFocused ? ACCENT_COLOR : BORDER_COLOR,
    '&:hover': {
      color: state.isFocused ? ACCENT_COLOR : BORDER_COLOR,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  /* dropdown */
  menu: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: '15px',
    borderRadius: BORDER_RADIUS,
    background: GLASS_BACKGROUND,
    border: GLASS_BORDER,
    backdropFilter: `blur(${BACKDROP})`,
    boxShadow: GLASS_BOX_SHADOW,
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: `${BORDER_RADIUS} 0`,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: '15px',
    color: state.isSelected ? ACCENT_COLOR_FONT : '#afb7c5',
    background: state.isSelected ? MAIN_TITLE_COLOR : 'transparent',
    boxShadow: state.isSelected ? '-1px 2px 4px 0 rgba(0, 0, 0, 0.15)' : 'none',
    cursor: 'pointer',
    '&:hover': {
      color: ACCENT_HOVER_COLOR_FONT,
      background: ACCENT_HOVER_COLOR,
    },
  }),
  noOptionsMessage: (baseStyles) => ({
    ...baseStyles,
    color: ACCENT_COLOR,
  }),
};

export interface Option {
  label: string;
  value: string;
}

interface ISelectProps extends Props {
  name?: string;
  control?: Control;
  required?: boolean;
  options?: Option[];
}

export const Select = React.forwardRef<any, ISelectProps>(
  ({ name, control, required, options, ...rest }, ref) => {
    const {
      field: { value, onChange, onBlur },
      // fieldState: { invalid, isTouched, isDirty },
      // formState: { touchedFields, dirtyFields },
    } = useController({
      name,
      control,
      rules: { required: required },
    });

    return (
      <ReactSelect
        ref={ref}
        value={options?.find((option) => option.value === value)}
        onChange={(option: Option) => {
          onChange(option.value);
        }}
        onBlur={onBlur}
        className='select-container'
        classNamePrefix='select'
        styles={styles}
        options={options}
        {...rest}
      />
    );
  }
);
