export interface Car {
  id: string;
  title: string;
  price: {
    min: number;
    max: number;
  };
  images: string[];
  category: string;
  specs: {
    stockNumber: string;
    vin: string;
    year: number;
    mileage: string;
    transmission: string;
    engineSize: string;
    engineType: string;
    cylinders: number;
    fuelType: string;
    doors: number;
    color: string;
    style: string;
    mpg: number;
    highwayMPG: number;
  };
  features: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
}
