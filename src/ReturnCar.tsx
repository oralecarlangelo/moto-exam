import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { CarContext } from './context/CarContext'; // Adjust the import path accordingly
import { CheckoutContext } from './context/CheckoutContext';

function ReturnCar({ route, navigation }: any) {
  const { car } = route.params;
  const [returnTime, setReturnTime] = React.useState('');
  const [condition, setCondition] = React.useState('');

  const context = React.useContext(CarContext)
  const contextCheckout = React.useContext(CheckoutContext)
  const { addToReturnList, carList, setCarList } = context!;
  const { returnCar } = contextCheckout!;

  const handleSubmit = () => {
    addToReturnList(car, returnTime, condition);
    returnCar(car, carList, setCarList)
    navigation.navigate('Cars');
  };

  return (
    <View>
      <Text>Returning {car.MakeName}</Text>
      <TextInput 
        placeholder="Enter Return Time" 
        value={returnTime} 
        onChangeText={setReturnTime}
      />
      <TextInput 
        placeholder="Enter Condition" 
        value={condition} 
        onChangeText={setCondition}
      />
      <Button title="Submit Return" onPress={handleSubmit} />
    </View>
  );
}

export default ReturnCar;