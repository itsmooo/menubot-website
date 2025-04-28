
const Testimonials = () => {
  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              What customers say about us
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="border-l-4 border-orange-500 pl-6 py-2">
              <p className="italic text-gray-600 mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/photo-4.png" 
                  alt="Customer" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div>
                  <div className="font-semibold">Jenny Wilson</div>
                  <div className="text-gray-500 text-sm">Designer</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                ←
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 right-10 bottom-10 bg-orange-500 rounded-[40px] transform -rotate-6"></div>
            <img 
              src="/assets/photo-4.png" 
              alt="Customer Testimonial" 
              className="relative z-10 w-full h-auto rounded-[40px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
