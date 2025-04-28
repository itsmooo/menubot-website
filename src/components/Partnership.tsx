import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PartnershipCardProps {
  title: string;
  image: string;
}

const PartnershipCard = ({ title, image }: PartnershipCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border-[3px] border-orange-400">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[400px] object-cover" 
      />
      <div className="absolute bottom-0 left-0 z-20 p-8 w-full">
        <h3 className="font-bold text-4xl mb-6 text-white">{title}</h3>
        <Button 
          variant="default"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg px-5 py-3 h-auto group"
        >
          LEARN MORE
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

const Partnership = () => {
  return (
    <section  className=" py-24 bg-[#1A1A1A] text-white">
      <div className="container mx-auto md:px-8">
        <h2 className="text-5xl font-bold mb-16 text-center">Want to Join Partnership?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <PartnershipCard 
            title="Join Courier" 
            image="/assets/man-dev.png" 
          />
          <PartnershipCard 
            title="Join Merchant" 
            image="/assets/partener.png" 
          />
        </div>
      </div>
    </section>
  );
};

export default Partnership;