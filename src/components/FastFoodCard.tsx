import React, { useState } from "react";
import FoodDetailsDialog from "./FoodDetailsDialog";
import { useCart } from "../contexts/CartContext";
import { Star, Clock, Utensils, Flame } from 'lucide-react';

interface FastFoodProps {
  item: {
    id: number;
    name: string;
    price: string;
    image: string;
    description?: string;
    ingredients?: string[];
    nutritionalInfo?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
    };
    allergens?: string[];
    preparationTime?: string;
    spicyLevel?: string;
  };
}

export default function FastFoodCard({ item }: FastFoodProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <div className="flex flex-col items-center group bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div 
          className="relative bg-gray-50 rounded-xl p-3 mb-4 w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md cursor-pointer"
          onClick={() => setIsDetailsOpen(true)}
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            4.8
          </div>
          {/* Hot Badge */}
          {item.spicyLevel && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {item.spicyLevel}
            </div>
          )}
        </div>
        <div className="text-center w-full">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 transition-colors group-hover:text-orange-600">
            {item.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mb-3 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{item.preparationTime || "10 min"}</span>
          </div>
          <p className="text-orange-600 font-bold text-lg mb-3">{item.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="bg-orange-500 text-white text-sm py-2 px-4 rounded-full hover:bg-orange-600 transition-colors w-full flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <FoodDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        food={item}
      />
    </>
  );
}
