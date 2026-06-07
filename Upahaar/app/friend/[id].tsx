import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 * These match the soft, light-pink, cutesy/girly design used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock friend data.
 * Later, this should come from the Appwrite friends collection.
 */
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    birthDate: "1998-09-24",
    relationship: "Friend",
    budget: "$25 - $40",
    likes: ["coffee", "desk setup", "minimal designs"],
    dislikes: ["flashy colors", "messy designs"],
    favoriteColors: ["black", "dark red"],
    notes: "Likes practical gifts and clean designs.",
  },
  {
    id: 2,
    name: "Mom",
    birthDate: "1985-10-02",
    relationship: "Family",
    budget: "$30 - $60",
    likes: ["gold jewelry", "flowers", "handwritten notes"],
    dislikes: ["loud designs"],
    favoriteColors: ["soft pink", "cream", "gold"],
    notes: "Prefers meaningful gifts over expensive ones.",
  },
  {
    id: 3,
    name: "Rahim",
    birthDate: "2000-03-25",
    relationship: "Friend",
    budget: "$20 - $35",
    likes: ["coffee mugs", "football", "simple designs"],
    dislikes: ["flashy colors"],
    favoriteColors: ["blue", "black"],
    notes: "Likes useful everyday gifts.",
  },
];

/**
 * Temporary mock memory data.
 * Later, this should come from the Appwrite memories collection using friendId.
 */
const memories = [
  {
    id: 1,
    friendId: 1,
    category: "Wants ✨",
    note: "Mentioned wanting a black desk mat for his setup.",
  },
  {
    id: 2,
    friendId: 1,
    category: "Likes 💕",
    note: "Likes coffee and minimal designs.",
  },
  {
    id: 3,
    friendId: 2,
    category: "Likes 💕",
    note: "Likes simple gold jewelry and soft colors.",
  },
  {
    id: 4,
    friendId: 2,
    category: "Gift clue 🎁",
    note: "Would love something with flowers and a handwritten note.",
  },
  {
    id: 5,
    friendId: 3,
    category: "Wants ✨",
    note: "Said he wants a better coffee mug.",
  },
];

/**
 * Formats a full date string into a short birthday display format.
 *
 * Example:
 * "1998-09-24" -> "Sep 24"
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

/**
 * Calculates how many days are left until the next birthday.
 */
const getDaysUntilBirthday = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);

  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffInMs = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

const FriendProfile = () => {
  /**
   * Expo Router gives us the dynamic route value from /friend/[id].
   */
  const { id } = useLocalSearchParams();

  const friendId = Number(id);
  const friend = friends.find((item) => item.id === friendId);

  /**
   * Only show memories that belong to this friend.
   */
  const friendMemories = memories.filter(
    (memory) => memory.friendId === friendId
  );

  /**
   * Simple fallback if the friend does not exist.
   * Later, this can become a nicer error state.
   */
  if (!friend) {
    return (
      <View className="flex-1 items-center justify-center bg-pink-50 px-6">
        <Text className="text-2xl font-bold text-textPrimary">
          Friend not found
        </Text>

        <Text className="text-base text-textSecondary text-center mt-2">
          This profile could not be loaded.
        </Text>

        <AppButton
          title="Go Back"
          onPress={() => {
            router.back();
          }}
          className="mt-5"
        />
      </View>
    );
  }

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
          {/* Header row */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-textPrimary">
                {friend.name} 💝
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Their birthday, saved memories, and gift clues in one place.
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

          {/* Main profile card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4 flex-1">
                <View
                  className="h-16 w-16 rounded-3xl items-center justify-center"
                  style={{ backgroundColor: SOFT_PINK }}
                >
                  <Text className="text-2xl">🎀</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-xl font-bold text-textPrimary">
                    {friend.name}
                  </Text>

                  <Text className="text-sm text-textSecondary mt-1">
                    {friend.relationship}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  router.push(`/friend/edit/${friend.id}`);
                }}
                className="px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: VERY_SOFT_PINK,
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Edit
                </Text>
              </Pressable>
            </View>

            <View
              className="rounded-2xl px-4 py-3 mt-5"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-bold text-textPrimary">
                Birthday 🎂
              </Text>

              <Text className="text-sm text-textSecondary mt-1">
                {formatDate(friend.birthDate)} •{" "}
                {getDaysUntilBirthday(friend.birthDate)} days left
              </Text>
            </View>

            <View
              className="rounded-2xl px-4 py-3 mt-3"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-bold text-textPrimary">
                Gift budget
              </Text>

              <Text className="text-sm text-textSecondary mt-1">
                {friend.budget}
              </Text>
            </View>
          </View>

          {/* Gift assistant actions */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Mimi can help ✨
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Use saved memories to generate thoughtful gift ideas for{" "}
              {friend.name}.
            </Text>

            <View className="flex-row gap-3 mt-5">
              <Pressable
                onPress={() => {
                  router.push("/(tabs)/memory");
                }}
                className="flex-1 bg-white rounded-2xl px-4 py-3 items-center border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Add Memory
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  router.push("/(tabs)/gifts");
                }}
                className="flex-1 bg-white rounded-2xl px-4 py-3 items-center border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Gift Ideas
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Likes */}
          <Text className="text-lg font-semibold text-textPrimary mb-3">
            Likes 💕
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {friend.likes.map((like) => (
              <View
                key={like}
                className="px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: SOFT_PINK,
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-semibold" style={{ color: PRIMARY_PINK }}>
                  {like}
                </Text>
              </View>
            ))}
          </View>

          {/* Dislikes */}
          <Text className="text-lg font-semibold text-textPrimary mb-3">
            Dislikes
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {friend.dislikes.map((dislike) => (
              <View
                key={dislike}
                className="px-4 py-2 rounded-full border bg-white"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-semibold text-textSecondary">
                  {dislike}
                </Text>
              </View>
            ))}
          </View>

          {/* Favorite colors */}
          <Text className="text-lg font-semibold text-textPrimary mb-3">
            Favorite Colors 🎨
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {friend.favoriteColors.map((color) => (
              <View
                key={color}
                className="px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: VERY_SOFT_PINK,
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-semibold" style={{ color: PRIMARY_PINK }}>
                  {color}
                </Text>
              </View>
            ))}
          </View>

          {/* Notes */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Extra Notes 💌
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              {friend.notes}
            </Text>
          </View>

          {/* Saved memories */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-textPrimary">
              Saved Memories 💭
            </Text>

            <Text className="text-sm font-semibold" style={{ color: PRIMARY_PINK }}>
              {friendMemories.length} notes
            </Text>
          </View>

          <View
            className="bg-white rounded-3xl shadow-sm overflow-hidden border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            {friendMemories.length > 0 ? (
              friendMemories.map((memory, index) => (
                <View
                  key={memory.id}
                  className={`px-5 py-4 ${
                    index !== friendMemories.length - 1 ? "border-b" : ""
                  }`}
                  style={{
                    borderBottomColor:
                      index !== friendMemories.length - 1
                        ? CARD_BORDER_COLOR
                        : "transparent",
                  }}
                >
                  <Text className="text-xs font-bold" style={{ color: PRIMARY_PINK }}>
                    {memory.category}
                  </Text>

                  <Text className="text-sm text-textSecondary mt-1 leading-5">
                    {memory.note}
                  </Text>
                </View>
              ))
            ) : (
              <View className="px-5 py-6">
                <Text className="text-base font-bold text-textPrimary">
                  No memories yet
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  Add a small detail so Mimi can suggest better gifts later.
                </Text>
              </View>
            )}
          </View>

          {/* Bottom CTA */}
          <AppButton
            title="Generate Gift Ideas"
            onPress={() => {
              router.push("/(tabs)/gifts");
            }}
            className="mt-6"
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default FriendProfile;