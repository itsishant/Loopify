export const LandingSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account and get started in minutes",
    },
    {
      number: 2,
      title: "Auto-Fetch Subscription",
      description:
        "We automatically retrieve your current OTPP subscription details",
    },
    {
      number: 3,
      title: "Add More Coverage",
      description: "Easily add additional subscriptions if needed",
    },
    {
      number: 4,
      title: "View Offers",
      description: "Explore personalized offers and discounts available to you",
    },
    {
      number: 5,
      title: "Manage Renewals",
      description: "Track upcoming renewals and manage them effortlessly",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <div className="text-center mt-16">
        <div className="font-poppins font-semibold text-6xl tracking-tight text-neutral-300 mb-4">
          How it Works
        </div>
        <p className="text-neutral-500 text-lg">
          step by step guide to managing your subscriptions with Loopify
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-22 px-8 max-w-7xl">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
              <span className="text-neutral-300 font-poppins font-semibold text-xl">
                {step.number}
              </span>
            </div>
            <h3 className="font-poppins font-semibold text-neutral-300 text-lg text-center mb-2">
              {step.title}
            </h3>
            <p className="text-neutral-600 text-center font-poppins text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
