import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Card } from '~/components/ui';
import { Timer } from '~/lib/icons/Timer';
import { typography } from '~/lib/typography';

interface TimeCounterProps {
  startTime: string;
  onTimeUpdate?: (seconds: number) => void;
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const TimeCounter: FC<TimeCounterProps> = ({ startTime, onTimeUpdate }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000);
      setElapsedSeconds(elapsed);
      onTimeUpdate?.(elapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, onTimeUpdate]);

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    }}>
      <Card style={{ 
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10 
      }}>
        <Timer />
        <Text style={[typography.bodyLarge]}>
          {formatTime(elapsedSeconds)}
        </Text>
      </Card>
    </View>
  );
}; 