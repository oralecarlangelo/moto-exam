import React from "react"
import { View, Text, Button, FlatList } from "react-native"
import { CheckoutContext } from "./context/CheckoutContext"

function CheckoutList({ navigation }: any) {
  const context = React.useContext(CheckoutContext)
  const { checkoutList } = context!

  const renderItem = ({ item }: any) => (
    <View style={{ flex: 0.5, padding: 10 }}>
      <Text>{item.name}</Text>
      <Text>{item.car.MakeName}</Text>
      <Text>{item.type}</Text>
      <Text>{item.time}</Text>
      <Button
        title='Return Car'
        onPress={() => navigation.navigate("ReturnCar", { car: item.car })}
      />
    </View>
  )

  return (
    <FlatList
      data={checkoutList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  )
}

export default CheckoutList
