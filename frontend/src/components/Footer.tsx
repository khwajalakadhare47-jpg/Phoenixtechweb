import { MapPin, Phone, Mail } from "lucide-react";
import logoImage from "../assets/logophoneix.png";

export function Footer() {
  return (
    <footer className="bg-[#0F0F12] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="Phoenix Tech Academy Logo" 
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
              />
              <div>
                <h3 className="text-[#C9A24D] text-base sm:text-lg font-semibold">Phoenix Tech Academy</h3>
                <p className="text-gray-400 text-xs">From Ideas to Impact</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Empowering students with computer skills and technology education in Pune.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C9A24D] mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#C9A24D] transition-colors">MS-CIT Course</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#C9A24D] transition-colors">Basic Computer Course</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#C9A24D] transition-colors">Coding Classes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#C9A24D] transition-colors">English Speaking</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#C9A24D] mb-3 sm:mb-4 text-base sm:text-lg">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A24D] mt-1 flex-shrink-0" />
                <span className="text-gray-300">Lane No. 11-B, Opposite Etasha Society, Sayyad Nagar, Hadapsar, Pune 411028</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A24D] flex-shrink-0" />
                <div className="text-gray-300">
                  <a href="tel:+918605601030" className="hover:text-[#C9A24D] transition-colors">86056 01030</a>
                  <span className="mx-2">|</span>
                  <a href="tel:+918007577648" className="hover:text-[#C9A24D] transition-colors">80075 77648</a>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A24D] flex-shrink-0" />
                <a href="mailto:info@phoenix-tech.in" className="text-gray-300 hover:text-[#C9A24D] transition-colors">info@phoenix-tech.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; 2026 Phoenix Tech Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}