import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const students = [
  { id: "1", name: "James L." },
  { id: "2", name: "John M." },
  { id: "3", name: "Jack N." },
  { id: "4", name: "Emily R." },
  { id: "5", name: "Sophia T." },
  { id: "6", name: "Oliver P." },
  { id: "7", name: "Liam C." },
  { id: "8", name: "Emma W." },
];

export default function Students() {
  const router = useRouter();
  const width = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() =>
        router.push({
          pathname: "/progress",
          params: { studentId: item.id, studentName: item.name },
        })
      }
    >
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.studentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#6B46C1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Students</Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

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
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  backText: {
    color: '#6B46C1',
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6B46C1",
    flex: 1,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'center',
    gap: 20,
  },
  studentItem: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.4,
    marginBottom: 30,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6B46C1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholderText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  studentName: {
    fontSize: 16,
    color: "#4A5568",
    marginTop: 4,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: "#F7FAFC",
    position: "absolute",
    bottom: 0,
    width: "100%",
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
