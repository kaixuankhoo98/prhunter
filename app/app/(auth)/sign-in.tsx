import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Keyboard, View } from 'react-native'
import { Button, CenterCardView, Input, Text } from '~/components/ui'
import { typography } from '~/lib/typography'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <CenterCardView cardClassName='gap-4'>
      <Text style={[{ marginBottom: 20 }, typography.h2, typography.center]}>
        Sign In To Continue
      </Text>
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Input
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignInPress}>
        <Text style={typography.button}>Continue</Text>
      </Button>
      <View className="flex-row justify-center items-center gap-1">
        <Text style={typography.body}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={typography.link}>Sign up</Text>
        </Link>
      </View>
    </CenterCardView>
  )
}