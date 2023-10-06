import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native"
import { Car } from "./types"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

interface IProps {
  carList: Car[]
}

type RootStackParamList = {
  Checkout: { car: Car; type: "Loan" | "Test Drive" }
}

const CarsList: React.FC<IProps> = ({ carList }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCar, setSelectedCar] = React.useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(carList.length / itemsPerPage)

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Checkout">>()

  const handlePrevious = () => {
    setCurrentPage(Math.max(1, currentPage - 1))
  }

  const handleNext = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1))
  }

  const currentItems = carList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const showModal = (item: any) => {
    setSelectedCar(item)
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  const handleLoan = (item: any) => {
    navigation.navigate("Checkout", { car: item, type: "Loan" })
    hideModal()
  }

  const handleTestDrive = (item: any) => {
    navigation.navigate("Checkout", { car: item, type: "Test Drive" })
    hideModal()
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.gridContainer}>
        {currentItems.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <TouchableOpacity
              onPress={() => showModal(item)}
              disabled={item.status === "Checked Out"}
            >
              <View
                style={item.status === "Checked Out" ? styles.checkedOut : null}
              >
                <Text>{item.MakeId}</Text>
                <Text>{item.MakeName}</Text>
                <Text>{item.VehicleTypeId}</Text>
                <Text>{item.VehicleTypeName}</Text>
                <Text
                  style={
                    item.status === "Available"
                      ? styles.statusText
                      : styles.checkedOut
                  }
                >
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevious} disabled={currentPage === 1}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentPage === totalPages}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={hideModal}
          activeOpacity={1}
        >
          <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text>Select an option:</Text>
            <Button title='Loan' onPress={() => handleLoan(selectedCar)} />
            <Button title='Test Drive' onPress={() => handleTestDrive(selectedCar)} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default CarsList

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  checkedOut: {
    opacity: 0.5,
    color: "red",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pageInfo: {
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
})
