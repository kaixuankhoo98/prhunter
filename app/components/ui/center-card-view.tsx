import * as React from 'react';
import { View } from 'react-native';
import { Card } from './card';
import { cn } from '~/lib/utils';

interface CenterCardViewProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

export function CenterCardView({ children, className, cardClassName }: CenterCardViewProps) {
  return (
    <View className={cn('flex-1 items-center justify-center p-4', className)}>
      <Card 
        className={cn(
          'w-[92%] h-[85%] rounded-xl bg-card p-6 shadow-xl shadow-foreground/10', 
          'border border-border/50',
          'dark:shadow-[0_0_25px_rgba(255,255,255,0.15)]',
          cardClassName
        )}>
        {children}
      </Card>
    </View>
  );
} 