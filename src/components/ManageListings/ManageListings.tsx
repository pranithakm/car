import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../types/car';
import { getCars, filterCars, deleteCar } from '../../shared/cars';
import './ManageListings.css';

interface Filters {
  category: string;
  make: string;
  model: string;
  style: string;
  minPrice: number;
  maxPrice: number;
}

const ManageListings: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    make: '',
    model: '',
    style: '',
    minPrice: 0,
    maxPrice: 1000000
  });

  useEffect(() => {
    const loadCars = () => {
      const allCars = getCars();
      setCars(allCars);
    };

    loadCars();
    window.addEventListener('storage', loadCars);

    return () => {
      window.removeEventListener('storage', loadCars);
    };
  }, []);

  const handleFilterChange = (name: keyof Filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(id);
      setCars(prev => prev.filter(car => car.id !== id));
    }
  };

  const handleAddCar = () => {
    navigate('/admin/add-car');
  };

  const filteredCars = filterCars(cars, filters);

  return (
    <div className="manage-listings">
      {/* Header with Add Car button */}
      <div className="listings-header">
        <h2>Manage Listings</h2>
        <button className="add-car-btn" onClick={handleAddCar}>
          Add New Car
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <h2>Filters</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Make</label>
            <input
              type="text"
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              placeholder="Enter make..."
            />
          </div>

          <div className="filter-group">
            <label>Model</label>
            <input
              type="text"
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              placeholder="Enter model..."
            />
          </div>

          <div className="filter-group">
            <label>Style</label>
            <select
              value={filters.style}
              onChange={(e) => handleFilterChange('style', e.target.value)}
            >
              <option value="">All Styles</option>
              <option value="luxury">Luxury</option>
              <option value="economy">Economy</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
              min="0"
            />
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="cars-grid">
        {filteredCars.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              {car.images && car.images[0] && (
                <img 
                  src={car.images[0]} 
                  alt={car.title} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-car.jpg'; // Add a placeholder image in your public folder
                  }}
                />
              )}
            </div>
            <div className="car-details">
              <h3>{car.title}</h3>
              <p className="price-range">
                Price Range: ${car.price?.min?.toLocaleString()} - ${car.price?.max?.toLocaleString()}
              </p>
              <div className="car-specs">
                {car.specs ? (
                  <>
                    <span>📅 {car.specs.year || 'N/A'}</span>
                    <span>🛣️ Milege : {car.specs.mileage || 'N/A'} km</span>
                    <span>⚙️ {car.specs.transmission || 'N/A'}</span>
                  </>
                ) : (
                  <span>Specifications not available</span>
                )}
              </div>
            </div>
            <div className="car-actions">
              <button className="view-btn">View Details</button>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(car.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="no-results">
          <p>No cars found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
