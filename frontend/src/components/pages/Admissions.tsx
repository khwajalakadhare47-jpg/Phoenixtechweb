import { CheckCircle2, FileText, Calendar, UserCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { EnquiryForm } from "../EnquiryForm";

export function Admissions() {
  const steps = [
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Fill Enquiry Form",
      description: "Complete the student enquiry form below with your details"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Submit Documents",
      description: "Upload the required documents for verification"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule Interview",
      description: "We will schedule an interview with you"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Start Learning",
      description: "Begin your journey with us and achieve your goals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F0F12] mb-4 sm:mb-6">
              Admissions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#4A4A4A] max-w-3xl mx-auto px-4">
              Start your learning journey with Phoenix Tech Academy today
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Simple Admission Process
            </h2>
            <p className="text-sm sm:text-base text-[#7A7A7A] max-w-2xl mx-auto px-4">
              Getting started is easy - just follow these simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white border-none shadow-lg h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4 text-[#C9A24D]">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-7 h-7 sm:w-8 sm:h-8 bg-[#C9A24D] text-white rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
                      {index + 1}
                    </div>
                    <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#7A7A7A]">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Admission Requirements
            </h2>
          </div>
          
          <Card className="bg-[#F7F8FA] border-none shadow-lg">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A24D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] sm:text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#0F0F12] mb-1 text-sm sm:text-base">For MS-CIT</h4>
                    <p className="text-xs sm:text-sm text-[#7A7A7A]">Basic knowledge of English, Age 14+ years</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A24D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] sm:text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#0F0F12] mb-1 text-sm sm:text-base">For Basic Computer Course</h4>
                    <p className="text-xs sm:text-sm text-[#7A7A7A]">No prior knowledge required, All ages welcome</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A24D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] sm:text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#0F0F12] mb-1 text-sm sm:text-base">For Coding Classes</h4>
                    <p className="text-xs sm:text-sm text-[#7A7A7A]">Students from Class 6 to 12, Interest in programming</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A24D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] sm:text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#0F0F12] mb-1 text-sm sm:text-base">For English Speaking</h4>
                    <p className="text-xs sm:text-sm text-[#7A7A7A]">All age groups, Basic English understanding helpful</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <h4 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Documents Required:</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#7A7A7A]">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                      Recent passport size photograph
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                      ID proof (Aadhaar Card / School ID)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                      Address proof (if required)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Student Enquiry Form
            </h2>
            <p className="text-sm sm:text-base text-[#7A7A7A] max-w-2xl mx-auto px-4">
              Fill out the form below and our team will get back to you shortly
            </p>
          </div>

          {/* Enquiry Form Embed */}
          <Card className="bg-white border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <EnquiryForm />
            </CardContent>
          </Card>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-[#7A7A7A] px-4">
              Alternatively, you can visit us directly at our Hadapsar center or call us for immediate assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info CTA */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#0F0F12] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
            Need Help with Admissions?
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-4">
            Our team is here to guide you through the admission process
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <a href="tel:+91XXXXXXXXXX" className="px-6 sm:px-8 py-3 bg-[#C9A24D] hover:bg-[#b8923d] text-white rounded-lg transition-colors text-sm sm:text-base text-center">
              Call Us Now
            </a>
            <a href="mailto:info@phoenix-tech.in" className="px-6 sm:px-8 py-3 border-2 border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white rounded-lg transition-colors text-sm sm:text-base text-center">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}