import * as React from 'react';
import { View } from 'react-native';
import { Text, Button } from '~/components/ui';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, Redirect, useRouter } from 'expo-router';

export default function Screen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <SignedIn>
        <Text>Welcome back, {user?.emailAddresses[0].emailAddress}</Text>
        <Button onPress={() => router.replace('/workout')}>
          <Text>
            Begin Workout
          </Text>
        </Button>
      </SignedIn>
      <SignedOut>
        <Redirect href='/sign-in' />
      </SignedOut>
    </View>
  );
}
