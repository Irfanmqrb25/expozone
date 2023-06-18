import { useState, useEffect } from "react";
import { City } from "country-state-city";
import Select from "react-select";

export interface CitySelectValue {
  value: string;
  label: string;
}

interface CitySelectProps {
  value: CitySelectValue;
  selectedCountry: string;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange,
  selectedCountry,
}) => {
  const [cities, setCities] = useState<CitySelectValue[]>([]);

  useEffect(() => {
    const countryCities = City.getCitiesOfCountry(selectedCountry)?.map(
      (city) => ({
        value: city.name,
        label: city.name,
      })
    );
    setCities(countryCities || []);
  }, [selectedCountry]);

  return (
    <div className="w-full">
      <Select
        required={true}
        placeholder="Select City"
        isClearable
        options={cities}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center w-full gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "px-1 py-[3px]",
          input: () => "text-lg",
          option: () => "text-lg",
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

export default CitySelect;
