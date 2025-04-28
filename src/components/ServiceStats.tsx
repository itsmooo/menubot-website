const StatCard = ({ number, label }: { number: string, label: string }) => {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-orange-500">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const ServiceStats = () => {
  return (
    <section className="py-20 px-6 lg:px-20">
      <div>
        <h2 className="text-3xl font-bold mb-12">Service shows good taste.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <StatCard number="976+" label="Satisfied Customers" />
          <StatCard number="12" label="Best Restaurants" />
          <StatCard number="1K+" label="Food Delivered" />
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;
