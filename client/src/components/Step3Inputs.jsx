import UploadProfiles from "./UploadProfiles";
import PropTypes from "prop-types";

function Step3Inputs({ onFormChange }) {
  return <UploadProfiles onFormChange={onFormChange} />;
}

Step3Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default Step3Inputs;
