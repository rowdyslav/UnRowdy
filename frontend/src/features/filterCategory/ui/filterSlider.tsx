import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

interface props {
  maxPrice: number
  onSliderChange: (values: number[]) => void
  prices: number[]
}

const FilterSlider = ({ maxPrice, onSliderChange, prices }: props) => {
  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onSliderChange(newValue)
    }
  }

  return (
    <Slider
      range
      min={0}
      max={maxPrice || 5000}
      value={prices}
      onChange={handleChange}
      step={1}
      allowCross={false}
    />
  )
}

export default FilterSlider
