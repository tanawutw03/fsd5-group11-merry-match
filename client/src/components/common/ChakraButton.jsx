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
<<<<<<< HEAD
      className="w-[100px] hover:cursor-pointer"
=======
      className={combinedClassName}
>>>>>>> f474690 (feat:add props to  navbar)
=======
      className={combinedClassName}
>>>>>>> 6e6004d45e5e22588bb46b5c3779760ce387fe6c
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  variant: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
>>>>>>> 6e6004d (feat:edit matching page make  full screen)
=======
  variant: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
>>>>>>> 6e6004d45e5e22588bb46b5c3779760ce387fe6c
};
export default ChakraButton;
