export interface FilterSliderProps {
  maxPrice: number | undefined
  onSliderChange: (values: number[]) => void
  prices: number[]
}
