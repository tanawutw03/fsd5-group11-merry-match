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
  colorScheme: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  rounded: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default ChakraButton;
