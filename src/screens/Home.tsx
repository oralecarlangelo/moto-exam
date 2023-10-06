import React from "react";
import CarsList from "../components/Cars";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { CarContext } from "../context/CarContext";

export default function Home({ navigation }: any) {
  const context = React.useContext(CarContext);
  const { carList } = context!;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.columnBox}
          onPress={() => navigation.navigate("CheckoutList")}
        >
          <Text style={styles.boxText}>My Checkouts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.columnBox}
          onPress={() => navigation.navigate("ReturnList")}
        >
          <Text style={styles.boxText}>My Returns</Text>
        </TouchableOpacity>
      </View>
      <CarsList carList={carList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  columnBox: {
    width: "48%", 
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin:2, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxText: {
    textAlign: "center",
    fontSize: 18,
  },
});
