import { FC } from "react"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Select } from "./select"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Text } from "./text";
import { typography } from "~/lib/typography";

type Option = {
  label: string;
  value: string;
}

type SelectInputProps = {
  options: Option[];
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const SelectInput: FC<SelectInputProps> = ({ options, placeholder, label, value, onChange }) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 20,
    right: 20,
  }

  return (
    <View>
      <Text style={[typography.h3, { marginBottom: 5 }]}>{label}</Text>
      <Select defaultValue={{
        value: value,
        label: value,
      }} onValueChange={(value) => onChange(value?.value || '')}>
        <SelectTrigger>
          <Text>{value || placeholder}</Text>
        </SelectTrigger>
        <SelectContent insets={contentInsets} style={{ width: '100%' }}>
          {options.map((option) => (
            <SelectItem key={option.value} label={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  )
}
