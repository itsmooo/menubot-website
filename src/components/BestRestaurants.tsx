import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const RestaurantCard = ({
  name,
  image,
  rating,
  reviews,
  category,
  time,
  price,
}: {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  time: string;
  price: string;
}) => {
  // Create stars based on rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-orange-400" : "text-gray-300"}>
      ★
    </span>
  ));

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="p-4 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex">{stars}</div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{category}</span>
          <span>{time}</span>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

const BestRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Jaziira Village Restaurant",
      image: "/assets/res1.png",
      rating: 4,
      reviews: 91,
      category: "Traditional Somali",
      time: "30-40 min",
      price: "$$$",
    },
    {
      id: 2,
      name: "Labella Restaurant",
      image: "/assets/res2.png",
      rating: 5,
      reviews: 124,
      category: "Somali Cuisine",
      time: "15-20 min",
    
    },
    {
      id: 3,
      name: "Karmel Restaurant",
      image: "/assets/res3.png",
      rating: 4,
      reviews: 154,
      category: "Modern Somali",
      time: "25-35 min",
    
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-14">
          <h2 className="text-4xl font-bold">
            12 Best Restaurants In Your City
          </h2>
          <p className="text-gray-600 max-w-md mt-4 md:mt-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
              reviews={restaurant.reviews}
              category={restaurant.category}
              time={restaurant.time}
              price={restaurant.price}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestRestaurants;
