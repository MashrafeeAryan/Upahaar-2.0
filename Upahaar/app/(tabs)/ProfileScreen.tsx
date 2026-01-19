import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold text-textPrimary mb-4">
        Profile
      </Text>

      <Pressable
        onPress={() => router.push("/(auth)/SignInScreen")}
        className="bg-primary px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
