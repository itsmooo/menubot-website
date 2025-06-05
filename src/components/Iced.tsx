import React from 'react';
import { useCart } from '../contexts/CartContext';
import { backgroundImage, icedMachiato, icedLatte, icedCappuccino, lemonIcedTea, strawberryIcedTea, mangoIcedTea, peachIcedTea, icedAmericano } from '../assets/images';

const beverageItems = [
  {
    id: 1,
    name: "Iced Machiato",
    price: "$3",
    image: icedMachiato,
  },
  {
    id: 2,
    name: "Iced Latte",
    price: "$3",
    image: icedLatte,
  },
  {
    id: 3,
    name: "Iced Cappuccino",
    price: "$3",
    image: icedCappuccino,
  },
  {
    id: 4,
    name: "Lemon Iced Tea",
    price: "$1.5",
    image: lemonIcedTea,
  },
  {
    id: 5,
    name: "Strawberry Iced Tea",
    price: "$2.5",
    image: strawberryIcedTea,
  },
  {
    id: 6,
    name: "Mango Iced Tea",
    price: "$2.5",
    image: mangoIcedTea,
  },
  {
    id: 7,
    name: "Peach Iced Tea",
    price: "$2.5",
    image: peachIcedTea,
  },
  {
    id: 8,
    name: "Iced Americano",
    price: "$1.5",
    image: icedAmericano,
  },
];

interface BeverageProps {
  beverage: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

function BeverageCard({ beverage }: BeverageProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center group">
      <div className="bg-gray-100 rounded-2xl p-3 mb-3 w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src={beverage.image}
            alt={beverage.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 transition-colors group-hover:text-orange-600">
          {beverage.name}
        </h3>
        <p className="text-orange-600 font-bold text-sm mb-2">
          {beverage.price}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(beverage);
          }}
          className="bg-orange-600 text-white text-sm py-1 px-3 rounded-full hover:bg-orange-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function IcedBeverages() {
  return (
    <div className="flex-grow container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
          Iced Beverages
        </h1>
        <p className="text-white text-lg md:text-xl font-medium drop-shadow-lg">
          Grab Your Favourite Sweets only at Akram Sweets
        </p>
      </div>

      {/* Beverages Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {beverageItems.map((beverage) => (
            <BeverageCard key={beverage.id} beverage={beverage} />
          ))}
        </div>
      </div>
    </div>
  );
}