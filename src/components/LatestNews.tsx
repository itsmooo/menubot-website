import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  image: string;
  tags: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  views: string;
}

const SmallNewsCard = ({
  image,
  tags,
  title,
  description,
  author,
  date,
  views,
}: NewsCardProps) => {
  return (
    <div className="flex gap-4 bg-orange-200 rounded-xl p-3">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col">
        <div className="flex gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-gray-200" />
            by {author}
          </span>
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <span>👁</span> {views}
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedNewsCard = ({
  image,
  tags,
  title,
  description,
  author,
  date,
  views,
}: NewsCardProps) => {
  return (
    <div className="bg-orange-200 rounded-xl p-4">
      <img
        src={image}
        alt={title}
        className="w-full aspect-[16/9] object-cover rounded-xl mb-4"
      />
      <div className="flex gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-gray-200" />
          by {author}
        </span>
        <span>{date}</span>
        <span className="flex items-center gap-1">
          <span>👁</span> {views}
        </span>
      </div>
      <button className="bg-orange-500 text-white py-2 px-4 rounded-md flex items-center gap-2 mt-6 text-sm font-medium">
        Read More <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

const LatestNews = () => {
  const featuredNews = {
    image:
      "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["news", "MenuBot"],
    title: "We Have Received An Award For The Quality Of Our Work",
    description:
      "QuickEat is committed to reducing environmental impact. Learn about our new sustainable packaging program and how we're making food delivery more eco-conscious.",
    author: "Quickeat",
    date: "01.Jan.2022",
    views: "132",
  };

  const news = [
    {
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["restaurants", "cooking"],
      title: "With Menubot you can order food for the whole day",
      description:
        "We're thrilled to announce that QuickEat has been recognized as the leading food delivery service in the region. This award celebrates our commitment to exceptional service, innovative technology, and partnership with top restaurants to bring you the best dining experience possible.",
      author: "Quickeat",
      date: "01.Jan.2022",
      views: "132",
    },
    {
      image: "/assets/food-2.png",
      tags: ["restaurants", "cooking"],
      title: "127+ Couriers On Our Team!",
      description:
        "Now you can schedule your favorite meals up to a week in advance. Perfect for busy professionals and families who want to ensure they never miss a great meal",
      author: "Quickeat",
      date: "01.Jan.2022",
      views: "132",
    },
    {
      image:
        "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["restaurants", "cooking"],
      title: "Why You Should Optimize Your Menu for Delivery",
      description:
        "We're expanding our restaurant network to bring you more choices than ever. From local favorites to trending hotspots, discover new flavors every day.",
      author: "Quickeat",
      date: "01.Jan.2022",
      views: "132",
    },
  ];

  return (
    <div className="bg-orange-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">
          Latest news and
          <br />
          events
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeaturedNewsCard {...featuredNews} />
          <div className="flex flex-col gap-6">
            {news.map((item, index) => (
              <SmallNewsCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
