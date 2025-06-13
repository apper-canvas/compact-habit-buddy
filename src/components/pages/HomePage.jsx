import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Habit Buddy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build better habits, track your progress, and achieve your goals with our intuitive habit tracking platform.
          </p>
        </header>
        
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Track Your Habits
            </h2>
            <p className="text-gray-600">
              Monitor your daily habits and build consistency with our easy-to-use tracking system.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              View Progress
            </h2>
            <p className="text-gray-600">
              Visualize your progress with detailed analytics and charts to stay motivated.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Achieve Goals
            </h2>
            <p className="text-gray-600">
              Set meaningful goals and celebrate your achievements along the way.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;