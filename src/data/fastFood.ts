import {
  chickenNugget,
  sheeshDaawuuq,
  chickenFahitta,
  franciscoChickenSandwich,
  franciscoCurrySandwich,
  doubleMeatBurger,
  doubleChickenBurger,
  chickenBurger,
  meatBurger,
  philadelphiaChicken,
  philadelphiaMeat,
  philadelphiaChickenSandwich,
  chickenSandwich,
  frenchFries,
  caesarSalad,
  crispyChicken,
} from "../assets/images";

export const fastFoodItems = {
  firstRow: [
    {
      id: 1,
      name: "Chicken Nugget",
      price: "$5",
      image: chickenNugget,
      description: "Crispy golden chicken nuggets made with premium chicken breast, perfect for snacking or as a meal.",
      ingredients: ["Chicken breast", "Breadcrumbs", "Flour", "Eggs", "Spices"],
      nutritionalInfo: {
        calories: 250,
        protein: 14,
        carbs: 18,
        fat: 12
      },
      allergens: ["Gluten", "Eggs"],
      preparationTime: "10-12 minutes",
      spicyLevel: "Mild"
    },
    {
      id: 2,
      name: "Sheesh Daawuuq",
      price: "$5",
      image: sheeshDaawuuq,
      description: "Traditional Somali grilled chicken skewers marinated in aromatic spices.",
      ingredients: ["Chicken", "Somali spice blend", "Garlic", "Lemon", "Olive oil"],
      nutritionalInfo: {
        calories: 280,
        protein: 26,
        carbs: 8,
        fat: 16
      },
      preparationTime: "15-20 minutes",
      spicyLevel: "Medium"
    },
    {
      id: 3,
      name: "Chicken Fahitta",
      price: "$5",
      image: chickenFahitta,
      description: "Sizzling chicken fajitas with grilled peppers and onions, served with warm tortillas.",
      ingredients: ["Chicken breast", "Bell peppers", "Onions", "Fajita seasoning", "Tortillas"],
      nutritionalInfo: {
        calories: 320,
        protein: 28,
        carbs: 24,
        fat: 14
      },
      preparationTime: "15-18 minutes",
      spicyLevel: "Medium"
    },
    {
      id: 4,
      name: "Francisco Chicken Sandwich",
      price: "$5",
      image: franciscoChickenSandwich,
      description: "A San Francisco-inspired chicken sandwich with fresh avocado and special sauce.",
      ingredients: ["Grilled chicken breast", "Avocado", "Special sauce", "Lettuce", "Tomato", "Artisan bun"],
      nutritionalInfo: {
        calories: 450,
        protein: 32,
        carbs: 38,
        fat: 22
      },
      allergens: ["Gluten", "Eggs", "Soy"],
      preparationTime: "12-15 minutes",
      spicyLevel: "Mild"
    },
    {
      id: 5,
      name: "Francisco Curry Sandwich",
      price: "$5",
      image: franciscoCurrySandwich,
      description: "Fusion sandwich featuring tender chicken in a mild curry sauce with fresh vegetables.",
      ingredients: ["Chicken", "Curry sauce", "Mixed vegetables", "Fresh herbs", "Artisan bread"],
      nutritionalInfo: {
        calories: 420,
        protein: 28,
        carbs: 42,
        fat: 18
      },
      allergens: ["Gluten", "Milk"],
      preparationTime: "12-15 minutes",
      spicyLevel: "Medium"
    },
  ],
  secondRow: [
    {
      id: 6,
      name: "Double Meat Burger",
      price: "$7.5",
      image: doubleMeatBurger,
      description: "Two juicy beef patties with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Beef patties", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 750,
        protein: 48,
        carbs: 42,
        fat: 45
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "12-15 minutes"
    },
    {
      id: 7,
      name: "Double Chicken Burger",
      price: "$7.5",
      image: doubleChickenBurger,
      description: "Two juicy chicken patties with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Chicken patties", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 650,
        protein: 42,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Eggs"],
      preparationTime: "12-15 minutes"
    },
    {
      id: 8,
      name: "Chicken burger",
      price: "$5",
      image: chickenBurger,
      description: "A juicy chicken patty with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Chicken patty", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 550,
        protein: 36,
        carbs: 34,
        fat: 25
      },
      allergens: ["Gluten", "Eggs"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 9,
      name: "Meat burger",
      price: "$5",
      image: meatBurger,
      description: "A juicy beef patty with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 650,
        protein: 42,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 10,
      name: "Philadelphia Meat sandwich",
      price: "$5",
      image: philadelphiaMeat,
      description: "A classic Philly cheesesteak with thinly sliced beef, onions, and cheese.",
      ingredients: ["Beef", "Onions", "Cheese", "Roll"],
      nutritionalInfo: {
        calories: 650,
        protein: 32,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
  ],
  thirdRow: [
    {
      id: 11,
      name: "Chicken burger",
      price: "$5",
      image: chickenBurger,
      description: "A juicy chicken patty with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Chicken patty", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 550,
        protein: 36,
        carbs: 34,
        fat: 25
      },
      allergens: ["Gluten", "Eggs"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 12,
      name: "Meat burger",
      price: "$5",
      image: meatBurger,
      description: "A juicy beef patty with cheese, fresh vegetables, and our special sauce.",
      ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
      nutritionalInfo: {
        calories: 650,
        protein: 42,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 13,
      name: "Philadelphia Chicken",
      price: "$5.5",
      image: philadelphiaChicken,
      description: "A classic Philly cheesesteak with thinly sliced chicken, onions, and cheese.",
      ingredients: ["Chicken", "Onions", "Cheese", "Roll"],
      nutritionalInfo: {
        calories: 650,
        protein: 32,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 14,
      name: "Philadelphia Meat",
      price: "$5.5",
      image: philadelphiaMeat,
      description: "A classic Philly cheesesteak with thinly sliced beef, onions, and cheese.",
      ingredients: ["Beef", "Onions", "Cheese", "Roll"],
      nutritionalInfo: {
        calories: 650,
        protein: 32,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
  ],
  fourthRow: [
    {
      id: 15,
      name: "Philadelphia Chicken Sandwich",
      price: "$5",
      image: philadelphiaChickenSandwich,
      description: "A classic Philly cheesesteak with thinly sliced chicken, onions, and cheese.",
      ingredients: ["Chicken", "Onions", "Cheese", "Roll"],
      nutritionalInfo: {
        calories: 650,
        protein: 32,
        carbs: 38,
        fat: 35
      },
      allergens: ["Gluten", "Milk", "Soy"],
      preparationTime: "10-12 minutes"
    },
    {
      id: 16,
      name: "Chicken sandwich",
      price: "$4",
      image: chickenSandwich,
      description: "A classic chicken sandwich with lettuce, tomato, and special sauce.",
      ingredients: ["Chicken", "Lettuce", "Tomato", "Special sauce"],
      nutritionalInfo: {
        calories: 450,
        protein: 28,
        carbs: 34,
        fat: 22
      },
      allergens: ["Gluten", "Eggs"],
      preparationTime: "5-7 minutes"
    },
    {
      id: 17,
      name: "French Fries",
      price: "$2",
      image: frenchFries,
      description: "Crispy golden fries served with ketchup.",
      ingredients: ["Potatoes", "Vegetable oil"],
      nutritionalInfo: {
        calories: 250,
        protein: 4,
        carbs: 38,
        fat: 14
      },
      preparationTime: "10-15 minutes"
    },
    {
      id: 18,
      name: "Caesar Salad",
      price: "$5",
      image: caesarSalad,
      description: "A classic Caesar salad with romaine lettuce, croutons, and Caesar dressing.",
      ingredients: ["Romaine lettuce", "Croutons", "Caesar dressing"],
      nutritionalInfo: {
        calories: 250,
        protein: 8,
        carbs: 22,
        fat: 14
      },
      preparationTime: "5-7 minutes"
    },
  ],
};
