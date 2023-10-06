import React from "react";

import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { CheckoutContext } from "../context/CheckoutContext";
import { CarContext } from "../context/CarContext";
import { Formik } from "formik";
import * as Yup from "yup"; // Import Yup

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

function Checkout({ route, navigation }: any) {
  const { car, type } = route.params;
  const context = React.useContext(CheckoutContext);
  const carContext = React.useContext(CarContext);
  const { carList, setCarList } = carContext!;
  if (!context) {
    throw new Error("CheckoutContext not provided");
  }
  const { addToCheckout } = context;

  const [name, setName] = React.useState<string>("");

  const handleCheckout = () => {
    addToCheckout(car, type, name, carList, setCarList);
    navigation.navigate("Cars");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema} // Pass the validation schema
        onSubmit={(values) => {
          addToCheckout(car, type, values.name, carList, setCarList);
          navigation.navigate("Cars");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              placeholder="Enter your name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={styles.input}
            />
            {errors.name ? (
              <Text style={styles.error}>{errors.name}</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Submit Return</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue", 
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white", 
    fontWeight: "bold",
  },
});

export default Checkout;
