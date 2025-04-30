import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui';
import { useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Text>Welcome {user?.emailAddresses[0].emailAddress}</Text>
    </View>
  );
} 