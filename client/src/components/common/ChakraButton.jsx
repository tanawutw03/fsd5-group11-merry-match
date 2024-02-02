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
      colorScheme={props.color}
<<<<<<< HEAD
      className="w-[100px] hover:cursor-pointer"
=======
      className={combinedClassName}
>>>>>>> f474690 (feat:add props to  navbar)
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
