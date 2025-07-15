import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Shield className="h-12 w-12 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. This area is restricted to administrators only.
            </p>
            
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                asChild 
                className="w-full"
                onClick={() => window.history.back()}
              >
                <div>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccessDenied; 