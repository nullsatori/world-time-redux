"use client";
import React from "react";
import Time from "@/app/component/time";
import Search from "@/app/component/search";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Page = () => {
  return (
    <div className="wrapper min-h-screen max-w-screen bg-zinc-950 text-red-600">
      <div className="max-w-screen-xl mx-auto font-main flex flex-col items-center pt-20">
        <h1 className="text-5xl font-bold mb-5">World Time</h1>
        <div className="time-container w-1/2  ">
          <Provider store={store}>
            <Search />
            <Time />
          </Provider>
        </div>
      </div>
    </div>
  );
};

export default Page;
