
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import BestRestaurants from "@/components/BestRestaurants";
import FoodDelivery from "@/components/FoodDelivery";
import ServiceStats from "@/components/ServiceStats";
import Testimonials from "@/components/Testimonials";
import Partnership from "@/components/Partnership";
import LatestNews from "@/components/LatestNews";
import GetMenu from "@/components/GetMenu";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative w-full bg-[#FFF4E5]">
      <div className="absolute w-full z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      {/* Full width sections with centered content */}
      <Hero />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <HowItWorks />
      </div>
      <div className="bg-gradient-to-r from-[#FFF4E5] to-[#FFE0B2] w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <BestRestaurants />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FoodDelivery />
      </div>
      <div className="bg-gradient-to-r from-[#FFE0B2] to-[#FFF4E5] w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceStats />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>
      <div className="bg-gradient-to-r from-[#FFA500] to-[#FFB84D] w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Partnership />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <LatestNews />
      </div>
      <div className="bg-gradient-to-r from-[#FFF4E5] to-[#FFE0B2] w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <GetMenu />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
