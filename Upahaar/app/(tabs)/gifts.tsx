import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary friend data.
 * Later, this will come from Appwrite.
 */
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    relationship: "Friend",
    budget: "$25 - $40",
    memories: [
      "Wants a black desk mat.",
      "Likes coffee.",
      "Likes minimal designs.",
    ],
  },
  {
    id: 2,
    name: "Mom",
    relationship: "Family",
    budget: "$30 - $60",
    memories: [
      "Likes simple gold jewelry.",
      "Loves flowers.",
      "Likes handwritten notes.",
    ],
  },
  {
    id: 3,
    name: "Rahim",
    relationship: "Friend",
    budget: "$20 - $35",
    memories: [
      "Wants a better coffee mug.",
      "Likes football.",
      "Does not like flashy colors.",
    ],
  },
];

/**
 * Temporary gift ideas.
 * Later, Mimi can generate these from real saved memories.
 */
const giftIdeasByFriendId: Record<
  number,
  {
    id: number;
    title: string;
    productType: string;
    price: string;
    why: string;
    personalization: string;
    giftNote: string;
    emoji: string;
  }[]
> = {
  1: [
    {
      id: 1,
      title: "Custom Desk Mug",
      productType: "Mug",
      price: "$24",
      emoji: "☕",
      why: "He likes coffee and clean desk setup items.",
      personalization: "Black mug with small white text: “Focus Mode”.",
      giftNote: "Happy birthday! Hope this makes your setup feel nicer.",
    },
    {
      id: 2,
      title: "Black Desk Mat",
      productType: "Desk accessory",
      price: "$35",
      emoji: "🖤",
      why: "He mentioned wanting a black desk mat.",
      personalization: "Add small initials in the corner.",
      giftNote: "For the desk setup upgrade you talked about.",
    },
    {
      id: 3,
      title: "Minimal T-Shirt",
      productType: "Shirt",
      price: "$29",
      emoji: "👕",
      why: "He likes simple designs and darker colors.",
      personalization: "Small chest design with initials or an inside joke.",
      giftNote: "A little birthday gift with your style in mind.",
    },
  ],
  2: [
    {
      id: 1,
      title: "Gold-Style Locket",
      productType: "Locket",
      price: "$38",
      emoji: "✨",
      why: "She likes simple jewelry and meaningful gifts.",
      personalization: "Add initials or a tiny heart.",
      giftNote: "A little reminder of how loved you are.",
    },
    {
      id: 2,
      title: "Soft Floral Mug",
      productType: "Mug",
      price: "$22",
      emoji: "🌸",
      why: "She loves flowers and soft colors.",
      personalization: "Blush floral design with a short message.",
      giftNote: "For your cozy mornings. Happy birthday.",
    },
    {
      id: 3,
      title: "Custom Note Cards",
      productType: "Card set",
      price: "$18",
      emoji: "💌",
      why: "She likes thoughtful handwritten notes.",
      personalization: "Add a few sweet memories and thank-you notes.",
      giftNote: "Something simple, meaningful, and full of love.",
    },
  ],
  3: [
    {
      id: 1,
      title: "Minimal Coffee Mug",
      productType: "Mug",
      price: "$21",
      emoji: "☕",
      why: "He said he wants a better coffee mug.",
      personalization: "Simple design with his name or a small icon.",
      giftNote: "For better coffee days. Happy birthday!",
    },
    {
      id: 2,
      title: "Football T-Shirt",
      productType: "Shirt",
      price: "$27",
      emoji: "⚽",
      why: "He likes football but prefers simple designs.",
      personalization: "Small football graphic with neutral colors.",
      giftNote: "A little something for your football side.",
    },
    {
      id: 3,
      title: "Everyday Hoodie",
      productType: "Hoodie",
      price: "$35",
      emoji: "🧥",
      why: "It is simple, useful, and easy to wear.",
      personalization: "Small initials on the sleeve.",
      giftNote: "Something cozy for your everyday fits.",
    },
  ],
};

const Gifts = () => {
  const [selectedFriendId, setSelectedFriendId] = useState<number>(1);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedFriend = friends.find(
    (friend) => friend.id === selectedFriendId
  );

  const giftIdeas = giftIdeasByFriendId[selectedFriendId] ?? [];
  const selectedGift = giftIdeas.find((gift) => gift.id === selectedGiftId);

  const handleGenerateGiftIdeas = () => {
    setHasGenerated(true);
    setSelectedGiftId(null);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
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
          <View className="mb-6">
            <Text className="text-3xl font-bold text-textPrimary">
              Mimi’s Gift Helper ✨
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Pick someone and get thoughtful gift ideas.
            </Text>
          </View>

          {/* Intro card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Let’s find something sweet 💝
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Mimi uses what you remember about them to suggest gifts they may
              love.
            </Text>
          </View>

          {/* Friend selector */}
          <Text className="text-sm font-semibold text-textPrimary mb-2">
            Choose someone
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
                      setHasGenerated(false);
                      setSelectedGiftId(null);
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

          {/* Friend card */}
          {selectedFriend && (
            <View
              className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
              style={{
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-textPrimary">
                    {selectedFriend.name}
                  </Text>

                  <Text className="text-sm text-textSecondary mt-1">
                    {selectedFriend.relationship} • {selectedFriend.budget}
                  </Text>
                </View>

                <View
                  className="h-12 w-12 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: SOFT_PINK }}
                >
                  <Text className="text-xl">🎁</Text>
                </View>
              </View>

              <Text className="text-sm font-semibold text-textPrimary mb-2">
                What Mimi knows
              </Text>

              <View className="gap-2">
                {selectedFriend.memories.map((memory) => (
                  <View
                    key={memory}
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: VERY_SOFT_PINK }}
                  >
                    <Text className="text-sm text-textSecondary leading-5">
                      💭 {memory}
                    </Text>
                  </View>
                ))}
              </View>

              <AppButton
                title="Find Gift Ideas"
                onPress={handleGenerateGiftIdeas}
                className="mt-5"
              />
            </View>
          )}

          {/* Gift ideas */}
          {hasGenerated && (
            <>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold text-textPrimary">
                  Gift Ideas
                </Text>

                <Text
                  className="text-sm font-semibold"
                  style={{ color: PRIMARY_PINK }}
                >
                  {giftIdeas.length} ideas
                </Text>
              </View>

              <View className="gap-4">
                {giftIdeas.map((gift) => {
                  const isSelected = selectedGiftId === gift.id;

                  return (
                    <Pressable
                      key={gift.id}
                      onPress={() => {
                        setSelectedGiftId(gift.id);
                      }}
                      className="bg-white rounded-3xl p-5 shadow-sm border"
                      style={{
                        borderColor: isSelected
                          ? PRIMARY_PINK
                          : CARD_BORDER_COLOR,
                        borderWidth: isSelected ? 2 : CARD_BORDER_WIDTH,
                      }}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3 flex-1">
                          <View
                            className="h-12 w-12 rounded-2xl items-center justify-center"
                            style={{ backgroundColor: SOFT_PINK }}
                          >
                            <Text className="text-xl">{gift.emoji}</Text>
                          </View>

                          <View className="flex-1">
                            <Text className="text-lg font-bold text-textPrimary">
                              {gift.title}
                            </Text>

                            <Text className="text-sm text-textSecondary mt-1">
                              {gift.productType} • Around {gift.price}
                            </Text>
                          </View>
                        </View>

                        {isSelected && (
                          <Text
                            className="text-xs font-bold"
                            style={{ color: PRIMARY_PINK }}
                          >
                            Picked
                          </Text>
                        )}
                      </View>

                      <View
                        className="rounded-2xl px-4 py-3 mt-4"
                        style={{ backgroundColor: VERY_SOFT_PINK }}
                      >
                        <Text className="text-sm font-bold text-textPrimary">
                          Why it fits
                        </Text>

                        <Text className="text-sm text-textSecondary mt-1 leading-5">
                          {gift.why}
                        </Text>
                      </View>

                      <View className="mt-4">
                        <Text
                          className="text-sm font-bold"
                          style={{ color: PRIMARY_PINK }}
                        >
                          Make it personal
                        </Text>

                        <Text className="text-sm text-textSecondary mt-1 leading-5">
                          {gift.personalization}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          {/* Selected gift */}
          {selectedGift && selectedFriend && (
            <View
              className="rounded-3xl p-5 shadow-sm border mt-6"
              style={{
                backgroundColor: SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-lg font-bold text-textPrimary">
                Your Gift Pick 💌
              </Text>

              <Text className="text-sm text-textSecondary mt-2 leading-5">
                {selectedGift.title} for {selectedFriend.name}
              </Text>

              <View
                className="bg-white rounded-2xl px-4 py-3 mt-4"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  Custom idea
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  {selectedGift.personalization}
                </Text>
              </View>

              <View
                className="bg-white rounded-2xl px-4 py-3 mt-3"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  Gift note
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  {selectedGift.giftNote}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  router.push("/gifts/preview");
                }}
                className="mt-5 bg-white rounded-2xl px-4 py-3 items-center border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Customize Gift →
                </Text>
              </Pressable>
            </View>
          )}

          {/* Helpful next action */}
          {hasGenerated && (
            <View
              className="bg-white rounded-3xl p-5 shadow-sm border mt-6"
              style={{
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-lg font-bold text-textPrimary">
                Want better ideas? 🌸
              </Text>

              <Text className="text-sm text-textSecondary mt-2 leading-5">
                Add more memories so Mimi can make the suggestions more personal.
              </Text>

              <Pressable
                onPress={() => {
                  router.push("/(tabs)/memory");
                }}
                className="mt-4 rounded-2xl px-4 py-3 items-center"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Add More Memories →
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Gifts;