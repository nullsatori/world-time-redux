import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Times {
  id: string;
  name: string;
  hour: string;
  minute: string;
  second: string;
}

interface TimesState {
  times: Times[];
}

const initialState: TimesState = {
  times: [],
};

const timesSlice = createSlice({
  name: "times",
  initialState,
  reducers: {
    setTimes: (state, action: PayloadAction<Times[]>) => {
      state.times = action.payload;
    },
    addTime: (state, action: PayloadAction<Times>) => {
      const existingTime = state.times.find(
        (time) => time.name === action.payload.name,
      );
      if (existingTime) {
        return;
      }
      state.times.push(action.payload);
    },
    updateTime: (state, action: PayloadAction<Partial<Times>>) => {
      const index = state.times.findIndex(
        (time) => time.name === action.payload.name,
      );
      if (index !== -1) {
        state.times[index] = {
          ...state.times[index],
          ...action.payload,
        };
      }
    },
    removeTime: (state, action: PayloadAction<string>) => {
      state.times = state.times.filter((time) => time.id !== action.payload);
    },
  },
});

export const { setTimes, addTime, removeTime, updateTime } = timesSlice.actions;

export default timesSlice.reducer;
