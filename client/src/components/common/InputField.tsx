import React from 'react';
import { InputFieldProps } from '@/interfaces/common';

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, type, value, onChange, required, disabled}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      required={required}
      disabled={disabled}
    />
  );
};

export default InputField;
