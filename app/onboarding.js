import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const onboardingPages = [
  {
    id: "1",
    icon: "robot",
    title: "Hi, I'm TA²I, your AI Teaching Assistant!",
    description:
      "I can help you grade & write feedback for papers and worksheets, track progress, and more!",
  },
  {
    id: "2",
    icon: "archive-check-outline",
    title: "Give Feedback",
    description:
      "Give Feedback lets you create, customize, and submit feedback using AI. Submitted feedback is returned to students via your LMS, and appears as annotations!",
  },
  {
    id: "3",
    icon: "file-document-outline",
    title: "Rubrics",
    description:
      "Rubrics lets you view and edit the rubric or answer key for any active assignments.",
  },
  {
    id: "4",
    icon: "account-group-outline",
    title: "Students",
    description:
      "Easily view progress and provide feedback for enrolled students.",
  },
  {
    id: "5",
    icon: "cog-outline",
    title: "Settings",
    description:
      "Visit Settings to link your Canvas, GradeScope, Google Classroom, or other accounts!",
  },
  {
    id: "6",
    icon: "magnify",
    title: "Assignment Hub",
    description:
      "Create targeted assessments for your students with full control over amount, type, and subject of the questions.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingPages.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push("/classes"); // Navigate to Classes Page after the last onboarding page
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingPages}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={120}
                color="#6B46C1"
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingPages.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  page: {
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#F7FAFC",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2D3748",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#6B46C1",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
