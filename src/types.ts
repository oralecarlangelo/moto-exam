export interface Car {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
  status: "Available" | "Checked Out"
}

export type ReturnedCar = Car & {
  returnTime: string
  condition: string
}

export interface CheckoutEntry {
  car: Car
  type: "Loan" | "Test Drive"
  name: string
  time: string
}

export interface CheckoutContextType {
  checkoutList: CheckoutEntry[]
  addToCheckout: (
    car: Car,
    type: "Loan" | "Test Drive",
    name: string,
    carList: Car[],
    setCarList: React.Dispatch<React.SetStateAction<Car[]>>
  ) => void
  returnCar: (
    returnedCar: Car,
    carList: Car[],
    setCarList: React.Dispatch<React.SetStateAction<Car[]>>
  ) => void
}
