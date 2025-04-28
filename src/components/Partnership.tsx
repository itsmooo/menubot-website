
import { Button } from "./ui/button";

const PartnershipCard = ({ title, image, buttonText }: { title: string, image: string, buttonText: string }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl border-2 border-orange-300">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
        <h3 className="font-bold text-xl mb-3">{title}</h3>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit rounded-full">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const Partnership = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-14 text-center">Want to Join Partnership?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PartnershipCard 
            title="Join Courier" 
            image="/placeholder.svg" 
            buttonText="Learn More" 
          />
          <PartnershipCard 
            title="Join Merchant" 
            image="/placeholder.svg" 
            buttonText="Learn More" 
          />
        </div>
      </div>
    </section>
  );
};

export default Partnership;
