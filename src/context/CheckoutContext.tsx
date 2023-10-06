import React, { ReactNode } from "react"
import { Car, CheckoutContextType, CheckoutEntry } from "../types"

const CheckoutContext = React.createContext<CheckoutContextType | undefined>(
  undefined
)

export { CheckoutContext }

interface CheckoutProviderProps {
  children: React.ReactNode
}

function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [checkoutList, setCheckoutList] = React.useState<CheckoutEntry[]>([])

  const addToCheckout = (
    car: Car,
    type: "Loan" | "Test Drive",
    name: string,
    carList: Car[],
    setCarList: React.Dispatch<React.SetStateAction<Car[]>>
  ) => {
    const newEntry: CheckoutEntry = {
      car,
      type,
      name,
      time: new Date().toLocaleString(),
    }

    const updatedCarList = carList.map((c) => {
      if (c.MakeId === car.MakeId) {
        return { ...c, status: "Checked Out" }
      }
      return c
    })
    setCarList(updatedCarList as Car[])
    setCheckoutList([...checkoutList, newEntry])
  }

  const returnCar = (returnedCar: Car, carList: Car[], setCarList: React.Dispatch<React.SetStateAction<Car[]>>) => {
    const updatedCarList = carList.map((c) => {
      if (c.MakeId === returnedCar.MakeId) {
        return { ...c, status: "Available" };
      }
      return c;
    });

    setCarList(updatedCarList as Car[]);

    const updatedCheckoutList = checkoutList.filter(
      (entry) => entry.car.MakeId !== returnedCar.MakeId
    );
    setCheckoutList(updatedCheckoutList);
  };

  return (
    <CheckoutContext.Provider value={{ checkoutList, addToCheckout, returnCar }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutProvider
