import React from "react";
import { backgroundImage } from "../assets/images";
import FastFoodCard from "./FastFoodCard";
import { fastFoodItems } from "../data/fastFood";
import { Pizza, Star, Clock, Utensils, Flame } from 'lucide-react';

export default function FastFood() {
  return (
    <div className="bg-gradient-to-r from-[#FFE0B2] to-[#FFF4E5] w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-full">
              <Pizza className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Fast Food & Snacks</h2>
          </div>
          <p className="text-gray-600 text-lg md:text-xl mb-4">
            Delicious quick meals and snacks for every craving
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <span>Fresh & Hot</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Quick Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-orange-500" />
              <span>Best Quality</span>
            </div>
          </div>
        </div>

        {/* Fast Food Container */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="space-y-8">
            {/* First Row - 5 items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {fastFoodItems.firstRow.map((item) => (
                <FastFoodCard key={item.id} item={item} />
              ))}
            </div>

            {/* Second Row - 5 items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {fastFoodItems.secondRow.map((item) => (
                <FastFoodCard key={item.id} item={item} />
              ))}
            </div>

            {/* Third Row - 4 items */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fastFoodItems.thirdRow.map((item) => (
                <FastFoodCard key={item.id} item={item} />
              ))}
            </div>

            {/* Fourth Row - 4 items */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fastFoodItems.fourthRow.map((item) => (
                <FastFoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
