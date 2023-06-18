"use client";
import { Country } from "country-state-city";
import Select from "react-select";

interface CountrySelectValue {
  value: string;
  label: string;
  flag: string;
}

interface CountrySelectProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const options = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
    flag: country.flag,
  }));

  return (
    <div className="w-full">
      <Select
        required={true}
        placeholder="Select Country"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center w-full">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "px-1 py-[3px]",
          input: () => "text-base",
          option: () => "text-base",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#94A3B8",
            primary25: "#F1F6F9",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
