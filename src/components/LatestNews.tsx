
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const NewsCard = ({ 
  image, 
  category, 
  date, 
  title, 
  description 
}: { 
  image: string, 
  category: string, 
  date: string, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-lg" 
        />
      </div>
      <div className="md:w-2/3 space-y-3">
        <div className="flex gap-3">
          <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-medium">
            {category}
          </span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <a href="#" className="text-orange-500 inline-flex items-center">
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const news = [
    {
      id: 1,
      image: "/placeholder.svg",
      category: "COMPANY",
      date: "July 14, 2023",
      title: "We Have Received An Award For The Quality Of Our Work",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 2,
      image: "/placeholder.svg",
      category: "DELIVERY",
      date: "July 12, 2023",
      title: "We are opening a new location in your city",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      image: "/placeholder.svg",
      category: "COURIER",
      date: "July 10, 2023",
      title: "We are starting the summer menu",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-14">Latest news and events</h2>
        
        <div className="flex flex-col gap-12">
          {news.map((item) => (
            <NewsCard 
              key={item.id}
              image={item.image}
              category={item.category}
              date={item.date}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
