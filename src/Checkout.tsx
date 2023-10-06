import React from "react"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Car } from "./types"
import { Button, View, TextInput } from "react-native"
import { CheckoutContext } from "./context/CheckoutContext"
import { CarContext } from "./context/CarContext"

function Checkout({ route, navigation }: any) {
  const { car, type } = route.params
  const context = React.useContext(CheckoutContext)
  const carContext = React.useContext(CarContext)
  const { carList, setCarList } = carContext!;
  if (!context) {
    throw new Error("CheckoutContext not provided")
  }
  const { addToCheckout } = context

  const [name, setName] = React.useState<string>("")

  const handleCheckout = () => {
    addToCheckout(car, type, name, carList, setCarList)
    navigation.navigate("Cars")
  }

  return (
    <View>
      {/* Show car details and type (Loan or Test Drive) */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Enter your name'
      />
      <Button title='Confirm Checkout' onPress={handleCheckout} />
    </View>
  )
}

export default Checkout
