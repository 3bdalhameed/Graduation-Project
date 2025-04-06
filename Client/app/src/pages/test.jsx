import { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import ScrollReveal from 'scrollreveal';

export default function MarketingWebsite() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true,
      interval: 200,
    });
  }, []);

  const navItems = ["home", "services", "about", "testimonials", "contact"];

  return (
    <div className="font-[Poppins] text-[#0e2431] bg-white">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold text-[#d9de22]">
            <img src="/alsarw-logo.png" alt="ALSARW Logo" className="w-8 h-8" />
            ALSARW
          </a>
          <div className="md:hidden text-2xl text-[#d9de22]" onClick={() => setNavOpen(!navOpen)}>
            <HiMenu />
          </div>
          <ul className={`md:flex gap-8 ${navOpen ? 'block absolute top-full right-0 bg-[#0e2431] text-white w-4/5 p-6' : 'hidden md:block'}`}>
            {navItems.map(item => (
              <li key={item} className="mb-4 md:mb-0">
                <a
                  href={`#${item}`}
                  className={`capitalize hover:text-[#c3d600] ${activeLink === item ? 'text-[#d9de22]' : ''}`}
                  onClick={() => {
                    setActiveLink(item);
                    setNavOpen(false);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 text-center reveal">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#0e2431]">Empower Your E-Commerce<br /><span className="text-[#4070f4]">with ALSARW</span></h1>
          <p className="mb-6 max-w-2xl text-[#0e2431]">Specialized digital services to boost your online store's visibility, conversions, and customer loyalty through data-driven marketing and automation tools.</p>
          <a href="#contact" className="bg-[#4070f4] text-white px-6 py-3 rounded-md font-semibold hover:shadow-lg">Let's Talk</a>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-[#f9f9f9] px-6 md:px-20 text-center reveal">
          <h2 className="text-3xl font-bold text-[#4070f4] mb-10">Our E-Commerce Services</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Store Optimization", desc: "Improve UX/UI, site speed, and checkout conversion rates." },
              { title: "Marketing Automation", desc: "Automate email, SMS, and push campaigns to maximize sales." },
              { title: "Product SEO", desc: "Ensure your products rank higher on search and marketplaces." },
              { title: "Analytics & Tracking", desc: "Real-time dashboards and insights to guide smart decisions." },
              { title: "Social Commerce", desc: "Sell directly through Instagram, Facebook, and more." },
              { title: "Custom Integrations", desc: "Connect third-party tools with your store seamlessly." }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-[#0e2431]">{service.title}</h3>
                <p className="text-[#0e2431]">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 md:px-20 bg-white text-center md:text-left reveal">
          <h2 className="text-3xl font-bold text-[#4070f4] text-center mb-10">Why ALSARW?</h2>
          <div className="grid md:grid-cols-2 items-center gap-10">
            <img src="https://i.postimg.cc/NjdgX2sq/about.jpg" alt="About" className="w-64 rounded-lg mx-auto md:mx-0" />
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#0e2431]">Experts in E-Commerce Growth</h3>
              <p className="text-[#0e2431]">We specialize in scaling online shops through a strategic blend of design, automation, and performance marketing. ALSARW is your dedicated growth partner in the digital world.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-[#f9f9f9] px-6 md:px-20 text-center reveal">
          <h2 className="text-3xl font-bold text-[#4070f4] mb-10">Client Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { name: "Layla M.", feedback: "ALSARW helped us double our Shopify revenue within two quarters." },
              { name: "Omar K.", feedback: "Their automation tools changed the way we manage marketing." }
            ].map((testimony, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="italic mb-4 text-[#0e2431]">"{testimony.feedback}"</p>
                <h4 className="font-semibold text-[#0e2431]">- {testimony.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 md:px-20 bg-white text-center reveal">
          <h2 className="text-3xl font-bold text-[#4070f4] mb-10">Get in Touch</h2>
          <form className="max-w-xl mx-auto space-y-6">
            <input type="text" placeholder="Name" className="w-full p-4 border border-gray-300 rounded-md outline-none" />
            <input type="email" placeholder="Email" className="w-full p-4 border border-gray-300 rounded-md outline-none" />
            <textarea rows="5" placeholder="How can we help your business?" className="w-full p-4 border border-gray-300 rounded-md outline-none"></textarea>
            <button type="submit" className="bg-[#4070f4] text-white px-6 py-3 rounded-md font-semibold hover:shadow-lg">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="bg-[#0e2431] text-white text-center py-10">
        <h3 className="text-2xl font-bold mb-4">ALSARW</h3>
        <div className="flex justify-center gap-6 text-xl mb-6">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        <p>&copy; 2024 ALSARW. All rights reserved.</p>
      </footer>
    </div>
  );
}