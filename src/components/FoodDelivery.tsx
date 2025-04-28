import { Button } from "./ui/button";

const FoodDelivery = () => {
  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/assets/photo-3.png"
              alt="Food Delivery"
              className="w-full h-auto rounded-[40px] relative z-10"
              style={{
                clipPath:
                  "path('M0,0 L100%,0 L100%,85% C75%,100% 50%,95% 0,85% L0,0 Z')",
              }}
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-bold leading-tight">
              Food from your favorite restaurants to your table
            </h2>
            <p className="text-gray-600">
              Enjoy your favorite dishes from the best local restaurants,
              delivered right to your doorstep. Whether you’re in the mood for a
              quick bite or a full meal, we bring a wide range of cuisines to
              satisfy your cravings. Order now for fast, reliable delivery and
              indulge in fresh, delicious food from your favorite places.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full">
              ORDER NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDelivery;
