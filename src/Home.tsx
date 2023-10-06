import React from "react"
import CarsList from "./Cars"
import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { CarContext } from "./context/CarContext"

export default function Home({navigation}: any) {
  const context = React.useContext(CarContext);
  const { carList } = context!;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("CheckoutList")}>
        <Text>My Checkouts</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ReturnList")}>
        <Text>My Returns</Text>
      </TouchableOpacity>
      <CarsList carList={carList} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
