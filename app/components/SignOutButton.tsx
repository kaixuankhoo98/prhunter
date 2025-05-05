import React, { FC, useState } from 'react'
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogOverlay } from './ui/dialog'
import { View } from 'react-native'

export const SignOutButton: FC = () => {
  const { signOut } = useClerk();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View>
      <Button onPress={() => setDialogOpen(true)}>
        <Text>Sign out</Text>
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogOverlay>
          <DialogContent className="w-[90%] max-w-md m-0">
            <DialogHeader>
              <DialogTitle>Sign out</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to sign out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onPress={() => setDialogOpen(false)}>
                <Text>Cancel</Text>
              </Button>
              <Button variant="destructive" onPress={handleSignOut}>
                <Text>Sign out</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </View>
  )
}