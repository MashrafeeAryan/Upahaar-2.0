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
      className={`rounded-lg py-4 items-center ${
        disabled || loading ? "bg-gray-300" : "bg-primary"
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
