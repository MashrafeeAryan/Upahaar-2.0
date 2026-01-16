import { View, Text } from "react-native";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Link href="/(auth)/SignInScreen">
        <Text className="text-primary text-lg font-semibold">
          Go to Sign Up
        </Text>
      </Link>
    </View>
  );
};

export default Index;
