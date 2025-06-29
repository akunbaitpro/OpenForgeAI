
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const PricingSection = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      isHighlighted: false,
      features: [
        "Up to 1,000 API calls/month",
        "Access to 1 pre-curated feed category",
        "Basic insights (timestamp, summary)",
        "Community support (email, 48-hour response)"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Developer",
      price: "$99",
      isHighlighted: false,
      description: "Everything in Free, plus:",
      features: [
        "Up to 10,000 API calls/month",
        "Access to 3 pre-curated feed categories",
        "Custom keywords & timespan filters",
        "Basic analytics dashboard",
        "Email & chat support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "$299",
      isHighlighted: true,
      description: "Everything in Developer, plus:",
      features: [
        "Up to 50,000 API calls/month",
        "Full curated feed categories (all available)",
        "Advanced insights (contextual analysis, on-chain references)",
        "Priority analytics & usage reports",
        "Priority email & chat support"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "Talk to us",
      isHighlighted: false,
      description: "Everything in Pro, plus:",
      features: [
        "Unlimited API calls",
        "Dedicated custom feeds (niche segments, extended timespans)",
        "Team onboarding & integration assistance",
        "SLA-backed priority support",
        "White-glove analytics & consulting"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-manrope font-[400] mb-6 text-gloria-light tracking-tight leading-tight"
            style={{ width: "85%", margin: "0 auto", letterSpacing: "-0.01em" }}>
          Pay as you scale.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.name}
            className={`border border-gloria-dark-accent ${
              tier.isHighlighted ? 'bg-gloria-primary/10' : 'bg-gloria-dark-accent'
            } text-gloria-light h-full flex flex-col`}
          >
            <CardHeader className="pb-0 pt-8">
              <h3 className="text-xl font-normal text-gloria-light mb-2">{tier.name}</h3>
              <div className="flex items-end mb-2">
                <span 
                  className="text-5xl font-manrope font-[400] tracking-tight"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {tier.price}
                </span>
                {tier.price !== "Talk to us" && (
                  <span className="ml-2 text-sm font-light text-gloria-secondary self-end mb-1.5">per month</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-6 pb-2">
              {tier.description && (
                <p className="text-sm text-gloria-secondary mb-5 font-light">{tier.description}</p>
              )}
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <Check className="text-gloria-primary mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-light leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-8 pb-8">
              <Button 
                className="w-full transition-all duration-300 hover:shadow-md" 
                variant={tier.buttonVariant}
                size="lg"
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
