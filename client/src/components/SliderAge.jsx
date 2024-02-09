import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";

function SliderAge() {
  const [sliderValues, setSliderValues] = useState([18, 31]);

  const handleSliderChange = (newValues) => {
    setSliderValues(newValues);
    console.log("Final Slider Values:", newValues);
  };

  const getTooltipContent = (value) => `${value}`;

  const handleInputChange = (index, newValue) => {
    const updatedValues = [...sliderValues];
    updatedValues[index] = newValue;
    setSliderValues(updatedValues);
  };

  const handleInputBlur = (index) => {
    const updatedValues = [...sliderValues];
    // Ensure the input values stay within the min and max range
    updatedValues[index] = Math.max(18, Math.min(updatedValues[index], 60));
    setSliderValues(updatedValues);
  };

  return (
    <>
      <RangeSlider
        aria-label={["Minimum age", "Maximum age"]}
        value={sliderValues}
        onChange={handleSliderChange}
        minw="36"
        min={18}
        max={60}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip
          hasArrow
          placement="bottom"
          isOpen
          renderContent={() => getTooltipContent(sliderValues[0])}
          label={`${sliderValues[0]}`}
        >
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip
          hasArrow
          placement="bottom"
          isOpen
          renderContent={() => getTooltipContent(sliderValues[1])}
          label={`${sliderValues[1]}`}
        >
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
      <div className="mt-10 flex justify-around ">
        <span>
          <input
            className="w-24 border-2"
            type="number"
            min="18"
            max="80"
            value={sliderValues[0]}
            onChange={(e) => handleInputChange(0, parseInt(e.target.value))}
            onBlur={() => handleInputBlur(0)}
          />
        </span>
        <span>
          <input
            className="w-24 border-2"
            type="number"
            min="18"
            max="80"
            value={sliderValues[1]}
            onChange={(e) => handleInputChange(1, parseInt(e.target.value))}
            onBlur={() => handleInputBlur(1)}
          />
        </span>
      </div>
    </>
  );
}

export default SliderAge;
