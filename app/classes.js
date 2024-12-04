import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const classes = [
  { id: "1", name: "English (5th)", icon: "book-outline" },
  { id: "2", name: "Math (6th)", icon: "calculator-outline" },
  { id: "3", name: "English (6th)", icon: "book-outline" },
  { id: "4", name: "History (8th)", icon: "time-outline" },
];

const colors = ["#6B46C1", "#9F7AEA"]; // Alternating colors

export default function Classes() {
  const [infoVisible, setInfoVisible] = useState(false);
  const [addClassModalVisible, setAddClassModalVisible] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassGrade, setNewClassGrade] = useState("");
  const router = useRouter();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.classItem, { backgroundColor: colors[index % colors.length] }]}
      onPress={() =>
        router.push({
          pathname: "/class-details",
          params: { className: item.name }
        })
      }
    >
      <Ionicons name={item.icon} size={28} color="white" style={styles.classIcon} />
      <Text style={styles.classText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Classes</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => setInfoVisible(true)}>
            <Ionicons name="information-circle-outline" size={28} color="#6B46C1" />
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="robot-outline"
            size={32}
            color="#6B46C1"
            style={styles.robotIcon}
          />
        </View>
      </View>

      {/* Info Modal */}
      <Modal visible={infoVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How to Add a Class</Text>
            <Text style={styles.modalText}>
              To add a class, click on the "Add Class" button below!
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setInfoVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Class List */}
      <View style={styles.mainContent}>
        <FlatList
          data={classes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

        {/* Add Classes Button */}
        <View style={styles.addClassButtonContainer}>
          <TouchableOpacity 
            style={styles.addClassButton} 
            onPress={() => setAddClassModalVisible(true)}
          >
            <Text style={styles.addClassButtonText}>Add Classes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Class Modal */}
      <Modal
        visible={addClassModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Class</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Class Name</Text>
              <TextInput
                style={styles.input}
                value={newClassName}
                onChangeText={setNewClassName}
                placeholder="Enter class name"
                placeholderTextColor="#A0AEC0"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Grade Level</Text>
              <TextInput
                style={styles.input}
                value={newClassGrade}
                onChangeText={setNewClassGrade}
                placeholder="Enter grade level"
                placeholderTextColor="#A0AEC0"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setAddClassModalVisible(false);
                  setNewClassName("");
                  setNewClassGrade("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.addButton]}
                onPress={() => {
                  // Here we would normally save the class
                  setAddClassModalVisible(false);
                  setNewClassName("");
                  setNewClassGrade("");
                }}
              >
                <Text style={styles.addButtonText}>Add Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Settings pressed")}
        >
          <Ionicons name="settings-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/classes")}
        >
          <Ionicons name="home-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Profile pressed")}
        >
          <Ionicons name="person-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  // Header styling
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  robotIcon: {
    marginLeft: 10,
  },

  // Modal styling
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2D3748",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#4A5568",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Class list styling
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  classItem: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  classIcon: {
    marginRight: 12,
  },
  classText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  // Add Classes Button styling
  addClassButtonContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  addClassButton: {
    backgroundColor: "#6B46C1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  addClassButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  // Add Class Modal styling
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2D3748",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: "#EDF2F7",
  },
  addButton: {
    backgroundColor: "#6B46C1",
  },
  cancelButtonText: {
    color: "#4A5568",
    fontSize: 16,
    fontWeight: "600",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Bottom menu styling
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: "#F7FAFC",
    position: "absolute",
    bottom: 0,
    width: width,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "#6B46C1",
    fontSize: 14,
  },
});
