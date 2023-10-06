import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Car, ReturnedCar } from "../types";

interface CarContextType {
  carList: any[];
  setCarList: React.Dispatch<React.SetStateAction<any[]>>;
  returnedCars: ReturnedCar[];
  addToReturnList: (car: Car, returnTime: string, condition: string) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

interface CarProviderProps {
  children: ReactNode;
}

const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  const [carList, setCarList] = useState<any[]>([]);
  const [returnedCars, setReturnedCars] = React.useState<ReturnedCar[]>([]);

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const initialCars: Car[] = data.Results.map((car: any) => ({
        ...car,
        status: "Available",
      }));
      setCarList(initialCars);
    })
    .catch((error) => {
      console.log("err", error);
    });
  }, []);
  
  const addToReturnList = (car: Car, returnTime: string, condition: string) => {
    const returnedCar: ReturnedCar = {
      ...car,
      returnTime,
      condition
    };
    setReturnedCars(prevCars => [...prevCars, returnedCar]);
  };

  return (
    <CarContext.Provider value={{ carList, setCarList, returnedCars, addToReturnList }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarProvider };