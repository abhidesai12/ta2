import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
  { id: "feedback", title: "Feedback", icon: "chatbubble-outline" },
  { id: "students", title: "Students", icon: "people-outline" },
  { id: "rubrics", title: "Rubrics", icon: "list-outline" },
  { id: "diagnostics", title: "Assignments", icon: "analytics-outline" },
];

export default function ClassDetails() {
  const router = useRouter();
  const { className } = useLocalSearchParams();

  const handleMenuPress = (menuId) => {
    if (menuId === "students") {
      router.push("/students");
    } else if (menuId === "rubrics") {
      router.push("/rubrics");
    } else if (menuId === "feedback") {
      router.push("/feedback");
    } else {
      console.log(`Clicked ${menuId}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/classes")}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#6B46C1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{className || "Class"}</Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.id)}
          >
            <Ionicons name={item.icon} size={32} color="#6B46C1" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="settings-outline" size={24} color="#6B46C1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.replace("/classes")}
        >
          <Ionicons name="home-outline" size={24} color="#6B46C1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#6B46C1" />
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#6B46C1",
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6B46C1",
    textAlign: "center",
    flex: 1,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuItem: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: 20,
  },
  navButton: {
    padding: 10,
  },
});
