import React from "react";
import { useFormik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { CarContext } from "../context/CarContext"; // Adjust the import path accordingly
import { CheckoutContext } from "../context/CheckoutContext";

const validationSchema = Yup.object().shape({
  returnTime: Yup.string().required("Return time is required"),
  condition: Yup.string().required("Condition is required"),
});

function ReturnCar({ route, navigation }: any) {
  const [isDatePickerVisible, setDatePickerVisibility] =
    React.useState<boolean>(false);
  const { car } = route.params;
  const context = React.useContext(CarContext);
  const contextCheckout = React.useContext(CheckoutContext);
  const { addToReturnList, carList, setCarList } = context!;
  const { returnCar } = contextCheckout!;

  const formik = useFormik({
    initialValues: {
      returnTime: "",
      condition: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addToReturnList(car, values.returnTime, values.condition);
      returnCar(car, carList, setCarList);
      navigation.navigate("Cars");
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // When the user selects a date/time, update the formik values and hide the picker
    formik.setFieldValue("returnTime", date.toString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Returning {car.MakeName}</Text>
      <TextInput
        placeholder="Select Return Time"
        value={
          formik.values.returnTime ? formik.values.returnTime.toString() : ""
        }
        style={styles.input}
        editable={false}
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime" // You can change the mode to "date" or "time" as needed
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {formik.touched.returnTime && formik.errors.returnTime ? (
        <Text style={styles.error}>{formik.errors.returnTime}</Text>
      ) : null}
      <TextInput
        placeholder="Enter Condition"
        value={formik.values.condition}
        onChangeText={formik.handleChange("condition")}
        style={styles.input}
      />
      {formik.touched.condition && formik.errors.condition ? (
        <Text style={styles.error}>{formik.errors.condition}</Text>
      ) : null}
      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit Return</Text>
      </TouchableOpacity>
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
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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

export default ReturnCar;
