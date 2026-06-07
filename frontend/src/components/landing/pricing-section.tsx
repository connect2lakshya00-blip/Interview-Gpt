"use client";

import { motion } from "framer-motion";
import { GradientBorder } from "@/components/ui/gradient-border";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    icon: Zap,
    description: "Perfect for getting started",
    features: [
      "5 AI interviews per month",
      "Basic analytics",
      "Resume analysis",
      "Community support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    icon: Crown,
    description: "For serious job seekers",
    features: [
      "Unlimited AI interviews",
      "Advanced analytics",
      "Priority support",
      "Custom interview scenarios",
      "Voice interviews",
      "Performance tracking"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    icon: Rocket,
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Advanced integrations"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your interview preparation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <GradientBorder animate={plan.popular}>
                <div className="p-8 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    plan.popular ? 'from-blue-500 to-purple-500' : 'from-gray-700 to-gray-800'
                  } flex items-center justify-center mb-6`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/register">
                    <AnimatedButton 
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </AnimatedButton>
                  </Link>
                </div>
              </GradientBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
