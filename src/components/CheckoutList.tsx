import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { CheckoutContext } from "../context/CheckoutContext";

function CheckoutList({ navigation }: any) {
  const context = React.useContext(CheckoutContext);
  const { checkoutList } = context!;

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.carName}>{item.car.MakeName}</Text>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Button
        title="Return Car"
        onPress={() => navigation.navigate("ReturnCar", { car: item.car })}
      />
    </View>
  );

  if (checkoutList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No checkouts available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={checkoutList}
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
  userName: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  type: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  time: {
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

export default CheckoutList;
