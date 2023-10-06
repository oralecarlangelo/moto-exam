import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { CarContext } from "../context/CarContext";

export default function ReturnListScreen() {
  const context = React.useContext(CarContext);
  const { returnedCars } = context!;

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.carName}>{item.MakeName}</Text>
      <Text style={styles.returnTime}>Return Time: {item.returnTime}</Text>
      <Text style={styles.condition}>Condition: {item.condition}</Text>
    </View>
  );

  if (returnedCars.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No cars have been returned</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={returnedCars}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    flex: 0.5,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  returnTime: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  condition: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});
