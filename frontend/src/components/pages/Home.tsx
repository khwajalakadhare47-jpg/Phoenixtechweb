import { Award, Laptop, Code, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import logoImage from "../../assets/logophoneix.png";
import { useAdmin, Course } from "../../contexts/AdminContext";
import { Page } from "../../App";

interface HomeProps {
  onNavigate: (page: Page) => void; //
}

export function Home({ onNavigate }: HomeProps) {
  const { courses } = useAdmin();

  // Helper to resolve icon strings to actual components
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'Award': return <Award className="w-10 h-10 text-[#C9A24D]" />;
      case 'Laptop': return <Laptop className="w-10 h-10 text-[#C9A24D]" />;
      case 'Code': return <Code className="w-10 h-10 text-[#C9A24D]" />;
      case 'MessageSquare': return <MessageSquare className="w-10 h-10 text-[#C9A24D]" />;
      default: return <TrendingUp className="w-10 h-10 text-[#C9A24D]" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logoImage}
                  alt="Phoenix Tech Academy Logo"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                />
                <div>
                  <h2 className="text-lg sm:text-xl text-[#C9A24D] font-semibold">Phoenix Tech Academy</h2>
                  <p className="text-sm sm:text-base text-[#7A7A7A]">From Ideas to Impact</p>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#0F0F12] mb-4 sm:mb-6 leading-tight">
                Welcome to Phoenix Tech Academy
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#4A4A4A] mb-6 sm:mb-8 leading-relaxed">
                Empowering students with essential computer skills and technology education in Hadapsar, Pune.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button
                  className="bg-[#C9A24D] hover:bg-[#b8923d] text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                  onClick={() => onNavigate("admissions")}
                >
                  Enquire Now
                </Button>
                <Button
                  variant="outline"
                  className="border-[#0F0F12] text-[#0F0F12] hover:bg-[#F7F8FA] px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                  onClick={() => onNavigate("courses")}
                >
                  View Courses
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1723987135977-ae935608939e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNsYXNzcm9vbSUyMHN0dWRlbnRzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMjExNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Computer classroom"
                className="w-full h-48 sm:h-64 md:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Courses Overview */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Our Courses
            </h2>
            <p className="text-sm sm:text-base text-[#7A7A7A]">
              Choose from our range of professional courses managed via Admin Panel
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courses.slice(0, 4).map((course: Course, index: number) => (
              <Card key={course.id || index} className="bg-white hover:shadow-xl transition-shadow border border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4">
                    {getIcon(course.iconType)}
                  </div>
                  <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">{course.title}</h3>
                  <p className="text-xs sm:text-sm text-[#C9A24D] mb-2 sm:mb-3">{course.duration}</p>
                  <p className="text-xs sm:text-sm text-[#7A7A7A] line-clamp-2">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button
              variant="outline"
              className="border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
              onClick={() => onNavigate("courses")}
            >
              Explore All {courses.length} Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Infrastructure Highlights */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxNDk1NTR8MA"
                alt="Modern classroom"
                className="w-full h-48 sm:h-64 md:h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-4 sm:mb-6">
                Modern Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-[#4A4A4A] mb-4 sm:mb-6 leading-relaxed">
                Our state-of-the-art facilities provide the perfect environment for learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}