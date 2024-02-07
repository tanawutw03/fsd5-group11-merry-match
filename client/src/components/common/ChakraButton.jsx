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
      m={5}
      variant={props.variant}
      rounded={props.rounded}
      colorScheme={props.colorScheme}
      className={combinedClassName}
    >
      {props.name}
    </Button>
  );
}
ChakraButton.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rounded: PropTypes.string,
  variant: PropTypes.bool,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
export default ChakraButton;
