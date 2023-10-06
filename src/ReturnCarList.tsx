import React, { useContext } from "react"
import { View, Text, FlatList } from "react-native"
import { CarContext } from "./context/CarContext"

export default function ReturnListScreen() {
  const context = React.useContext(CarContext)
  const { returnedCars } = context!

  const renderItem = ({ item }: any) => (
    <View style={{ flex: 0.5, padding: 10 }}>
      <Text>{item.MakeName}</Text>
      <Text>Return Time: {item.returnTime}</Text>
      <Text>Condition: {item.condition}</Text>
    </View>
  )

  return (
    <FlatList
      data={returnedCars}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  )
}
