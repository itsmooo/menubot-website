import React from "react";
import {
  backgroundImage,
  chocolateShake,
  strawberryShake,
  bananaShake,
  vanillaShake,
  mangoShake,
} from "../assets/images";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IcedBeverages from "./Iced";
import FastFood from "./FastFood";
import CartSummary from "./CartSummary";
import { useCart } from "../contexts/CartContext";

const shakeItems = [
  {
    id: 1,
    name: "Chocolate Shake",
    price: "$2",
    image: chocolateShake,
  },
  {
    id: 2,
    name: "Strawberry Shake",
    price: "$3",
    image: strawberryShake,
  },
  {
    id: 3,
    name: "Banana Shake",
    price: "$1.5",
    image: bananaShake,
  },
  {
    id: 4,
    name: "Vanilla Shake",
    price: "$2",
    image: vanillaShake,
  },
  {
    id: 5,
    name: "Mango Shake",
    price: "$2",
    image: mangoShake,
  },
];

interface ShakeProps {
  shake: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

function ShakeCard({ shake }: ShakeProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center group">
      <div className="bg-gray-100 rounded-2xl p-3 mb-3 w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src={shake.image}
            alt={shake.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 transition-colors group-hover:text-orange-600">
          {shake.name}
        </h3>
        <p className="text-orange-600 font-bold text-sm mb-2">{shake.price}</p>
        <button
          onClick={() => addToCart(shake)}
          className="bg-orange-600 text-white text-sm py-1 px-3 rounded-full hover:bg-orange-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const { totalItems } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
      

        {/* Navbar Container */}
        <div className="container mx-auto px-4 text-white">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex-grow container mx-auto px-4 py-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
              Shakes
            </h1>
            <p className="text-white text-lg md:text-xl font-medium drop-shadow-lg">
              Grab Your Favourite Sweets only at Akram Sweets
            </p>
          </div>

          {/* Shakes Container */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {shakeItems.map((shake) => (
                <ShakeCard key={shake.id} shake={shake} />
              ))}
            </div>
          </div>
        </div>

        {/* Iced Beverages Section */}
        <IcedBeverages />

        {/* Fast Food Section */}
        <FastFood />

        {/* Cart Summary */}
        <CartSummary />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
} 