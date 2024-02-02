import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

function ChakraButton(props) {
  const handleNext = () => {
    props.onClick();
  };
  const combinedClassName = `${props.width} ${props.height} hover:cursor-pointer`;

  return (
    <Button
      onClick={handleNext}
      m={10}
      colorScheme={props.color}
      className={combinedClassName}
    >
      {props.name}
    </Button>
  );
}
ChakraButton.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
export default ChakraButton;
