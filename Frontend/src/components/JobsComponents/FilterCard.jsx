import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Gurugram", "Noida", "Bangalore", "Hyderabad", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Developer", "AI specific", "Designer", "Analyst"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = ({ showButton = true }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md">
      {showButton && (
        <div className="sm:hidden flex justify-end mb-3">
          <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-[#5930a3] transition">
            Filters
          </button>
        </div>
      )}
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="font-semibold text-gray-800 mb-2">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={idx}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
