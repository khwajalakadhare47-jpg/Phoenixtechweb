import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F0F12] mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#4A4A4A] max-w-3xl mx-auto px-4">
              Get in touch with us for any queries or visit our center in Hadapsar, Pune
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Address</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Lane No. 11-B, Opposite Etasha Society<br />
                  Sayyad Nagar, Hadapsar<br />
                  Pune 411028, Maharashtra
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Phone</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  <a href="tel:+918605601030" className="hover:text-[#C9A24D] transition-colors">
                    86056 01030
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1">
                  <a href="tel:+918007577648" className="hover:text-[#C9A24D] transition-colors">
                    80075 77648
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Email</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  <a href="mailto:info@phoenix-tech.in" className="hover:text-[#C9A24D] transition-colors break-all">
                    info@phoenix-tech.in
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1">
                  <a href="http://www.phoenix-tech.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A24D] transition-colors break-all">
                    www.phoenix-tech.in
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A24D]/10 rounded-full mb-3 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-[#0F0F12] mb-2 sm:mb-3 text-sm sm:text-base">Office Hours</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Monday - Saturday<br />
                  9:00 AM - 7:00 PM<br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map and Quick Contact */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#0F0F12] mb-4 sm:mb-6">Find Us on Map</h2>
              <Card className="bg-[#F7F8FA] border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="w-full h-[300px] sm:h-[400px] bg-gray-200 flex items-center justify-center">
                    {/* Google Maps Embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7!2d73.9347!3d18.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzMyLjAiTiA3M8KwNTYnMDUuMCJF!5e0!3m2!1sen!2sin!4v1234567890&q=Lane+No.+11-B,+Opposite+Etasha+Society,+Sayyad+Nagar,+Hadapsar,+Pune+411028"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Phoenix Tech Academy - Lane No. 11-B, Opposite Etasha Society, Sayyad Nagar, Hadapsar, Pune 411028"
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Contact Form Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#0F0F12] mb-4 sm:mb-6">Get in Touch</h2>
              <Card className="bg-[#F7F8FA] border-none shadow-lg">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-lg sm:text-xl text-[#0F0F12] mb-2 sm:mb-3">Visit Our Center</h3>
                      <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                        We welcome you to visit our state-of-the-art facility in Hadapsar, Pune. 
                        Our team will be happy to show you around and answer all your questions about our courses.
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-xl text-[#0F0F12] mb-2 sm:mb-3">Directions</h3>
                      <p className="text-sm sm:text-base text-[#4A4A4A] mb-3 sm:mb-4">
                        Phoenix Tech Academy is located at Lane No. 11-B, opposite Etasha Society in Sayyad Nagar, Hadapsar. Easily accessible by public transport and private vehicles.
                      </p>
                      <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#7A7A7A]">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                          <span>Opposite Etasha Society, Sayyad Nagar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                          <span>Ample parking space available</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                          <span>Well connected by local buses and auto-rickshaws</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-xl text-[#0F0F12] mb-2 sm:mb-3">Have Questions?</h3>
                      <p className="text-sm sm:text-base text-[#4A4A4A] mb-3 sm:mb-4">
                        Call us or send an email, and our team will respond within 24 hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <a
                          href="tel:+918605601030"
                          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#C9A24D] hover:bg-[#b8923d] text-white rounded-lg transition-colors text-center text-sm sm:text-base"
                        >
                          Call Now
                        </a>
                        <a
                          href="mailto:info@phoenix-tech.in"
                          className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white rounded-lg transition-colors text-center text-sm sm:text-base"
                        >
                          Email Us
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#F7F8FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0F0F12] mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">What are the batch timings?</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  We offer flexible batch timings including morning, afternoon, and evening batches. 
                  Contact us to know the current schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">Is there any age limit for courses?</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Most of our courses are open to all age groups. MS-CIT requires students to be 14+ years. 
                  Coding classes are designed for students in Class 6-12.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">Do you provide certificates?</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Yes, we provide course completion certificates. MS-CIT students receive government-approved 
                  certification from MKCL after passing the examination.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-[#0F0F12] mb-2 text-sm sm:text-base">Can I visit the center before admission?</h3>
                <p className="text-xs sm:text-sm text-[#7A7A7A]">
                  Absolutely! We encourage you to visit our center, meet our faculty, and see our facilities 
                  before making a decision. No appointment necessary during office hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}