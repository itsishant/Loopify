export const LandingPrices = () => {
  const subscriptions = [
    {
      id: 1,
      name: "Basic",
      price: "$9.99",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "1 Subscription tracking",
        "Basic renewal reminders",
        "Email notifications",
        "Access to 5 offers",
      ],
      highlighted: false,
    },
    {
      id: 2,
      name: "Pro",
      price: "$19.99",
      period: "/month",
      description: "Most popular for families",
      features: [
        "Up to 5 subscriptions",
        "Advanced renewal insights",
        "SMS + Email alerts",
        "Access to 25+ offers",
        "Priority support",
        "Personalized recommendations",
      ],
      highlighted: true,
    },
    {
      id: 3,
      name: "Premium",
      price: "$29.99",
      period: "/month",
      description: "For power users",
      features: [
        "Unlimited subscriptions",
        "Smart cost optimization",
        "All notification channels",
        "Access to all offers",
        "24/7 premium support",
        "Family sharing (5 accounts)",
        "Advanced analytics",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-32 py-20">
      <div className="text-center mb-16">
        <div className="font-poppins font-semibold text-6xl tracking-tight text-neutral-300 mb-4">
          Pricing Plans
        </div>
        <p className="text-neutral-500 text-lg">
          Choose the perfect plan for your subscription management needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl">
        {subscriptions.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg p-8 transition-all duration-300 ${
              plan.highlighted
                ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl transform md:scale-105"
                : "bg-neutral-900 border border-neutral-700 hover:border-neutral-600"
            }`}
          >
            {plan.highlighted && (
              <div className="text-sm font-semibold text-blue-200 mb-4">
                ⭐ MOST POPULAR
              </div>
            )}
            <h3
              className={`font-poppins font-semibold text-2xl mb-2 ${
                plan.highlighted ? "text-white" : "text-neutral-200"
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={`text-sm mb-4 ${
                plan.highlighted ? "text-blue-100" : "text-neutral-500"
              }`}
            >
              {plan.description}
            </p>

            <div className="mb-6">
              <span
                className={`font-poppins font-bold text-4xl ${
                  plan.highlighted ? "text-white" : "text-blue-400"
                }`}
              >
                {plan.price}
              </span>
              <span
                className={`text-sm ${
                  plan.highlighted ? "text-blue-100" : "text-neutral-500"
                }`}
              >
                {plan.period}
              </span>
            </div>

            <button
              className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                plan.highlighted
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Get Started
            </button>

            <div className="space-y-4">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <span
                    className={`mr-3 text-lg ${
                      plan.highlighted ? "text-blue-100" : "text-blue-400"
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-blue-50" : "text-neutral-400"
                    }`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-neutral-500 text-sm">
          All plans include automatic OTPP subscription fetching and renewal
          tracking
        </p>
      </div>
    </div>
  );
};
