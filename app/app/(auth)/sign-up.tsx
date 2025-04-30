import * as React from 'react'
import { View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Button, CenterCardView, Input, Text } from '~/components/ui'
import { typography } from '~/lib/typography'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <CenterCardView cardClassName='gap-4'>
        <Text style={[{ marginBottom: 20 }, typography.h2, typography.center]}>
          Verify Your Email
        </Text>
        <Input
          value={code}
          placeholder="Enter verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button onPress={onVerifyPress}>
          <Text style={typography.button}>Verify Email</Text>
        </Button>
      </CenterCardView>
    )
  }

  return (
    <CenterCardView cardClassName='gap-4'>
      <Text style={[{ marginBottom: 20 }, typography.h2, typography.center]}>
        Create Your Account
      </Text>
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
      />
      <Input
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignUpPress}>
        <Text style={typography.button}>Sign Up</Text>
      </Button>
      <View className="flex-row justify-center items-center gap-1">
        <Text style={typography.body}>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={typography.link}>Sign in</Text>
        </Link>
      </View>
    </CenterCardView>
  )
}