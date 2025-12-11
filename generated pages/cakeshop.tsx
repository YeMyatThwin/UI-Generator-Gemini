import React, { useState, useEffect } from 'react';
import { 
  Cake, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart,
  CheckCircle
} from 'lucide-react';

export default function CakeShop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['All', 'Signature Cakes', 'Cupcakes', 'Wedding', 'Pastries'];

  const products = [
    {
      id: 1,
      name: 'Velvet Berry Dream',
      category: 'Signature Cakes',
      price: 45.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Rich red velvet layers with fresh berries and cream cheese frosting.'
    },
    {
      id: 2,
      name: 'Midnight Chocolate',
      category: 'Signature Cakes',
      price: 42.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dark chocolate ganache with truffle filling and gold leaf accents.'
    },
    {
      id: 3,
      name: 'Vanilla Bean Swirl',
      category: 'Cupcakes',
      price: 4.50,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Classic Madagascar vanilla bean sponge with buttercream swirl.'
    },
    {
      id: 4,
      name: 'Lemon Meringue Tart',
      category: 'Pastries',
      price: 6.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Zesty lemon curd topped with toasted italian meringue.'
    },
    {
      id: 5,
      name: 'Rustic Wedding Tier',
      category: 'Wedding',
      price: 150.00,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Semi-naked three-tier cake with fresh floral arrangements.'
    },
    {
      id: 6,
      name: 'Strawberry Bliss',
      category: 'Signature Cakes',
      price: 38.00,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Light sponge cake layered with fresh strawberry compote.'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowOrderModal(false);
      setCart([]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-rose-500 p-2 rounded-full text-white">
                <Cake size={24} />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">SweetCrumb</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-stone-600 hover:text-rose-500 font-medium transition">Home</a>
              <a href="#menu" className="text-stone-600 hover:text-rose-500 font-medium transition">Menu</a>
              <a href="#about" className="text-stone-600 hover:text-rose-500 font-medium transition">About</a>
              <a href="#contact" className="text-stone-600 hover:text-rose-500 font-medium transition">Contact</a>
              <button 
                onClick={() => setShowOrderModal(true)}
                className="relative p-2 text-stone-600 hover:text-rose-500 transition"
              >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-600 hover:text-stone-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-rose-50 hover:text-rose-500 rounded-md">Home</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-rose-50 hover:text-rose-500 rounded-md">Menu</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-rose-50 hover:text-rose-500 rounded-md">About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-rose-50 hover:text-rose-500 rounded-md">Contact</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowOrderModal(true);
                }}
                className="w-full mt-4 bg-rose-500 text-white px-4 py-2 rounded-md font-medium hover:bg-rose-600 transition"
              >
                View Cart ({cart.length})
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 pb-24 lg:pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold">
                <Star size={14} fill="currentColor" /> Voted Best Bakery 2024
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-stone-900 leading-tight">
                Baking Life <span className="text-rose-500">Sweeter</span> One Slice at a Time.
              </h1>
              <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
                Artisanal cakes, handcrafted pastries, and custom designs made with love and the finest organic ingredients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#menu" className="inline-flex justify-center items-center px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Order Now
                </a>
                <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-medium hover:border-stone-900 hover:text-stone-900 transition">
                  Custom Request
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4 text-stone-500 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-rose-500" /> Fresh Daily
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-rose-500" /> Handmade
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-rose-200 rounded-full filter blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1563729768-7491131ba718?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Delicious Cake" 
                className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px] lg:h-[600px] transform hover:scale-[1.02] transition duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-bold text-stone-900">5.0 Rating</span>
                </div>
                <p className="text-sm text-stone-600 italic">"The most delicious wedding cake we've ever tasted!"</p>
                <p className="text-xs text-stone-400 mt-2">- Sarah & Mike</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Our Sweet Selection</h2>
            <p className="text-stone-600">Explore our daily fresh menu. From classic favorites to seasonal specialties.</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-rose-500 text-white shadow-md' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-stone-800 shadow-sm">
                    <Star size={12} className="text-yellow-400" fill="currentColor" /> {product.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
                    <span className="text-lg font-serif text-rose-600 font-bold">${product.price}</span>
                  </div>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-stone-50 text-stone-900 font-medium rounded-xl hover:bg-stone-900 hover:text-white transition flex items-center justify-center gap-2 group-hover:bg-rose-500 group-hover:text-white"
                  >
                    <ShoppingBag size={18} /> Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Info */}
      <section id="about" className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                <Cake size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Custom Designs</h3>
              <p className="text-stone-600">Bring us your vision, and we'll bake it into reality. Perfect for weddings and birthdays.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Local Delivery</h3>
              <p className="text-stone-600">We deliver fresh to your doorstep within the city limits. Free delivery on orders over $100.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Organic Ingredients</h3>
              <p className="text-stone-600">We use only the finest organic flours, free-range eggs, and real butter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Order Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Get in Touch</h2>
              <p className="text-stone-600 mb-8 text-lg">
                Have a special request? Planning a big event? Or just want to say hi? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 p-3 rounded-lg text-stone-900">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Visit Us</h4>
                    <p className="text-stone-600">123 Baker Street, Sweet City, SC 29000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 p-3 rounded-lg text-stone-900">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Call Us</h4>
                    <p className="text-stone-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 p-3 rounded-lg text-stone-900">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Opening Hours</h4>
                    <p className="text-stone-600">Mon-Sat: 8am - 8pm</p>
                    <p className="text-stone-600">Sun: 9am - 5pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-rose-500 hover:text-white transition"><Instagram size={20} /></a>
                <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-rose-500 hover:text-white transition"><Facebook size={20} /></a>
                <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-rose-500 hover:text-white transition"><Twitter size={20} /></a>
              </div>
            </div>

            <div className="bg-stone-50 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none bg-white">
                    <option>General Inquiry</option>
                    <option>Wedding Cake Consultation</option>
                    <option>Custom Order</option>
                    <option>Catering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none" placeholder="Tell us about your sweet needs..."></textarea>
                </div>
                <button className="w-full py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 border-b border-stone-800 pb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Cake size={24} />
                <span className="text-2xl font-serif font-bold">SweetCrumb</span>
              </div>
              <p className="max-w-sm">Crafting memories through sweetness since 2010. We believe every day deserves a little slice of happiness.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition">Menu</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 SweetCrumb Bakery. All rights reserved.</p>
            <p className="flex items-center gap-1 mt-2 md:mt-0">Made with <Heart size={12} className="text-rose-500" fill="currentColor" /> by DesignTeam</p>
          </div>
        </div>
      </footer>

      {/* Order Modal / Cart */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <ShoppingBag size={20} /> Your Order
              </h3>
              <button onClick={() => setShowOrderModal(false)} className="text-stone-400 hover:text-stone-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {orderSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-stone-900 mb-2">Order Received!</h4>
                  <p className="text-stone-600">We'll contact you shortly to confirm details.</p>
                </div>
              ) : (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-stone-500">
                      <p>Your cart is empty. Add some sweets!</p>
                      <button 
                        onClick={() => setShowOrderModal(false)}
                        className="mt-4 text-rose-500 font-medium hover:underline"
                      >
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-stone-900">{item.name}</h4>
                            <p className="text-sm text-stone-500">{item.category}</p>
                          </div>
                          <span className="font-bold text-rose-600">${item.price}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-stone-100 pt-4 mt-6">
                        <div className="flex justify-between items-center text-lg font-bold text-stone-900">
                          <span>Total</span>
                          <span>${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
                        </div>
                      </div>

                      <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4">
                        <h4 className="font-bold text-stone-900">Contact Details</h4>
                        <input required type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none" />
                        <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none" />
                        <button type="submit" className="w-full py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition">
                          Place Order
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}