import React, { useState } from 'react';
import { 
  Plane, 
  Calendar, 
  User, 
  Search, 
  Menu, 
  ChevronDown, 
  MapPin, 
  Globe, 
  Briefcase, 
  Info,
  ArrowRightLeft,
  X
} from 'lucide-react';

export default function AirlineHomePage() {
  const [activeTab, setActiveTab] = useState('book');
  const [tripType, setTripType] = useState('return');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Updated mock data for destinations (3 items, including Sri Lanka)
  const destinations = [
    { 
      city: 'Tokyo', 
      country: 'Japan', 
      price: 'SGD 858', 
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000' 
    },
    { 
      city: 'London', 
      country: 'United Kingdom', 
      price: 'SGD 1,245', 
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000' 
    },
    { 
      city: 'Colombo', 
      country: 'Sri Lanka', 
      price: 'SGD 685', 
      image: 'https://images.unsplash.com/photo-1588258524675-55d656396b8a?auto=format&fit=crop&q=80&w=1000' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* Navigation Bar */}
      <nav className="bg-[#00266b] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Area */}
            <div className="flex items-center gap-2 cursor-pointer">
              {/* Stylized Bird Icon representing the logo */}
              <div className="relative w-10 h-10">
                <Plane className="w-10 h-10 text-[#f5a623] transform -rotate-45 absolute" strokeWidth={1.5} />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-serif tracking-widest font-bold leading-none">SINGAPORE</h1>
                <h1 className="text-sm font-serif tracking-widest font-light leading-none">AIRLINES</h1>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <a href="#" className="hover:text-[#f5a623] transition-colors">PLAN TRAVEL</a>
              <a href="#" className="hover:text-[#f5a623] transition-colors">TRAVEL INFO</a>
              <a href="#" className="hover:text-[#f5a623] transition-colors">PPS CLUB</a>
              <a href="#" className="hover:text-[#f5a623] transition-colors">FOR BUSINESS</a>
            </div>

            {/* Right Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="flex items-center gap-1 hover:text-[#f5a623] text-xs font-medium">
                <Globe size={16} />
                <span>EN</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#f5a623] text-sm font-medium">
                <User size={18} />
                <span>Log-in / Sign-up</span>
              </button>
              <button className="text-white hover:text-[#f5a623]">
                <Search size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#001d52] border-t border-blue-900">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a href="#" className="block px-3 py-3 text-base font-medium text-white hover:bg-blue-900 rounded-md">Plan Travel</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-white hover:bg-blue-900 rounded-md">Travel Info</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-white hover:bg-blue-900 rounded-md">PPS Club</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-white hover:bg-blue-900 rounded-md">Log in</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Booking Widget */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000" 
            alt="Airplane wing in sky" 
            className="w-full h-[600px] object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
          <h2 className="text-4xl md:text-5xl font-serif text-white font-semibold mb-8 drop-shadow-lg">
            Welcome to World Class
          </h2>

          {/* Booking Widget Container */}
          <div className="bg-white rounded-t-lg shadow-2xl max-w-4xl overflow-hidden">
            
            {/* Widget Tabs */}
            <div className="flex bg-gray-100 border-b border-gray-200">
              {['book', 'manage', 'checkin', 'status'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-sm font-bold tracking-wide uppercase transition-colors
                    ${activeTab === tab 
                      ? 'bg-white text-[#00266b] border-t-4 border-[#f5a623]' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                >
                  {tab === 'book' && 'Book Trip'}
                  {tab === 'manage' && 'Manage Booking'}
                  {tab === 'checkin' && 'Check-in'}
                  {tab === 'status' && 'Flight Status'}
                </button>
              ))}
            </div>

            {/* Booking Form Content */}
            <div className="p-6 md:p-8 bg-white/95 backdrop-blur-sm">
              {activeTab === 'book' && (
                <div className="space-y-6">
                  {/* Radio Options */}
                  <div className="flex flex-wrap gap-6">
                    {['Return', 'One-way', 'Multi-city'].map((type) => (
                      <label key={type} className="flex items-center cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2
                          ${tripType === type.toLowerCase() ? 'border-[#00266b]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                          {tripType === type.toLowerCase() && <div className="w-2.5 h-2.5 rounded-full bg-[#00266b]" />}
                        </div>
                        <input 
                          type="radio" 
                          name="tripType" 
                          className="hidden"
                          checked={tripType === type.toLowerCase()}
                          onChange={() => setTripType(type.toLowerCase())}
                        />
                        <span className="text-gray-700 font-medium text-sm">{type}</span>
                      </label>
                    ))}
                    <label className="flex items-center cursor-pointer ml-auto">
                      <span className="text-[#00266b] font-medium text-sm hover:underline">Redeem flights</span>
                    </label>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* From / To */}
                    <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center border border-gray-300 rounded-lg p-2 relative bg-white hover:border-gray-400 transition-colors">
                      <div className="px-2">
                        <label className="block text-xs text-gray-500 uppercase font-bold">From</label>
                        <input type="text" defaultValue="Singapore" className="w-full font-semibold text-gray-900 outline-none placeholder-gray-300" />
                        <span className="text-xs text-gray-400">SIN</span>
                      </div>
                      <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#00266b]">
                        <ArrowRightLeft size={14} />
                      </button>
                      <div className="px-2 text-right">
                        <label className="block text-xs text-gray-500 uppercase font-bold">To</label>
                        <input type="text" placeholder="Select destination" className="w-full font-semibold text-gray-900 outline-none text-right placeholder-gray-400" />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="md:col-span-4 border border-gray-300 rounded-lg p-2 flex items-center bg-white hover:border-gray-400 transition-colors cursor-pointer">
                      <Calendar className="text-gray-400 mr-3" size={20} />
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 uppercase font-bold">Depart</label>
                        <span className="block font-semibold text-gray-900">18 Nov 2023</span>
                      </div>
                      {tripType === 'return' && (
                        <div className="flex-1 border-l border-gray-200 pl-3">
                          <label className="block text-xs text-gray-500 uppercase font-bold">Return</label>
                          <span className="block font-semibold text-gray-900">25 Nov 2023</span>
                        </div>
                      )}
                    </div>

                    {/* Passengers / Class */}
                    <div className="md:col-span-3 border border-gray-300 rounded-lg p-2 flex items-center bg-white hover:border-gray-400 transition-colors cursor-pointer">
                      <User className="text-gray-400 mr-3" size={20} />
                      <div>
                        <label className="block text-xs text-gray-500 uppercase font-bold">Class & Travellers</label>
                        <span className="block font-semibold text-gray-900 truncate">1 Adult, Economy</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button className="bg-[#f5a623] hover:bg-[#e09612] text-[#00266b] font-bold py-3 px-10 rounded shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                      SEARCH
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab !== 'book' && (
                <div className="h-48 flex flex-col items-center justify-center text-gray-500">
                  <Info size={48} className="mb-4 text-gray-300" />
                  <p>This feature is simulated for the demo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6 pl-2 border-l-4 border-[#f5a623]">
          Featured Destinations
        </h3>
        
        {/* Updated Grid to 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <div key={idx} className="group bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-0 right-0 bg-[#f5a623] text-[#00266b] text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Fares from
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-bold text-[#00266b]">{dest.city}</h4>
                    <p className="text-sm text-gray-500">{dest.country}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Economy Return</span>
                  <span className="text-2xl font-bold text-gray-900">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#00266b]">
                <Briefcase size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Travel Requirements</h4>
              <p className="text-gray-600 text-sm">Check the latest travel advisories and entry requirements for your destination.</p>
              <a href="#" className="mt-4 text-[#00266b] font-medium text-sm hover:underline">Learn more</a>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#00266b]">
                <MapPin size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Where We Fly</h4>
              <p className="text-gray-600 text-sm">Explore our network of destinations and find your next adventure.</p>
              <a href="#" className="mt-4 text-[#00266b] font-medium text-sm hover:underline">View route map</a>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#00266b]">
                <Plane size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">The Singapore Airlines Experience</h4>
              <p className="text-gray-600 text-sm">Discover world-class service, cuisine, and comfort on board.</p>
              <a href="#" className="mt-4 text-[#00266b] font-medium text-sm hover:underline">Discover more</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Corporate</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Corporate Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Media & Resources</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">News Releases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Multimedia Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agent 360</a></li>
                <li><a href="#" className="hover:text-white transition-colors">KrisConnect</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Follow Us</h5>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                  <span className="font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                  <span className="font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center justify-center">
                  <span className="font-bold">in</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 Singapore Airlines. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}