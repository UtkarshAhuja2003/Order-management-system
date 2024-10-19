import React from 'react';
import { SelectFieldProps } from '@/interfaces/common';

const SelectField: React.FC<SelectFieldProps> = ({ name, value, onChange, options }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
    required
  >
    <option value="" disabled>Select status</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectField;
