import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const studentData = {
  "1": {
    progress: [20, 40, 60, 80, 100],
    categories: [
      { title: "Reading Comp.", details: "A+, stellar student" },
      { title: "Grammar", details: "Super good at grammar" },
      {
        title: "Writing Mechanics",
        details: "Mechanics and formatting could be improved",
      },
      { title: "Vocabulary", details: "Great vocabulary use" },
      {
        title: "Critical Thinking",
        details: "Good critical thinking and problem solving",
      },
      {
        title: "Writing Composition",
        details: "Essay writing improvement details...",
      },
    ],
  },
  // Additional students can go here...
};

export default function Progress() {
  const router = useRouter();
  const { studentId, studentName } = useLocalSearchParams();
  const student = studentData[studentId] || {};
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [feedback, setFeedback] = useState("");

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openFeedbackModal = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCategory("");
    setFeedback("");
    setModalVisible(false);
  };

  const renderCategoryItem = ({ item, index }) => (
    <View>
      <Pressable
        style={styles.categoryItem}
        onPress={() => toggleDetails(index)}
      >
        <Text style={styles.categoryText}>{item.title}</Text>
      </Pressable>
      {expandedIndex === index && (
        <View style={styles.details}>
          <Text style={styles.detailsText}>{item.details}</Text>
          <Pressable
            style={styles.feedbackButton}
            onPress={() => openFeedbackModal(item.title)}
          >
            <Text style={styles.feedbackButtonText}>Generate Feedback</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#6B46C1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{studentName || "Unknown Student"}</Text>
      </View>

      {/* Progress Chart */}
      <Text style={styles.sectionTitle}>Overall Progress</Text>
      <BarChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [{ 
            data: student.progress || [0, 0, 0, 0, 0],
            color: (opacity = 1) => `#6B46C1`
          }],
        }}
        width={width - 40}
        height={180}
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `#6B46C1`,
          labelColor: () => "#4A5568",
          barPercentage: 0.8,
          barRadius: 6,
          propsForBackgroundLines: {
            strokeWidth: 0
          }
        }}
        style={{
          borderRadius: 12,
          paddingVertical: 8,
          marginBottom: 20,
          backgroundColor: "#FFFFFF",
        }}
        withHorizontalLabels={false}
        fromZero={true}
      />

      {/* Categories */}
      <FlatList
        data={student.categories}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.categoriesList}
      />

      {/* Feedback Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Add Feedback for {selectedCategory}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your feedback..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
            <Pressable style={styles.saveButton} onPress={closeModal}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <Pressable
          style={styles.menuItem}
          onPress={() => console.log("Settings pressed")}
        >
          <Ionicons name="settings-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Settings</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => router.push("/classes")}
        >
          <Ionicons name="home-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => console.log("Profile pressed")}
        >
          <Ionicons name="person-outline" size={24} color="#6B46C1" />
          <Text style={styles.menuText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 60,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
  backText: {
    color: "#6B46C1",
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A5568",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A5568",
    marginTop: 20,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  categoryItem: {
    backgroundColor: "#E2E8F0",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B46C1",
  },
  details: {
    backgroundColor: "#F7FAFC",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  detailsText: {
    fontSize: 16,
    color: "#4A5568",
  },
  feedbackButton: {
    backgroundColor: "#6B46C1",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  feedbackButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 100,
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  saveButton: {
    backgroundColor: "#805AD5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
