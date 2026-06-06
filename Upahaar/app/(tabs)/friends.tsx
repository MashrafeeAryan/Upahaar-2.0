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
 * These colors match the soft pink, cutesy, girly style used on the Home screen.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock friend data.
 * Later, this will come from Appwrite.
 */
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    birthDate: "1998-09-24",
    relationship: "Friend",
    memoriesCount: 4,
    likes: ["desk setup", "coffee", "black"],
  },
  {
    id: 2,
    name: "Mom",
    birthDate: "1985-10-02",
    relationship: "Family",
    memoriesCount: 7,
    likes: ["gold jewelry", "soft colors", "flowers"],
  },
  {
    id: 3,
    name: "Rahim",
    birthDate: "2000-03-25",
    relationship: "Friend",
    memoriesCount: 2,
    likes: ["coffee mugs", "football", "minimal designs"],
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

/**
 * Sorts friends by their closest upcoming birthday.
 */
const getSortedFriends = (data: typeof friends) => {
  return [...data].sort(
    (a, b) => getDaysUntilBirthday(a.birthDate) - getDaysUntilBirthday(b.birthDate)
  );
};

const Friends = () => {
  /**
   * Keep the list sorted so the most urgent birthdays appear first.
   */
  const sortedFriends = getSortedFriends(friends);

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/*
        Soft pink overlay.
        Keeps the screen readable while matching Upahaar's warm visual style.
      */}
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* Page header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-textPrimary">
              Friends 🎀
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Keep birthdays, sweet details, and gift clues in one place.
            </Text>
          </View>

          {/*
            Add friend card.
            This is the main action on this tab.
          */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-xl font-bold text-textPrimary">
              Add someone special 💝
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Save their birthday, relationship, likes, dislikes, and little
              details you want to remember.
            </Text>

            <AppButton
              title="Add Friend"
              onPress={() => {
                // Later: create app/friend/add.tsx or app/(tabs)/add-friend.tsx
                // For now, keep this ready for the add friend flow.
                router.push("/friend/add");
              }}
              className="mt-5"
            />
          </View>

          {/* Section title */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-textPrimary">
              Saved Friends
            </Text>

            <Text className="text-sm font-semibold" style={{ color: PRIMARY_PINK }}>
              {sortedFriends.length} total
            </Text>
          </View>

          {/*
            Friends list.
            Each card gives a quick overview of the friend's birthday,
            relationship, saved memories, and gift clues.
          */}
          <View className="gap-4">
            {sortedFriends.map((friend) => (
              <Pressable
                key={friend.id}
                onPress={() => {
                  // Later: create a dynamic friend profile page.
                  // Example route: app/friend/[id].tsx
                  router.push(`/friend/${friend.id}`);
                }}
                className="bg-white rounded-3xl p-5 shadow-sm border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                {/* Top row: avatar, name, and birthday */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className="h-12 w-12 rounded-2xl items-center justify-center"
                      style={{ backgroundColor: SOFT_PINK }}
                    >
                      <Text className="text-xl">💌</Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-lg font-bold text-textPrimary">
                        {friend.name}
                      </Text>

                      <Text className="text-sm text-textSecondary mt-1">
                        {friend.relationship}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="text-sm font-bold" style={{ color: PRIMARY_PINK }}>
                      {formatDate(friend.birthDate)}
                    </Text>

                    <Text className="text-xs text-textSecondary mt-1">
                      {getDaysUntilBirthday(friend.birthDate)} days
                    </Text>
                  </View>
                </View>

                {/*
                  Memory summary.
                  Shows why this app is more than a birthday tracker.
                */}
                <View
                  className="rounded-2xl px-4 py-3 mt-4"
                  style={{ backgroundColor: VERY_SOFT_PINK }}
                >
                  <Text className="text-sm font-semibold text-textPrimary">
                    {friend.memoriesCount} saved memories ✨
                  </Text>

                  <Text className="text-xs text-textSecondary mt-1 leading-4">
                    Use these notes later to create thoughtful gift ideas.
                  </Text>
                </View>

                {/*
                  Interest tags.
                  These make each friend profile feel personal and cute.
                */}
                <View className="flex-row flex-wrap gap-2 mt-4">
                  {friend.likes.map((like) => (
                    <View
                      key={like}
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: SOFT_PINK }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: PRIMARY_PINK }}
                      >
                        {like}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Bottom action row */}
                <View className="flex-row gap-3 mt-5">
                  <Pressable
                    onPress={() => {
                      router.push("/(tabs)/memory");
                    }}
                    className="flex-1 rounded-2xl px-4 py-3 items-center"
                    style={{ backgroundColor: VERY_SOFT_PINK }}
                  >
                    <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                      Add Memory
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      router.push("/(tabs)/gifts");
                    }}
                    className="flex-1 rounded-2xl px-4 py-3 items-center"
                    style={{ backgroundColor: SOFT_PINK }}
                  >
                    <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                      Gift Ideas
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Friends;