import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
} from "react-native";

const birthdays = [
  { id: "1", name: "Sarah Ahmed", date: "Sep 18" },
  { id: "2", name: "Alex Johnson", date: "Sep 24" },
  { id: "3", name: "Mom", date: "Oct 2" },
];

const BirthdaysScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Soft overlay for readability */}
      <View className="flex-1 bg-white/30 px-6 pt-14">
        {/* Header */}
        <Text className="text-2xl font-bold text-textPrimary">
          Birthdays 🎂
        </Text>
        <Text className="text-base text-textSecondary mt-2 mb-6">
          Keep track of important dates
        </Text>

        {/* Birthday List */}
        <FlatList
          data={birthdays}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <View className="bg-white/90 rounded-2xl px-5 py-4 shadow-lg">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  {/* Icon */}
                  <View className="h-12 w-12 rounded-xl bg-pink-100 items-center justify-center">
                    <Text className="text-lg">🎁</Text>
                  </View>

                  {/* Name */}
                  <Text className="text-base font-semibold text-textPrimary">
                    {item.name}
                  </Text>
                </View>

                {/* Date */}
                <Text className="text-sm font-semibold text-primary">
                  {item.date}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Add Birthday CTA */}
        <Pressable
          className="mt-6 bg-primary rounded-xl py-4 items-center"
          onPress={() => {
            // Navigate to Add Birthday screen later
          }}
        >
          <Text className="text-white font-semibold text-base">
            Add Birthday
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default BirthdaysScreen;
