import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useState, useEffect } from "react";
import { Country } from "country-state-city";

function InputSelect({ control, name, label }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const fetchedCountries = await Country.getAllCountries();
        console.log("Fetched Countries:", fetchedCountries);
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    }
    fetchCountries();
  }, []);

  return (
    <>
      <label htmlFor={name} className="text-left">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={countries.map((country) => ({
              value: country.name,
              label: country.name,
            }))}
            isSearchable={true}
            isClearable
            isLoading={!countries.length}
            placeholder={
              !countries.length
                ? `Loading ${label.toLowerCase()}...`
                : `Select ${label.toLowerCase()}`
            }
            className="border-2 mt-[2px] mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82] text-left"
          />
        )}
      />
    </>
  );
}

InputSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputSelect;
