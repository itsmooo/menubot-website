import React, { useState } from "react";
import FoodDetailsDialog from "./FoodDetailsDialog";

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
    spicyLevel?: 'Mild' | 'Medium' | 'Hot';
  };
}

export default function FastFoodCard({ item }: FastFoodProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div 
        className="flex flex-col items-center group cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="bg-gray-100 rounded-2xl p-3 mb-3 w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 transition-colors group-hover:text-orange-600">
            {item.name}
          </h3>
          <p className="text-orange-600 font-bold text-sm">{item.price}</p>
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
