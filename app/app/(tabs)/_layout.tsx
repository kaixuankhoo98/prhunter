import { Tabs } from 'expo-router';
import { Dumbbell } from '~/lib/icons/Dumbbell';
import { Home } from '~/lib/icons/Home';
import { Settings } from '~/lib/icons/Settings';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="workout" 
        options={{
          title: 'New Workout',
          tabBarIcon: ({ color }) => <Dumbbell color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
} 