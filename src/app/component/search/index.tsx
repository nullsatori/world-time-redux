import React, { ChangeEvent, useEffect } from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
  setCities,
  setSuggestions,
  setSearchTerm,
} from "@/redux/slices/citiesSlice";
import { addTime } from "@/redux/slices/timesSlice";
import debounce from "@/utils/debounce";

interface Time {
  id: string;
  name: string;
  hour: string;
  minute: string;
  second: string;
}


const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, searchTerm, suggestions } = useAppSelector(
    (state) => state.cities,
  );

  useEffect(() => {
    fetch("/cities.json")
      .then((response) => response.json())
      .then((data: string[]) => dispatch(setCities(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSuggestions([]));
      return;
    }

    const filteredCities = cities.filter((city: string) =>
      city.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    dispatch(setSuggestions(filteredCities));
  }, [searchTerm, cities, dispatch]);

  const debouncedHandleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  }, 300);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedHandleChange(event);
  };

  const handleClick = (cityName: string) => {
    const time: Time = {
      id: Math.random().toString(),
      name: cityName,
      hour: "",
      minute: "",
      second: "",
    };
    dispatch(addTime(time));
  };

  return (
    <div className="search-container w-fit ml-auto mr-auto">
      <form className="flex w-fit">
        <input
          className="text-gray-900 w-96 h-9 pl-2 rounded"
          type="text"
          name="query"
          placeholder="Search..."
          onChange={handleChange}
        />
      </form>
      <ul className="suggestions w-96 bg-white text-black rounded mt-5 max-h-96 overflow-y-auto">
        {suggestions.map((city) => (
          <li
            key={Math.random()}
            className="p-2"
            onClick={() => handleClick(city)}
          >
            {
              `${city && city.split('/')[1] }`
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;