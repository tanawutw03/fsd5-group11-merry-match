import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
function TagSelect({
  control,
  name,
  label,
  options,
  onHobbyChange,
  defaultValue,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        // defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            closeMenuOnSelect={false}
            isMulti
            options={options}
            defaultValue={defaultValue}
            onChange={(selectedHobby) => {
              console.log(selectedHobby);
              field.onChange(selectedHobby);
              onHobbyChange(selectedHobby);
            }}
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
  onHobbyChange: PropTypes.func,
  defaultValue: PropTypes.array,
};

export default TagSelect;
