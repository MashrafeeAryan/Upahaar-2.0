import { Pressable, Text, ActivityIndicator } from "react-native";

export default function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}) {
  return (
    //Using pressable because it's more easy to use than touchableopacity
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-2xl py-3 items-center ${
        disabled || loading ? "bg-pink-200" : "bg-pink-300"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-base font-semibold">{title}</Text>
      )}
    </Pressable>
  );
}
