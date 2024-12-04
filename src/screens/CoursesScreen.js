import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CoursesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>
      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetail')}
      >
        <Text style={styles.courseTitle}>Introduction to Programming</Text>
        <Text style={styles.courseDescription}>Learn the basics of programming</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetail')}
      >
        <Text style={styles.courseTitle}>Advanced Mathematics</Text>
        <Text style={styles.courseDescription}>Master complex mathematical concepts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  courseDescription: {
    color: '#666',
  },
});
