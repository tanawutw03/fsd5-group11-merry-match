import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function TagSelect({ control, name, label, options }) {
  const animatedComponents = makeAnimated();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            components={animatedComponents}
            isMulti
            options={options}
          />
        )}
      />
    </>
  );
}

TagSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default TagSelect;
