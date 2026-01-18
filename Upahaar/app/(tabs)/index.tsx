import { View, Text, ImageBackground, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

const Index = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Soft overlay so text/cards read well on top of the image */}
      <View className="flex-1 bg-white/30">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 28 }}
          className="flex-1 px-6 pt-14"
        >
          {/* Header */}
       
          <Text className="text-base text-textSecondary mt-2 mb-6">
            Here’s what’s coming up.
          </Text>

          {/* Next Birthday Card */}
          <View className="bg-white rounded-2xl p-5 shadow-lg">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-semibold text-primary">
                Next Birthday
              </Text>
              <View className="h-2 w-2 rounded-full bg-pink-200" />
            </View>

            <Text className="text-xl font-bold text-textPrimary">
              Sarah Ahmed
            </Text>
            <Text className="text-base text-textSecondary mt-1">
              In 3 days
            </Text>

            <Pressable
              onPress={() => {
                // Later: navigate to gift ordering flow
                // router.push("/gifts");
              }}
              className="mt-5 bg-primary rounded-xl py-3 items-center"
            >
              <Text className="text-white font-semibold text-base">
                Order Gift
              </Text>
            </Pressable>
          </View>

          {/* Upcoming Birthdays */}
          <Text className="text-lg font-semibold text-textPrimary mt-8 mb-3">
            Upcoming Birthdays
          </Text>

          <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Row 1 */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-pink-100">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-xl bg-pink-100 items-center justify-center">
                  <Text>🎁</Text>
                </View>
                <Text className="text-base font-semibold text-textPrimary">
                  Alex Johnson
                </Text>
              </View>
              <Text className="text-sm font-semibold text-textSecondary">
                Sep 24
              </Text>
            </View>

            {/* Row 2 */}
            <View className="flex-row items-center justify-between px-5 py-4">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-xl bg-pink-100 items-center justify-center">
                  <Text>🎁</Text>
                </View>
                <Text className="text-base font-semibold text-textPrimary">
                  Mom
                </Text>
              </View>
              <Text className="text-sm font-semibold text-textSecondary">
                Oct 2
              </Text>
            </View>
          </View>

          {/* View All */}
          <Pressable
            onPress={() => {
              // Later: navigate to birthdays tab/screen
              // router.push("/birthdays");
              router.push("/(auth)/SignInScreen"); // temporary
            }}
            className="mt-6 items-center"
          >
            <Text className="text-primary font-semibold">
              View All Birthdays →
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Index;
