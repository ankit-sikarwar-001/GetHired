import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Developer", "Ai specific", "Designer", "Analyst"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup >
        {
          fitlerData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
