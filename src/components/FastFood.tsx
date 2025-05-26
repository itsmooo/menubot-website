import React from "react";
import { backgroundImage } from "../assets/images";
import FastFoodCard from "./FastFoodCard";
import { fastFoodItems } from "../data/fastFood";

export default function FastFood() {
  return (
    <div className="flex-grow container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
          Fast Foods
        </h1>
        <p className="text-white text-lg md:text-xl font-medium drop-shadow-lg">
          Grab Your Favourite Sweets only at Akram Sweets
        </p>
      </div>

      {/* Fast Food Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="space-y-6">
          {/* First Row - 5 items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {fastFoodItems.firstRow.map((item) => (
              <FastFoodCard key={item.id} item={item} />
            ))}
          </div>

          {/* Second Row - 5 items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {fastFoodItems.secondRow.map((item) => (
              <FastFoodCard key={item.id} item={item} />
            ))}
          </div>

          {/* Third Row - 4 items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {fastFoodItems.thirdRow.map((item) => (
              <FastFoodCard key={item.id} item={item} />
            ))}
          </div>

          {/* Fourth Row - 4 items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {fastFoodItems.fourthRow.map((item) => (
              <FastFoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
