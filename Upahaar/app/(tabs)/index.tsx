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
 * Upahaar uses a soft, light-pink theme.
 * These constants keep the screen visually consistent and easy to update.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock birthday data.
 * Later, this data will come from Appwrite.
 */
const birthdays = [
  { id: 1, name: "Alex Johnson", birthDate: "1998-09-24" },
  { id: 2, name: "Mom", birthDate: "1985-10-02" },
  { id: 3, name: "Rahim", birthDate: "2000-03-25" },
];

/**
 * Temporary mock memory data.
 * These notes show the main purpose of Upahaar:
 * remembering small details so users can give better gifts later.
 */
const recentMemories = [
  {
    id: 1,
    name: "Alex Johnson",
    note: "Mentioned wanting a black desk mat for his setup.",
  },
  {
    id: 2,
    name: "Mom",
    note: "Likes simple gold jewelry and soft colors.",
  },
];

/**
 * Formats a full date string into a shorter birthday display format.
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
 * Returns the number of days until the next occurrence of a birthday.
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
 * Returns birthdays sorted by the next upcoming birthday date.
 *
 * Since birthDate includes the original birth year, this function converts
 * each birthday into the next occurrence of that birthday using the current year.
 * If the birthday already passed this year, it moves it to next year.
 */
const getUpcomingBirthdays = (data: typeof birthdays) => {
  const today = new Date();

  return data
    .map((person) => {
      const birthDate = new Date(person.birthDate);

      /**
       * Create this year's birthday using the original month and day.
       * The original birth year does not matter for upcoming birthday sorting.
       */
      const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

      /**
       * If this year's birthday has already passed,
       * calculate the next birthday as next year.
       */
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      return { ...person, nextBirthday };
    })
    .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());
};

const Index = () => {
  /**
   * Sort birthday data once when the screen renders.
   * The first item in this array will be the closest upcoming birthday.
   */
  const upcomingBirthdays = getUpcomingBirthdays(birthdays);

  /**
   * The next birthday is displayed in the main highlighted card.
   */
  const nextBirthday = upcomingBirthdays[0];

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/*
        Soft pink overlay on top of the background image.
        This keeps the screen cute and warm while improving readability.
      */}
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* App greeting */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-textPrimary">
              Upahaar 💝
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Save the little things they mention, then turn them into
              thoughtful gifts.
            </Text>
          </View>

          {/*
            Quick action cards.
            These make the home screen feel active and useful immediately.
          */}
          <View className="flex-row gap-3 mb-6">
            <Pressable
              onPress={() => {
                router.push("/(tabs)/memory");
              }}
              className="flex-1 rounded-2xl px-4 py-4 shadow-sm border"
              style={{
                backgroundColor: SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-base font-bold text-textPrimary">
                Memory Drop 💌
              </Text>

              <Text className="text-xs text-textSecondary mt-1 leading-4">
                Jot down a sweet detail
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                router.push("/(tabs)/friends");
              }}
              className="flex-1 bg-white rounded-2xl px-4 py-4 shadow-sm border"
              style={{
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text
                className="text-base font-bold"
                style={{ color: PRIMARY_PINK }}
              >
                Add Friend 🎀
              </Text>

              <Text className="text-xs text-textSecondary mt-1 leading-4">
                Save birthdays & notes
              </Text>
            </Pressable>
          </View>

          {/*
            Highlighted card for the nearest upcoming birthday.
            This gives the user an immediate action item when opening the app.
          */}
          {nextBirthday && (
            <View
              className="bg-white rounded-3xl p-5 shadow-lg border"
              style={{
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              {/* Card label row */}
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: PRIMARY_PINK }}
                >
                  Next Birthday 🎂
                </Text>

                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: VERY_SOFT_PINK }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: PRIMARY_PINK }}
                  >
                    {getDaysUntilBirthday(nextBirthday.birthDate)} days left
                  </Text>
                </View>
              </View>

              {/* Person name */}
              <Text className="text-2xl font-bold text-textPrimary">
                {nextBirthday.name}
              </Text>

              {/* Birthday date */}
              <Text className="text-base text-textSecondary mt-1">
                {formatDate(nextBirthday.birthDate)}
              </Text>

              {/* Small helpful note to make the feature more human */}
              <View
                className="rounded-2xl px-4 py-3 mt-4"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-sm font-semibold text-textPrimary">
                  Gift reminder ✨
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  Check your saved memories and create something personal.
                </Text>
              </View>

              {/*
                Primary action.
                Routes to the gift ideas tab instead of staying as a placeholder.
              */}
              <AppButton
                title="Generate Gift Ideas"
                onPress={() => {
                  router.push("/(tabs)/gifts");
                }}
                className="mt-5"
              />
            </View>
          )}

          {/* Recent memory notes section */}
          <View className="flex-row items-center justify-between mt-8 mb-3">
            <Text className="text-lg font-semibold text-textPrimary">
              Recent Memories 💭
            </Text>

            <Pressable
              onPress={() => {
                router.push("/(tabs)/memory");
              }}
            >
              <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
                Add new
              </Text>
            </Pressable>
          </View>

          <View
            className="bg-white rounded-3xl shadow-sm overflow-hidden border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            {recentMemories.map((memory, index) => (
              <View
                key={memory.id}
                className={`px-5 py-4 ${
                  index !== recentMemories.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderBottomColor:
                    index !== recentMemories.length - 1
                      ? CARD_BORDER_COLOR
                      : "transparent",
                }}
              >
                <Text className="text-base font-bold text-textPrimary">
                  {memory.name}
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  {memory.note}
                </Text>
              </View>
            ))}
          </View>

          {/* Upcoming birthdays section header */}
          <Text className="text-lg font-semibold text-textPrimary mt-8 mb-3">
            Upcoming Birthdays 🎁
          </Text>

          {/*
            Birthday list card.
            Displays all upcoming birthdays in sorted order.
          */}
          <View
            className="bg-white rounded-3xl shadow-sm overflow-hidden border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            {upcomingBirthdays.map((person, index) => (
              <View
                key={person.id}
                className={`flex-row items-center justify-between px-5 py-4 ${
                  index !== upcomingBirthdays.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderBottomColor:
                    index !== upcomingBirthdays.length - 1
                      ? CARD_BORDER_COLOR
                      : "transparent",
                }}
              >
                {/* Left side: icon and name */}
                <View className="flex-row items-center gap-3">
                  <View
                    className="h-11 w-11 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: SOFT_PINK }}
                  >
                    <Text className="text-lg">🎀</Text>
                  </View>

                  <View>
                    <Text className="text-base font-semibold text-textPrimary">
                      {person.name}
                    </Text>

                    <Text className="text-xs text-textSecondary mt-1">
                      {getDaysUntilBirthday(person.birthDate)} days left
                    </Text>
                  </View>
                </View>

                {/* Right side: formatted birthday date */}
                <Text className="text-sm font-semibold text-textSecondary">
                  {formatDate(person.birthDate)}
                </Text>
              </View>
            ))}
          </View>

          {/*
            Secondary navigation action.
            Since this screen is inside the tabs section, it routes to the
            Friends tab instead of the authentication flow.
          */}
          <Pressable
            onPress={() => {
              router.push("/(tabs)/friends");
            }}
            className="mt-6 items-center"
          >
            <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
              View All Birthdays →
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Index;