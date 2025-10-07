import React from 'react';
import { assets } from '../assets/assets';

const Buycredit = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: [
        "10,000 Credits",
        "Standard Support",
        "Basic Features",
        "Email Assistance"
      ],
      recommended: false
    },
    {
      name: "Advanced",
      price: "$19.99",
      features: [
        "25,000 Credits",
        "Priority Support",
        "Advanced Features",
        "24/7 Chat Assistance"
      ],
      recommended: true
    },
    {
      name: "Business",
      price: "$49.99",
      features: [
        "100,000 Credits",
        "24/7 Premium Support",
        "All Features Included",
        "Dedicated Account Manager"
      ],
      recommended: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative bg-white rounded-lg shadow-md p-6 border ${
              plan.recommended 
                ? 'border-green-500 transform scale-105' 
                : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Recommended
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
            <h4 className="text-3xl font-bold text-green-500 mb-6">{plan.price}</h4>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <img 
                    src={assets.lock} 
                    alt="lock icon" 
                    className="w-4 h-4 mt-1 mr-2" 
                  />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 px-4 rounded-lg font-bold ${
              plan.recommended
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } transition-colors`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buycredit;