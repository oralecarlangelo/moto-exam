import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeComponent from "./src/Home"
import CheckoutProvider from "./src/context/CheckoutContext"
import CheckoutScreen from "./src/Checkout"
import CheckoutListScreen from "./src/CheckoutList"
import { CarProvider } from "./src/context/CarContext"
import ReturnCarScreen from "./src/ReturnCar"
import ReturnCarListScreen from "./src/ReturnCarList"

const Stack = createStackNavigator()

export default function App() {
  return (
    <CarProvider>
      <CheckoutProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Cars' component={HomeComponent} />
            <Stack.Screen name='Checkout' component={CheckoutScreen} />
            <Stack.Screen name='CheckoutList' component={CheckoutListScreen} />
            <Stack.Screen name='ReturnCar' component={ReturnCarScreen} />
            <Stack.Screen name='ReturnList' component={ReturnCarListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CheckoutProvider>
    </CarProvider>
  )
}
