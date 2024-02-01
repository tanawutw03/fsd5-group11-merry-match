import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

function ChakraButton(props) {
  const handleNext = () => {
    props.onClick();
  };

  return (
    <Button
      onClick={handleNext}
      m={10}
      colorScheme={props.color}
      className="w-[150px] hover:cursor-pointer"
    >
      {props.name}
    </Button>
  );
}
ChakraButton.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ChakraButton;
