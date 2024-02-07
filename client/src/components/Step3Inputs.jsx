import UploadProfiles from "./UploadProfiles";
import PropTypes from "prop-types";

function Step3Inputs({ onFormChange, onRandomFileNames }) {
  return (
    <UploadProfiles
      onFormChange={onFormChange}
      onRandomFileNames={onRandomFileNames}
    />
  );
}

Step3Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onRandomFileNames: PropTypes.func,
};

export default Step3Inputs;
