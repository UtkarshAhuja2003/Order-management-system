export type InputFieldProps = {
    name: string;
    placeholder: string;
    type: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
};
  
export type ButtonProps = {
    label: string;
    isLoading?: boolean;
};

export type BannerProps = {
  message: string;
  onClose: () => void;
  type: 'success' | 'error';
};

export type SelectFieldProps = {
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};
