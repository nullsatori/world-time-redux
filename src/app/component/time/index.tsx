import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeTime, updateTime } from "@/redux/slices/timesSlice";
import { fetchTime } from "@/utils/fetchTime";

const Time: React.FC = () => {
  const dispatch = useDispatch();
  const times = useSelector((state: RootState) => state.times.times);

  // ref to store the interval ID
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateAllTimes = async () => {
      for (const time of times) {
        const temp = await fetchTime(time.name);
        if (temp) {
          dispatch(updateTime(temp));
        }
      }
    };

    // Clear the previous interval if it exists
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Start the initial update
    if (times.length) {
      intervalIdRef.current = setInterval(async () => {
        await updateAllTimes();
      }, 1000);
    }

    // Cleanup
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [dispatch, times]);

  return (
    <div className="time-container mt-5 flex justify-between flex-wrap">
      {times.map((time) => (
        <div key={time.id} className="time-block mr-2 w-56 min-h-28">
          {<p className="city w-1/3t">{time.name}</p>}
          <p className="hours text-4xl">
            {time.hour
              ? `${time.hour}:${time.minute}:${time.second}`
              : "Loading..."}
          </p>
          <button onClick={() => dispatch(removeTime(time.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Time;
