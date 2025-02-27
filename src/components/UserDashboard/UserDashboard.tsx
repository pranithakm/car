import React, { useEffect, useState } from 'react';
import { Car } from '../../types/car';
import { Link, useLocation } from 'react-router-dom';
import { getCars, filterCars } from '../../shared/cars';
import './UserDashboard.css';
import sedanImage from '../assets/sedan.png';
import camperImage from '../assets/camper.png';
import cabrioletImage from '../assets/cabriolet.png';
import pickupImage from '../assets/pickup.png';
import supercarImage from '../assets/supercar.png';
import minivanImage from '../assets/minivan.png';
import fuel from '../assets/fuel.png';
import gauge from '../assets/gauge.png';
import trans from '../assets/trans.png';
type CarCategory = {
  name: string;
  image: string;
};

type FeaturedCar = {
  id: string;
  name: string;
  year: number;
  price: number;
  image: string;
  mileage: string;
  transmission: string;
  fuelType: string;
};

const UserDashboard: React.FC = () => {
  const location = useLocation();
  const [cars, setCars] = useState<Car[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'used'>('all');
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minPrice: 0,
    maxPrice: 50000,
    body: '',
  });

  const carCategories: CarCategory[] = [
    { name: 'Sedan', image: sedanImage },
    { name: 'Campers', image: camperImage },
    { name: 'Cabriolet', image: cabrioletImage },
    { name: 'Pickup', image: pickupImage },
    { name: 'Supercar', image: supercarImage },
    { name: 'Minivans', image: minivanImage },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const loadCars = () => {
      const allCars = getCars();
      setCars(allCars.filter(car => car)); // Ensures only loaded cars are set
    };
  
    loadCars();
    window.addEventListener('storage', loadCars);
  
    return () => {
      window.removeEventListener('storage', loadCars);
    };
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredCars = filterCars(cars, filters);

  return (
    <><div className="user-layout">
      <nav className={`user-top-navbar ${isScrolled ? 'user-scrolled' : ''}`}>
        <div className="user-nav-brand">
          <Link to="/">
            <h1>Carspace</h1>
          </Link>
        </div>
        <div className="user-nav-links">
          <Link to="/" className={location.pathname === '/' ? 'user-active' : ''}>
            Home
          </Link>
          <Link to="/">
            About Us
          </Link>
          <Link to="/">
            Contact
          </Link>
        </div>
        <div className="user-nav-actions">
          <Link to="/login" className="user-auth-button">Login</Link>
        </div>
      </nav>
      <main className="user-main-content">
      </main>
      
    </div><div className="user-dashboard">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Find Quality-Assured Cars Tailored to Your Budget and Preferences</h1>
            <p>Browse a Wide Range of Certified Used Cars From Trusted Dealers and Private Sellers</p>
            <button className="book-now">Book My Car</button>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="reviews">Rating with 500+ Happy Members</span>
            </div>
          </div>

          <div className="search-card">
            <div className="search-filters">
            <div className="tab-buttons">
                    <button className="active">New cars</button>
                    <button>Used cars</button>
                </div>
              <input
                type="text"
                name="make"
                placeholder="Make"
                value={filters.make}
                onChange={handleFilterChange} />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={filters.model}
                onChange={handleFilterChange} />
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))} />
                <div className="price-labels">
                  <span>$0K</span>
                  <span>${Math.floor(filters.maxPrice / 1000)}K</span>
                </div>
              </div>
              <button className="find-cars">Find Cars</button>
            </div>
          </div>
        </div>

        <section className="explore-cars">
          <h2>Explore Our Cars</h2>
          <div className="category-grid">
            {carCategories.map((category, index) => (
              <div key={index} className="category-card">
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-listings">
          <div className="section-header">
            <h2>Feature listing</h2>
            <div className="listing-tabs">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab ${activeTab === 'new' ? 'active' : ''}`}
                onClick={() => setActiveTab('new')}
              >
                New cars
              </button>
              <button
                className={`tab ${activeTab === 'used' ? 'active' : ''}`}
                onClick={() => setActiveTab('used')}
              >
                Used cars
              </button>
            </div>
          </div>

          <div className="featured-grid">
            {cars.slice(0,3).map(car => (
              <div key={car.id} className="car-card">
                <img src={car.images[0]} alt={car.title} className="car-image" />
                <div className="car-details">
                  <h3>{car.title} {car.specs.year}</h3>
                  <div className="price">₹{car.price.min.toLocaleString()}</div>
                  <div className="specs">
                    <div className="spec">
                      <img src={fuel} alt="Fuel" /> 
                      <span>Fuel <br /><p>{car.specs.fuelType}</p></span>
                    </div>
                    <div className="spec">
                      <img src={gauge} alt="Mileage" />
                      <span>Mileage <br /><p>{car.specs.mileage}</p></span>
                    </div>
                    <div className="spec">
                      <img src={trans} alt="Transmission" />
                      <span>Transmission <br /><p>{car.specs.transmission}</p></span>
                    </div>
                  </div>
                  <button className="view-details">View details</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="inventory-section">
          <div className="inventory-card">
            <h3>Search Over 15000+ Used Vehicles</h3>
            <button className="view-inventory">View inventory</button>
          </div>
          <div className="inventory-card">
            <h3>Looking to sell your brand new car?</h3>
            <button className="view-inventory">View inventory</button>
          </div>
        </section>

        <section className="testimonials">
          <h2>Hear From Our Community</h2>
          <div className="testimonial-card">
            <div className="user-info">
              <img src="/images/avatar.jpg" alt="User" className="avatar" />
              <div className="user-details">
                <h4>Angela Moss</h4>
                <div className="rating">★★★★★</div>
              </div>
            </div>
            <p className="testimonial-text">
              "Had a phenomenal car buying experience! The team was knowledgeable and helped me find the perfect vehicle for my needs."
            </p>
          </div>
        </section>
        <footer className="user-footer">
        <div className="user-footer-content">
          <div className="user-footer-section">
            <h3>Carspace</h3>
            <p>Find your dream car with our extensive collection of quality vehicles.</p>
          </div>
          <div className="user-footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
    
            <Link to="/contact">Contact</Link>
          </div>
          <div className="user-footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@carspace.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Car Street, Auto City</p>
          </div>
          <div className="user-footer-section">
            <h4>Follow Us</h4>
            <div className="user-social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="user-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Carspace. All rights reserved.</p>
        </div>
      </footer>
      </div></>
  );
};

export default UserDashboard;
