import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="classes"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="class-details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="students"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="progress"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="rubrics"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
