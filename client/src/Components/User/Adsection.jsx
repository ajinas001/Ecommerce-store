import React from 'react';

const OneTimeSale = () => {
  return (
    <div className="relative w-md">
      <div className="relative bg-gradient-to-r from-white via-gray-200 to-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Get 25% off during our one-time sale</h1>
          <p className="text-lg mb-6">
            Most of our products are limited releases that won't come back. Get your favorite items while they're in stock.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800">
            Get access to our one-time sale
          </button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">What are people saying?</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <blockquote className="bg-gray-100 p-4 rounded mb-4 md:mb-0 md:mr-4">
            <p className="text-gray-700 italic">
              "My order arrived super quickly. The product quality is amazing!"
            </p>
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded mb-4 md:mb-0 md:mr-4">
            <p className="text-gray-700 italic">
              "I had to return a purchase that didn't fit. The process was so easy and customer service was great!"
            </p>
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded">
            <p className="text-gray-700 italic">
              "Now that I'm on holiday for the summer, I'll be shopping here again for sure!"
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default OneTimeSale;
