import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { ThemeToggle } from '~/components/ThemeToggle'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Welcome!",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Good Choice...",
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  )
}