import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Village from "@/assets/village.png";
import karmel from "@/assets/karmel.jpg";
import food3 from "@/assets/food-3.png";
import food4 from "@/assets/food-4.png";
import food5 from "@/assets/food-5.png";
import food6 from "@/assets/food-6.png";

const restaurants = [
  {
    id: 1,
    name: "The Village Restaurant",
    cuisine: "Somali",
    rating: 4.8,
    deliveryTime: "20-30 min",
    location: "Hodan, Mogadishu",
    image: Village, // Replace with your actual image
    description:
      "Famous for traditional Somali dishes like suqaar, canjeero, and hilib ari.",
  },
  {
    id: 2,
    name: "karmel restaurant",
    cuisine: "Fusion",
    rating: 4.9,
    deliveryTime: "25-35 min",
    location: "Airport Road, Mogadishu",
    image: karmel,
    description:
      "Modern café offering coffee, desserts, and international light meals.",
  },
  {
    id: 3,
    name: "Jazeera Seafood Restaurant",
    cuisine: "Seafood",
    rating: 4.7,
    deliveryTime: "30-40 min",
    location: "Jazeera Beach, Mogadishu",
    image: food3,
    description:
      "Enjoy freshly grilled seafood with ocean views and Somali hospitality.",
  },
  {
    id: 4,
    name: "Fatxi Restaurant",
    cuisine: "Somali",
    rating: 4.6,
    deliveryTime: "25-35 min",
    location: "KM4, Mogadishu",
    image: food4,
    description:
      "Authentic Somali food served with traditional drinks and warm service.",
  },
  {
    id: 5,
    name: "Tufaax Restaurant",
    cuisine: "Somali",
    rating: 4.5,
    deliveryTime: "15-25 min",
    location: "Hotel Guuleed, Mogadishu",
    image: food5,
    description:
      "Cozy setting with delicious Somali breakfasts, camel meat, and xalwo.",
  },
  {
    id: 6,
    name: "Pizza House Mogadishu",
    cuisine: "Pizza & Fast Food",
    rating: 4.4,
    deliveryTime: "20-30 min",
    location: "Maka Al Mukarama Road",
    image: food6,
    description:
      "Popular spot for pizza, burgers, and fast food loved by local youth.",
  },
];

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E5] to-[#FFE0B2]">
      {/* Header */}
      <div className="container mx-auto px-4">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Restaurants
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order from the best restaurants in your city
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            Start Ordering
          </Button>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Restaurants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of top-rated restaurants offering
              diverse cuisines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-orange-200"
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {restaurant.name}
                  </CardTitle>
                  <CardDescription>{restaurant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="font-semibold text-gray-700">
                        {restaurant.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{restaurant.location}</span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
