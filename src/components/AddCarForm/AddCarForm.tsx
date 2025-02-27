import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../../shared/cars';
import './AddCarForm.css';

interface FormData {
  title: string;
  ownerName: string;
  price: {
    min: number;
    max: number;
  };
  year: number;
  engineSize: string;
  engineType: string;
  mileage: string;
  driverType: string;
  cylinders: string;
  seats: string;
  fuelType: string;
  doors: string;
  color: string;
  description: string;
  cityMPG: number;
  highwayMPG: number;
  address: string;
  addressLink: string;
  images: string[];
  video: string;
  features: string[];
}

const AddCarForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const engineTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const driverTypes = ['Manual', 'Automatic', 'Semi-Automatic'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'CNG', 'LPG'];

  const [formData, setFormData] = useState<FormData>({
    title: '',
    ownerName: '',
    price: {
      min: 0,
      max: 0
    },
    year: new Date().getFullYear(),
    engineSize: '',
    engineType: '',
    mileage: '',
    driverType: '',
    cylinders: '',
    seats: '',
    fuelType: '',
    doors: '',
    color: '',
    description: '',
    cityMPG: 0,
    highwayMPG: 0,
    address: '',
    addressLink: '',
    images: [],
    video: '',
    features: []
  });

  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const availableFeatures = [
    'A/C Front',
    'CCTV',
    'Leather',
    'Navigation system',
    'Rain sensing wipe',
    'Sun roof',
    'Central locking',
    'Sports package',
    'Front fog light',
    'Rear Spoilers',
    'Power steering'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = new Set(selectedFeatures);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setSelectedFeatures(newFeatures);
    setFormData(prev => ({
      ...prev,
      features: Array.from(newFeatures)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      const imageUrls = await Promise.all(imagePromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newCar = {
        title: formData.title,
        price: {
          min: parseInt(formData.price.min.toString()),
          max: parseInt(formData.price.max.toString())
        },
        images: formData.images.map(img => {
          // Convert object URLs to data URLs if they are blob URLs
          if (img.startsWith('blob:')) {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            const canvas = document.createElement('canvas');
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(imgElement, 0, 0);
              return canvas.toDataURL('image/jpeg');
            }
          }
          return img;
        }),
        category: 'sedan',
        specs: {
          stockNumber: Math.random().toString(36).substring(7),
          vin: Math.random().toString(36).substring(7),
          year: parseInt(formData.year.toString()),
          mileage: formData.mileage,
          transmission: formData.driverType,
          engineSize: formData.engineSize,
          engineType: formData.engineType,
          cylinders: parseInt(formData.cylinders) || 0,
          fuelType: formData.fuelType,
          doors: parseInt(formData.doors) || 0,
          color: formData.color,
          style: 'standard',
          mpg: parseInt(formData.cityMPG.toString()),
          highwayMPG: parseInt(formData.highwayMPG.toString())
        },
        features: formData.features,
        location: {
          address: formData.address,
          city: '',
          state: '',
          zipCode: '',
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        description: formData.description
      };

      addCar(newCar);
      setSuccessMessage('Car added successfully! Redirecting...');
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/admin/manage-listings');
      }, 1500);
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      ownerName: '',
      price: {
        min: 0,
        max: 0
      },
      year: new Date().getFullYear(),
      engineSize: '',
      engineType: '',
      mileage: '',
      driverType: '',
      cylinders: '',
      seats: '',
      fuelType: '',
      doors: '',
      color: '',
      description: '',
      cityMPG: 0,
      highwayMPG: 0,
      address: '',
      addressLink: '',
      images: [],
      video: '',
      features: []
    });
    setSelectedFeatures(new Set());
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <div className="form-grid">
        <div className="form-group">
          <label>Car Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter car name"
            required
          />
        </div>

        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            placeholder="Enter owner name"
            required
          />
        </div>

        <div className="form-group">
          <label>Price Range (Min)</label>
          <input
            type="number"
            name="price.min"
            value={formData.price.min}
            onChange={handleInputChange}
            placeholder="Enter minimum price"
            required
          />
        </div>

        <div className="form-group">
          <label>Price Range (Max)</label>
          <input
            type="number"
            name="price.max"
            value={formData.price.max}
            onChange={handleInputChange}
            placeholder="Enter maximum price"
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Engine Size</label>
          <input
            type="text"
            name="engineSize"
            value={formData.engineSize}
            onChange={handleInputChange}
            placeholder="e.g., 2.0L"
            required
          />
        </div>

        <div className="form-group">
          <label>Engine Type</label>
          <select
            name="engineType"
            value={formData.engineType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Engine Type</option>
            {engineTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Mileage (km)</label>
          <div className="input-with-unit">
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              placeholder="e.g., 50000"
              min="0"
              required
            />
            <span className="unit">km</span>
          </div>
        </div>

        <div className="form-group">
          <label>Driver Type</label>
          <select
            name="driverType"
            value={formData.driverType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Driver Type</option>
            {driverTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cylinders</label>
          <input
            type="number"
            name="cylinders"
            value={formData.cylinders}
            onChange={handleInputChange}
            placeholder="e.g., 4"
            required
          />
        </div>

        <div className="form-group">
          <label>Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            required
          />
        </div>

        <div className="form-group">
          <label>Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Doors</label>
          <input
            type="number"
            name="doors"
            value={formData.doors}
            onChange={handleInputChange}
            placeholder="e.g., 4"
            required
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="e.g., Black"
            required
          />
        </div>

        <div className="form-group">
          <label>City MPG</label>
          <input
            type="number"
            name="cityMPG"
            value={formData.cityMPG}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Highway MPG</label>
          <input
            type="number"
            name="highwayMPG"
            value={formData.highwayMPG}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter car description"
          required
        />
      </div>

      <div className="form-group full-width">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter address"
          required
        />
      </div>

      <div className="form-group full-width">
        <label>Address Link (Google Maps)</label>
        <input
          type="text"
          name="addressLink"
          value={formData.addressLink}
          onChange={handleInputChange}
          placeholder="Enter Google Maps link"
        />
      </div>

      <div className="form-group full-width">
        <label>Images</label>
        <div className="image-upload-container">
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="file-input"
            />
            <div className="upload-placeholder">
              Drop files here or click to upload
            </div>
          </div>
          <div className="url-input-area">
            <input
              type="text"
              placeholder="Or enter image URL"
              className="image-url-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value) {
                    setFormData(prev => ({
                      ...prev,
                      images: [...prev.images, input.value]
                    }));
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>
        {formData.images.length > 0 && (
          <div className="image-preview-grid">
            {formData.images.map((img, index) => (
              <div key={index} className="image-preview-item">
                <img src={img} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group full-width">
        <label>Video (mp4)</label>
        <input
          type="text"
          name="video"
          value={formData.video}
          onChange={handleInputChange}
          placeholder="Enter video URL"
        />
      </div>

      <div className="form-group full-width">
        <label>Features</label>
        <div className="features-grid">
          {availableFeatures.map(feature => (
            <label key={feature} className="feature-checkbox">
              <input
                type="checkbox"
                checked={selectedFeatures.has(feature)}
                onChange={() => handleFeatureToggle(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Submit'}
        </button>
        <button 
          type="button" 
          className="clear-btn" 
          onClick={handleClear}
          disabled={isSubmitting}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;
