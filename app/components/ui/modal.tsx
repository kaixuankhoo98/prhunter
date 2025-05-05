import { FC, ReactNode } from 'react';
import { Modal as RNModal, View, Pressable } from 'react-native';
import { Text } from './text';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ 
  visible, 
  onClose, 
  title, 
  children 
}) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      statusBarTranslucent
    >
      <View className="flex-1 bg-background">
        <View className="flex-row justify-between items-center p-4 border-b border-border">
          <Text className="text-xl font-semibold text-foreground">{title}</Text>
          <Pressable 
            onPress={onClose}
            className="px-2 py-1 rounded-md active:opacity-70"
          >
            <Text className="text-base text-muted-foreground">Cancel</Text>
          </Pressable>
        </View>
        <View className="flex-1">
          {children}
        </View>
      </View>
    </RNModal>
  );
};