import { Award, Monitor, Code, MessageSquare, Clock, Users, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useAdmin } from "../../contexts/AdminContext";

type Page = "home" | "about" | "courses" | "admissions" | "gallery" | "contact";

interface CoursesProps {
  onNavigate: (page: Page) => void;
}

export function Courses({ onNavigate }: CoursesProps) {
  const { courses } = useAdmin();

  const getIcon = (iconType: string) => {
    const iconClass = "w-12 h-12 text-[#C9A24D]";
    switch (iconType) {
      case "Award":
        return <Award className={iconClass} />;
      case "Monitor":
        return <Monitor className={iconClass} />;
      case "Code":
        return <Code className={iconClass} />;
      case "MessageSquare":
        return <MessageSquare className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F0F12] mb-4 sm:mb-6">
              Our Courses
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#4A4A4A] max-w-3xl mx-auto px-4">
              Choose from our carefully designed courses to kickstart your learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {courses.map((course) => (
            <Card key={course.id} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C9A24D]/10 rounded-lg flex items-center justify-center">
                      {getIcon(course.iconType)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-[#0F0F12] mb-2">
                      {course.title}
                    </h2>
                    <p className="text-[#C9A24D] mb-3 sm:mb-4 text-sm sm:text-base">{course.subtitle}</p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-[#7A7A7A]">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#7A7A7A]">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{course.target}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base text-[#4A4A4A] mb-6 sm:mb-8 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  {/* Course Highlights */}
                  <div>
                    <h3 className="text-base sm:text-lg text-[#0F0F12] mb-3 sm:mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A24D]" />
                      Course Highlights
                    </h3>
                    <ul className="space-y-2">
                      {course.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#4A4A4A] text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Syllabus */}
                  <div>
                    <h3 className="text-base sm:text-lg text-[#0F0F12] mb-3 sm:mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A24D]" />
                      What You'll Learn
                    </h3>
                    <ul className="space-y-2">
                      {course.syllabus.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#4A4A4A] text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                  <Button
                    className="bg-[#C9A24D] hover:bg-[#b8923d] text-white text-sm sm:text-base w-full sm:w-auto"
                    onClick={() => onNavigate("admissions")}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#0F0F12] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
            Not Sure Which Course to Choose?
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-4">
            Contact us for personalized guidance and course recommendations
          </p>
          <Button
            variant="outline"
            className="border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white text-sm sm:text-base w-full sm:w-auto"
            onClick={() => onNavigate("contact")}
          >
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}