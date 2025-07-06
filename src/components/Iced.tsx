import React from 'react';
import { useCart } from '../contexts/CartContext';
import { backgroundImage, icedMachiato, icedLatte, icedCappuccino, lemonIcedTea, strawberryIcedTea, mangoIcedTea, peachIcedTea, icedAmericano } from '../assets/images';
import { Coffee, Star, Clock, Utensils, Thermometer } from 'lucide-react';

const beverageItems = [
  {
    id: 1,
    name: "Iced Machiato",
    price: "$3",
    image: icedMachiato,
    rating: 4.8,
    time: "3 min",
  },
  {
    id: 2,
    name: "Iced Latte",
    price: "$3",
    image: icedLatte,
    rating: 4.9,
    time: "3 min",
  },
  {
    id: 3,
    name: "Iced Cappuccino",
    price: "$3",
    image: icedCappuccino,
    rating: 4.7,
    time: "3 min",
  },
  {
    id: 4,
    name: "Lemon Iced Tea",
    price: "$1.5",
    image: lemonIcedTea,
    rating: 4.6,
    time: "2 min",
  },
  {
    id: 5,
    name: "Strawberry Iced Tea",
    price: "$2.5",
    image: strawberryIcedTea,
    rating: 4.8,
    time: "2 min",
  },
  {
    id: 6,
    name: "Mango Iced Tea",
    price: "$2.5",
    image: mangoIcedTea,
    rating: 4.7,
    time: "2 min",
  },
  {
    id: 7,
    name: "Peach Iced Tea",
    price: "$2.5",
    image: peachIcedTea,
    rating: 4.8,
    time: "2 min",
  },
  {
    id: 8,
    name: "Iced Americano",
    price: "$1.5",
    image: icedAmericano,
    rating: 4.5,
    time: "2 min",
  },
];

interface BeverageProps {
  beverage: {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
    time: string;
  };
}

function BeverageCard({ beverage }: BeverageProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center group bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative bg-gray-50 rounded-xl p-3 mb-4 w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src={beverage.image}
            alt={beverage.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {beverage.rating}
        </div>
        {/* Cold Badge */}
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Thermometer className="w-3 h-3" />
          Cold
        </div>
      </div>
      <div className="text-center w-full">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 transition-colors group-hover:text-orange-600">
          {beverage.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mb-3 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{beverage.time}</span>
        </div>
        <p className="text-orange-600 font-bold text-lg mb-3">{beverage.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(beverage);
          }}
          className="bg-orange-500 text-white text-sm py-2 px-4 rounded-full hover:bg-orange-600 transition-colors w-full flex items-center justify-center gap-2"
        >
          <Utensils className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function IcedBeverages() {
  return (
    <div className="bg-gradient-to-r from-[#FFF4E5] to-[#FFE0B2] w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-full">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Iced Beverages</h2>
          </div>
          <p className="text-gray-600 text-lg md:text-xl mb-4">
            Refreshing cold drinks to cool you down
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              <span>Fresh & Cold</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Quick Preparation</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-orange-500" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Beverages Container */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {beverageItems.map((beverage) => (
              <BeverageCard key={beverage.id} beverage={beverage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}