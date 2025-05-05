import { FC } from 'react';
import { useColorScheme, View } from 'react-native';
import { Button, Text } from '~/components/ui';
import { NAV_THEME } from '~/lib/constants';

interface WorkoutFooterProps {
  onDiscard: () => void;
  onFinish: () => void;
}

export const WorkoutFooter: FC<WorkoutFooterProps> = ({ onDiscard, onFinish }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = NAV_THEME[colorScheme ?? 'light'].background;

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: 5,
      backgroundColor: backgroundColor,
    }}>
      <View style={{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
      }}>
        <Button
          variant="outline"
          onPress={onDiscard}
          className="flex-1"
        >
          <Text>Discard Workout</Text>
        </Button>
        <Button
          onPress={onFinish}
          className="flex-1"
        >
          <Text>Finish Workout</Text>
        </Button>
      </View>
    </View>
  );
}; 