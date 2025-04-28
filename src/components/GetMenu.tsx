import { Button } from "./ui/button";

const GetMenu = () => {
  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/assets/illustration-4.png"
              alt="Mobile App"
              className="w-full max-w-md mx-auto"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              Get the menu of your favorite restaurants every day
            </h2>
            <p className="text-gray-600">
              Stay up-to-date with your favorite restaurants by receiving their
              latest menu updates directly on your phone. Get personalized
              notifications, explore new dishes, and never miss out on exclusive
              offers or special promotions. Download the app today and start
              enjoying food from the best local spots!
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full">
              Download App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetMenu;
