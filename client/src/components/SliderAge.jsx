import { useState, useEffect } from "react";

import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  Tooltip,
} from "@chakra-ui/react";

const RangeSlider = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const sliderMinValue = 0;
  const sliderMaxValue = 2000;

  useEffect(() => {
    setArea();
  }, [minValue, maxValue, setArea]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setArea = () => {
    const range = document.querySelector(".slider-track");

    range.style.left = `${
      ((minValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
    }%`;
    range.style.right = `${
      100 -
      ((maxValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
    }%`;
  };

  const handleMinChange = (value) => {
    setMinValue(value);
  };

  const handleMaxChange = (value) => {
    setMaxValue(value);
  };

  return (
    <Flex direction="column" align="center" mt={4}>
      <Slider
        min={sliderMinValue}
        max={sliderMaxValue}
        defaultValue={[minValue, maxValue]}
        onChange={(values) => {
          handleMinChange(values[0]);
          handleMaxChange(values[1]);
        }}
        step={1}
      >
        <SliderTrack bg="gray.100" borderRadius="full">
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>

      <Flex justify="space-between" w="full" mt={4}>
        <Input
          type="number"
          value={minValue}
          onChange={(e) => handleMinChange(e.target.value)}
          w="40%"
        />
        <Input
          type="number"
          value={maxValue}
          onChange={(e) => handleMaxChange(e.target.value)}
          w="40%"
        />
      </Flex>

      <Tooltip label={`Min: ${minValue}`} placement="top">
        <div className="min-tooltip" />
      </Tooltip>

      <Tooltip label={`Max: ${maxValue}`} placement="top">
        <div className="max-tooltip" />
      </Tooltip>
    </Flex>
  );
};

export default RangeSlider;
