import { SymbolView } from "expo-symbols";
// or Ionicons / MaterialIcons under the hood

export function IconSymbol({ name, size, color }) {
  return <SymbolView name={name} size={size} color={color} />;
}
