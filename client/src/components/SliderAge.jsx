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

  return (
    <>
      <div className="text-violet-950 font-bold mt-16">Age Range</div>
      <RangeSlider
        aria-label={["Minimum age", "Maximum age"]}
        defaultValue={[18, 31]}
        onChange={handleSliderChange}
        size="md"
        min={18}
        max={50}
        colorScheme="pink"
        mt="10"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip
          hasArrow
          placement="bottom"
          renderContent={() => getTooltipContent(sliderValues[0])}
          label={`${sliderValues[0]}`}
        >
          <RangeSliderThumb bg="pink" boxSize={6} index={0} />
        </Tooltip>
        <Tooltip
          hasArrow
          placement="bottom"
          renderContent={() => getTooltipContent(sliderValues[1])}
          label={`${sliderValues[1]}`}
        >
          <RangeSliderThumb bg="pink" boxSize={6} index={1} />
        </Tooltip>
      </RangeSlider>
      <div className=" flex justify-center gap-1.5 mt-8">
        <span>
          <input
            className="text-center rounded-xl w-20 h-12 border-2"
            type="number"
            value={sliderValues[0]}
            onChange={(e) => handleInputChange(0, parseInt(e.target.value))}
          />
        </span>
        <div className="my-auto text-black">-</div>
        <span>
          <input
            className="w-20 h-12 text-center rounded-xl border-2"
            type="number"
            value={sliderValues[1]}
            onChange={(e) => handleInputChange(1, parseInt(e.target.value))}
          />
        </span>
      </div>
    </>
  );
}

export default SliderAge;
