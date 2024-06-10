"use client";
import CreateableSelect from "react-select/creatable";
import { SingleValue } from "react-select";
import { useMemo } from "react";

type Props = {
  onChnage: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  value,
  onChnage,
  onCreate,
  options,
  disabled,
  placeholder,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChnage(option?.value);
  };
  const formateedValue = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);
  return (
    <CreateableSelect
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      value={formateedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
