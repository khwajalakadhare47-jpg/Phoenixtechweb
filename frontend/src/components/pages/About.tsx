import { Award, Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import logoImage from "../../assets/logophoneix.png";

export function About() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            {/* Logo Display */}
            <div className="flex justify-center mb-6">
              <img
                src={logoImage}
                alt="Phoenix Tech Academy Logo"
                className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F0F12] mb-4 sm:mb-6">
              About Phoenix Tech Academy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#4A4A4A] max-w-3xl mx-auto px-4">
              Empowering minds through quality education and technology training in Hadapsar, Pune
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-4 sm:mb-6">
                Who We Are
              </h2>
              <p className="text-sm sm:text-base text-[#4A4A4A] mb-3 sm:mb-4 leading-relaxed">
                Phoenix Tech Academy is a premier computer and skill development institute located in Hadapsar, Pune. We are dedicated to providing quality education and training to students, professionals, and individuals seeking to enhance their computer skills.
              </p>
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                As an authorized training center affiliated with MKCL (Maharashtra Knowledge Corporation Limited), we offer government-approved MS-CIT certification along with other professional courses designed to meet industry standards.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1763568258299-0bac211f204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZWR1Y2F0aW9uJTIwY29kaW5nfGVufDF8fHx8MTc3MDIxMTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Technology education"
                className="w-full h-48 sm:h-64 md:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-[#F7F8FA] border-none shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-4 sm:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-xl sm:text-2xl text-[#0F0F12] mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  To provide accessible, affordable, and high-quality computer education and skill development training that empowers individuals to achieve their full potential in the digital world. We strive to bridge the gap between traditional education and industry requirements through practical, hands-on training.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#F7F8FA] border-none shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-4 sm:mb-6">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-xl sm:text-2xl text-[#0F0F12] mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  To become the leading computer education institute in Pune, recognized for excellence in teaching, innovation in curriculum, and success of our students. We envision a future where every individual has the digital skills necessary to thrive in an increasingly technology-driven world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-[#7A7A7A] max-w-2xl mx-auto px-4">
              The principles that guide everything we do at Phoenix Tech Academy
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Student-Centric</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Every decision we make prioritizes the learning experience and success of our students
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Excellence</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  We maintain the highest standards in curriculum, teaching methods, and student outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Integrity</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  We build trust through honest communication, transparent processes, and ethical practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Affiliations & Recognition
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-[#F7F8FA] border-2 border-[#C9A24D] shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl text-[#0F0F12] mb-2">MKCL Authorized Center</h3>
                    <p className="text-sm sm:text-base text-[#4A4A4A]">
                      We are an authorized training and examination center for MS-CIT (Maharashtra State Certificate in Information Technology) by MKCL, Government of Maharashtra.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#0F0F12] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
              Why Trust Phoenix Tech Academy?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl text-[#C9A24D] mb-2">500+</div>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl text-[#C9A24D] mb-2">95%</div>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl text-[#C9A24D] mb-2">10+</div>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">Expert Trainers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl text-[#C9A24D] mb-2">4+</div>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}