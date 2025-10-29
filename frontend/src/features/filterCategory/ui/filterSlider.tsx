import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import { useEffect, useState } from 'react'
import type { FilterSliderProps } from '@/features/filterCategory/model/types/filterSliderProps.ts'

const FilterSlider = ({ maxPrice, onSliderChange, prices }: FilterSliderProps) => {
  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) onSliderChange(newValue)
  }

  const [maxPric, setMaxPrice] = useState<number>(10000)

  useEffect(() => {
    if (maxPrice) setMaxPrice(maxPrice)
  }, [maxPrice])

  return (
    <Slider
      range
      min={0}
      max={maxPric}
      value={prices}
      onChange={handleChange}
      step={1}
      allowCross={false}
    />
  )
}

export default FilterSlider
