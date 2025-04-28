
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#FFF4E5] to-[#FFA500]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
              The Best<br />
              Restaurants<br />
              In Your Home
            </h1>
            <p className="text-gray-600 text-lg">
              Get your favorite restaurant's dishes delivered to your doorstep with just a few clicks
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <select className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Choose a Restaurant</option>
                <option>Safari Restaurant</option>
                <option>Xamar Restaurant</option>
                <option>Mogadishu Kitchen</option>
                <option>Somali Deli</option>
              </select>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                ORDER NOW
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Restaurant Count Card */}
            <div className="absolute top-10 -left-10 bg-white rounded-xl p-4 shadow-lg z-10">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xl">12 Restaurant</div>
                  <div className="text-gray-500 text-sm">in Your city</div>
                </div>
              </div>
            </div>

            {/* Main Image with Background */}
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400 rounded-[2rem] transform rotate-6"></div>
              <img 
                src="/assets/man.png" 
                alt="Delivery Person" 
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
