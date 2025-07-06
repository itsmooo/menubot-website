import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface FoodDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  food: {
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

export default function FoodDetailsDialog({ isOpen, onClose, food }: FoodDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{food.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Image Section */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full">
              {food.price}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            {food.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{food.description}</p>
              </div>
            )}

            {food.ingredients && food.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {food.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {food.nutritionalInfo && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  {food.nutritionalInfo.calories && (
                    <div>Calories: {food.nutritionalInfo.calories}kcal</div>
                  )}
                  {food.nutritionalInfo.protein && (
                    <div>Protein: {food.nutritionalInfo.protein}g</div>
                  )}
                  {food.nutritionalInfo.carbs && (
                    <div>Carbs: {food.nutritionalInfo.carbs}g</div>
                  )}
                  {food.nutritionalInfo.fat && (
                    <div>Fat: {food.nutritionalInfo.fat}g</div>
                  )}
                </div>
              </div>
            )}

            {food.allergens && food.allergens.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {food.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {food.preparationTime && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">Preparation Time:</span>
                <span className="text-gray-600">{food.preparationTime}</span>
              </div>
            )}

            {food.spicyLevel && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">Spicy Level:</span>
                <span className="text-gray-600">{food.spicyLevel}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 