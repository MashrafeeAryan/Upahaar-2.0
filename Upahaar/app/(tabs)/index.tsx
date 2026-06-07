import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Soft Upahaar theme.
 * Calmer than using a full image background on every screen.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF7FA";
const PRIMARY_PINK = "#D81B60";

const birthdays = [
  { id: 1, name: "Alex Johnson", birthDate: "1998-09-24" },
  { id: 2, name: "Mom", birthDate: "1985-10-02" },
  { id: 3, name: "Rahim", birthDate: "2000-03-25" },
];

const recentMemories = [
  {
    id: 1,
    name: "Alex Johnson",
    note: "Wants a black desk mat.",
  },
  {
    id: 2,
    name: "Mom",
    note: "Likes simple gold jewelry.",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

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

const getUpcomingBirthdays = (data: typeof birthdays) => {
  const today = new Date();

  return data
    .map((person) => {
      const birthDate = new Date(person.birthDate);

      const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      return { ...person, nextBirthday };
    })
    .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());
};

const Index = () => {
  const upcomingBirthdays = getUpcomingBirthdays(birthdays);
  const nextBirthday = upcomingBirthdays[0];
  const previewBirthdays = upcomingBirthdays.slice(1, 3);

  return (
    <View className="flex-1" style={{ backgroundColor: VERY_SOFT_PINK }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="flex-1 px-6 pt-14"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-textPrimary">
            Upahaar
          </Text>

          <Text className="text-base text-textSecondary mt-2 leading-5">
            Remember little things. Give better gifts.
          </Text>
        </View>

        {/* Main birthday card */}
        {nextBirthday && (
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-5"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-sm font-bold"
                style={{ color: PRIMARY_PINK }}
              >
                Next birthday
              </Text>

              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: SOFT_PINK }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: PRIMARY_PINK }}
                >
                  {getDaysUntilBirthday(nextBirthday.birthDate)} days
                </Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-textPrimary">
              {nextBirthday.name}
            </Text>

            <Text className="text-base text-textSecondary mt-1">
              {formatDate(nextBirthday.birthDate)}
            </Text>

            <AppButton
              title="Find Gift Ideas"
              onPress={() => {
                router.push("/(tabs)/gifts");
              }}
              className="mt-5"
            />
          </View>
        )}

        {/* Quick actions */}
        <View className="flex-row gap-3 mb-6">
          <Pressable
            onPress={() => {
              router.push("/(tabs)/memory");
            }}
            className="flex-1 rounded-3xl p-4 border"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-base font-bold text-textPrimary">
              Memory Drop
            </Text>

            <Text className="text-sm text-textSecondary mt-1 leading-5">
              Save a quick note
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              router.push("/friend/add");
            }}
            className="flex-1 bg-white rounded-3xl p-4 border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-base font-bold text-textPrimary">
              Add Friend
            </Text>

            <Text className="text-sm text-textSecondary mt-1 leading-5">
              Save a birthday
            </Text>
          </Pressable>
        </View>

        {/* Recent memory */}
        <View
          className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
          style={{
            borderColor: CARD_BORDER_COLOR,
            borderWidth: CARD_BORDER_WIDTH,
          }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-textPrimary">
              Recent memories
            </Text>

            <Pressable
              onPress={() => {
                router.push("/(tabs)/memory");
              }}
            >
              <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
                Add
              </Text>
            </Pressable>
          </View>

          <View className="gap-3">
            {recentMemories.map((memory) => (
              <View
                key={memory.id}
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  {memory.name}
                </Text>

                <Text className="text-sm text-textSecondary mt-1">
                  {memory.note}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming birthdays */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold text-textPrimary">
            Coming up
          </Text>

          <Pressable
            onPress={() => {
              router.push("/(tabs)/friends");
            }}
          >
            <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
              View all
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
          {previewBirthdays.map((person, index) => (
            <View
              key={person.id}
              className={`flex-row items-center justify-between px-5 py-4 ${
                index !== previewBirthdays.length - 1 ? "border-b" : ""
              }`}
              style={{
                borderBottomColor:
                  index !== previewBirthdays.length - 1
                    ? CARD_BORDER_COLOR
                    : "transparent",
              }}
            >
              <View>
                <Text className="text-base font-semibold text-textPrimary">
                  {person.name}
                </Text>

                <Text className="text-xs text-textSecondary mt-1">
                  {getDaysUntilBirthday(person.birthDate)} days left
                </Text>
              </View>

              <Text className="text-sm font-semibold text-textSecondary">
                {formatDate(person.birthDate)}
              </Text>
            </View>
          ))}
        </View>

        {/* Widget preview */}
        <Pressable
          onPress={() => {
            router.push("/widget-preview");
          }}
          className="mt-6 rounded-3xl px-5 py-4 border"
          style={{
            backgroundColor: SOFT_PINK,
            borderColor: CARD_BORDER_COLOR,
            borderWidth: CARD_BORDER_WIDTH,
          }}
        >
          <Text className="text-base font-bold text-textPrimary">
            Try quick capture
          </Text>

          <Text className="text-sm text-textSecondary mt-1">
            Preview the Memory Drop widget idea.
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Index;