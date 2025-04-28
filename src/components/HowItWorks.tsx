import { ArrowRight } from "lucide-react";

const HowItWorksCard = ({
  number,
  title,
  description,
  image,
}: {
  number: number;
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <img src={image} alt={title} className="w-32 h-32 object-contain" />
      <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-500 font-bold">
        {number}
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Select Restaurant",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/assets/Illustration-1.png",
    },
    {
      number: 2,
      title: "Select menu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/assets/Illustration-2.png",
    },
    {
      number: 3,
      title: "Wait for delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/assets/illustration-3.png",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <HowItWorksCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
