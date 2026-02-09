import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta el título "Index" de arriba
        tabBarStyle: { 
          display: 'none' // Oculta la barra de pestañas de abajo
        }, 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
        }}
      />
      {/* Esto oculta la pestaña 'explore' si no la vas a usar */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}