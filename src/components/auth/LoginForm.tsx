import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { LogIn, Mail, Lock, User, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E5] to-[#FFE0B2]">
      {/* Header */}
      <div className="container mx-auto px-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-orange-500" />
                Secure Login
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 py-3 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 py-3 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
                      Create Account
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Secure</h3>
              <p className="text-sm text-gray-600">Your data is protected</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Fast</h3>
              <p className="text-sm text-gray-600">Quick access to your account</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <User className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Easy</h3>
              <p className="text-sm text-gray-600">Simple and intuitive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
