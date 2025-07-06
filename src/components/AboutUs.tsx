import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Heart, Award } from "lucide-react"
import Navbar from "./Navbar"
import Footer from "./Footer"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/assets/man.png",
    description: "Passionate about connecting people with great food experiences",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/assets/man-dev.png",
    description: "Ensuring smooth operations and excellent customer service",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Marketing",
    image: "/assets/partener.png",
    description: "Building relationships with restaurants and customers",
  },
]

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We partner only with restaurants that meet our high standards for quality and service",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Supporting local restaurants and bringing communities together through food",
  },
  {
    icon: Target,
    title: "Customer Satisfaction",
    description: "Your satisfaction is our priority, from ordering to delivery",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Continuously improving our platform to provide the best experience",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E5] to-[#FFE0B2]">
      {/* Header */}
      <div className="container mx-auto px-4">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Our Story</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Connecting food lovers with amazing restaurants since 2020
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that great food brings people together. Our mission is to make it easier for you to discover
                and enjoy amazing meals from the best restaurants in your area.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2020, we've grown from a small startup to a platform serving thousands of customers daily,
                while maintaining our commitment to quality and community.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                  <div className="text-gray-600">Partner Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/assets/man.png"
                alt="Our team"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The passionate people behind our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full mx-auto w-48 h-48 object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{member.name}</CardTitle>
                  <CardDescription className="text-orange-600 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover your next favorite meal
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            Browse Restaurants
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
