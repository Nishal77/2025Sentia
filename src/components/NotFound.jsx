import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/">Go to Homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/adminpanel">Admin Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 