import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useState, useEffect } from "react";
import { City } from "country-state-city";

function CityInputSelect({ control, name, label, selectedCountry }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        console.log(selectedCountry);
        if (selectedCountry && selectedCountry?.isoCode) {
          const fetchCities = await City.getCitiesOfCountry(
            selectedCountry.isoCode
          );
          console.log("Fetched Cities:", fetchCities);
          setCities(fetchCities);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error.message);
      }
    }

    fetchCities();
  }, [selectedCountry]);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={cities.map((city) => ({
              value: city.name,
              label: city.name,
            }))}
            isSearchable={true}
            isClearable
            isLoading={!cities.length}
            placeholder={
              !cities.length
                ? `Loading ${label.toLowerCase()}...`
                : `Select ${label.toLowerCase()}`
            }
          />
        )}
      />
    </>
  );
}

CityInputSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectedCountry: PropTypes.object,
};

export default CityInputSelect;
