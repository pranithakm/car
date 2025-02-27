import { Car } from '../types/car';

// Function to get all cars from storage
export const getCars = (): Car[] => {
  const storedCars = localStorage.getItem('cars');
  return storedCars ? JSON.parse(storedCars) : [];
};

// Function to add a new car
export const addCar = (car: Omit<Car, 'id'>): Car => {
  const newCar: Car = {
    ...car,
    id: Math.random().toString(36).substring(2, 11)
  };
  
  const cars = getCars();
  const updatedCars = [...cars, newCar];
  localStorage.setItem('cars', JSON.stringify(updatedCars));
  
  // Dispatch a storage event to notify other windows
  window.dispatchEvent(new Event('storage'));
  
  return newCar;
};

// Function to update a car
export const updateCar = (id: string, updatedCar: Partial<Car>): Car | null => {
  const cars = getCars();
  const index = cars.findIndex(car => car.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedCarData = {
    ...cars[index],
    ...updatedCar
  };
  
  cars[index] = updatedCarData;
  localStorage.setItem('cars', JSON.stringify(cars));
  
  // Dispatch a storage event to notify other windows
  window.dispatchEvent(new Event('storage'));
  
  return updatedCarData;
};

// Function to delete a car
export const deleteCar = (id: string): boolean => {
  const cars = getCars();
  const filteredCars = cars.filter(car => car.id !== id);
  
  if (filteredCars.length === cars.length) {
    return false;
  }
  
  localStorage.setItem('cars', JSON.stringify(filteredCars));
  
  // Dispatch a storage event to notify other windows
  window.dispatchEvent(new Event('storage'));
  
  return true;
};

// Function to filter cars
export const filterCars = (cars: Car[], filters: {
  category?: string;
  make?: string;
  model?: string;
  style?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  color?: string;
  transmission?: string;
  fuelType?: string;
}) => {
  return cars.filter(car => {
    if (filters.category && filters.category !== 'all' && car.category !== filters.category) {
      return false;
    }
    
    if (filters.style && car.specs.style !== filters.style) {
      return false;
    }
    
    if (filters.minPrice && car.price.min < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && car.price.max > filters.maxPrice) {
      return false;
    }
    
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every(feature => 
        car.features.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }
    
    if (filters.color && car.specs.color !== filters.color) {
      return false;
    }
    
    if (filters.transmission && car.specs.transmission !== filters.transmission) {
      return false;
    }
    
    if (filters.fuelType && car.specs.fuelType !== filters.fuelType) {
      return false;
    }
    
    return true;
  });
};
