import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

const friends = [
  {
    id: 1,
    name: "Alex",
    memories: [
      "Wants a black desk mat",
      "Likes coffee",
      "Likes minimal designs",
    ],
    ideas: [
      {
        title: "Custom Desk Mug",
        reason: "It fits his coffee habit and clean style.",
        personal: "Black mug with white text: Focus Mode",
        emoji: "☕",
      },
      {
        title: "Minimal Desk Mat",
        reason: "He already mentioned wanting one.",
        personal: "Add small initials in the corner",
        emoji: "🖤",
      },
      {
        title: "Simple T-Shirt",
        reason: "It matches his minimal taste.",
        personal: "Small chest print with initials",
        emoji: "👕",
      },
    ],
  },
  {
    id: 2,
    name: "Mom",
    memories: [
      "Likes flowers",
      "Likes simple gold jewelry",
      "Loves handwritten notes",
    ],
    ideas: [
      {
        title: "Gold-Style Locket",
        reason: "It feels meaningful and elegant.",
        personal: "Add initials or a tiny heart",
        emoji: "✨",
      },
      {
        title: "Floral Mug",
        reason: "It matches her soft and cozy taste.",
        personal: "Blush floral design with a sweet message",
        emoji: "🌸",
      },
      {
        title: "Custom Note Cards",
        reason: "She loves thoughtful handwritten things.",
        personal: "Add little thank-you notes",
        emoji: "💌",
      },
    ],
  },
  {
    id: 3,
    name: "Rahim",
    memories: [
      "Wants a better coffee mug",
      "Likes football",
      "Does not like flashy colors",
    ],
    ideas: [
      {
        title: "Minimal Coffee Mug",
        reason: "He said he wants a better mug.",
        personal: "Simple design with his name",
        emoji: "☕",
      },
      {
        title: "Football T-Shirt",
        reason: "It fits his interests without being too loud.",
        personal: "Small football icon in neutral colors",
        emoji: "⚽",
      },
      {
        title: "Simple Hoodie",
        reason: "Useful, wearable, and easy to like.",
        personal: "Small initials on the sleeve",
        emoji: "🧥",
      },
    ],
  },
];

const MimiAssistant = () => {
  const [selectedFriendId, setSelectedFriendId] = useState<number>(1);
  const [isThinking, setIsThinking] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const selectedFriend =
    friends.find((friend) => friend.id === selectedFriendId) ?? friends[0];

  const handleAskMimi = () => {
    setIsThinking(true);
    setShowResults(false);

    setTimeout(() => {
      setIsThinking(false);
      setShowResults(true);
    }, 1800);
  };

  return (
    <ImageBackground
      source={require("../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-textPrimary">
                Mimi ✨
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Your little gift helper
              </Text>
            </View>

            <Pressable
              onPress={() => {
                router.back();
              }}
              className="h-11 w-11 rounded-2xl items-center justify-center border ml-3"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-lg" style={{ color: PRIMARY_PINK }}>
                ✕
              </Text>
            </Pressable>
          </View>

          {/* Mimi intro bubble */}
          <View className="mb-6">
            <View
              className="self-start max-w-[85%] rounded-3xl px-4 py-4 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-sm text-textPrimary leading-5">
                Hi! Pick someone, and I’ll help you find a thoughtful gift 💝
              </Text>
            </View>
          </View>

          {/* Choose friend */}
          <Text className="text-sm font-semibold text-textPrimary mb-2">
            Pick someone
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="flex-row gap-2">
              {friends.map((friend) => {
                const isSelected = selectedFriendId === friend.id;

                return (
                  <Pressable
                    key={friend.id}
                    onPress={() => {
                      setSelectedFriendId(friend.id);
                      setShowResults(false);
                      setIsThinking(false);
                    }}
                    className="px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: isSelected ? SOFT_PINK : VERY_SOFT_PINK,
                      borderColor: isSelected
                        ? PRIMARY_PINK
                        : CARD_BORDER_COLOR,
                      borderWidth: CARD_BORDER_WIDTH,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color: isSelected ? PRIMARY_PINK : "#7A5A66",
                      }}
                    >
                      {friend.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {/* What Mimi knows */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-3">
              What Mimi knows
            </Text>

            <View className="gap-2">
              {selectedFriend.memories.map((memory) => (
                <View
                  key={memory}
                  className="rounded-2xl px-4 py-3"
                  style={{ backgroundColor: VERY_SOFT_PINK }}
                >
                  <Text className="text-sm text-textSecondary">💭 {memory}</Text>
                </View>
              ))}
            </View>

            <AppButton
              title={isThinking ? "Mimi is thinking..." : "Ask Mimi"}
              onPress={handleAskMimi}
              className="mt-5"
            />
          </View>

          {/* Thinking state */}
          {isThinking && (
            <View className="mb-6">
              <View
                className="self-start max-w-[85%] rounded-3xl px-4 py-4 border"
                style={{
                  backgroundColor: SOFT_PINK,
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <ActivityIndicator size="small" color={PRIMARY_PINK} />
                  <Text className="text-sm text-textPrimary">
                    Thinking of something sweet...
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Results */}
          {showResults && (
            <>
              <View className="mb-4">
                <View
                  className="self-start max-w-[85%] rounded-3xl px-4 py-4 border"
                  style={{
                    backgroundColor: SOFT_PINK,
                    borderColor: CARD_BORDER_COLOR,
                    borderWidth: CARD_BORDER_WIDTH,
                  }}
                >
                  <Text className="text-sm text-textPrimary leading-5">
                    I found a few ideas for {selectedFriend.name} 🌸
                  </Text>
                </View>
              </View>

              <View className="gap-4">
                {selectedFriend.ideas.map((idea, index) => (
                  <View
                    key={index}
                    className="bg-white rounded-3xl p-5 shadow-sm border"
                    style={{
                      borderColor: CARD_BORDER_COLOR,
                      borderWidth: CARD_BORDER_WIDTH,
                    }}
                  >
                    <View className="flex-row items-center gap-3 mb-3">
                      <View
                        className="h-12 w-12 rounded-2xl items-center justify-center"
                        style={{ backgroundColor: SOFT_PINK }}
                      >
                        <Text className="text-xl">{idea.emoji}</Text>
                      </View>

                      <View className="flex-1">
                        <Text className="text-lg font-bold text-textPrimary">
                          {idea.title}
                        </Text>
                      </View>
                    </View>

                    <View
                      className="rounded-2xl px-4 py-3 mb-3"
                      style={{ backgroundColor: VERY_SOFT_PINK }}
                    >
                      <Text className="text-sm font-bold text-textPrimary">
                        Why it fits
                      </Text>

                      <Text className="text-sm text-textSecondary mt-1 leading-5">
                        {idea.reason}
                      </Text>
                    </View>

                    <View
                      className="rounded-2xl px-4 py-3"
                      style={{ backgroundColor: VERY_SOFT_PINK }}
                    >
                      <Text className="text-sm font-bold text-textPrimary">
                        Make it personal
                      </Text>

                      <Text className="text-sm text-textSecondary mt-1 leading-5">
                        {idea.personal}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  router.push("/gifts/preview");
                }}
                className="mt-6 bg-white rounded-2xl px-4 py-4 items-center border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Continue to Gift Preview →
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default MimiAssistant;