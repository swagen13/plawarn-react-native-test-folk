/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ITheme, useTheme } from 'native-base';
import AuthLoginOtpModalScreen from 'plawarn-rn/feature/auth/screens/AuthLoginOtpModalScreen';
import AuthLoginScreen from 'plawarn-rn/feature/auth/screens/AuthLoginScreen';
import OnboardScreen from 'plawarn-rn/feature/onboard/screens/OnboardScreen';
import ProfileFormNameScreen from 'plawarn-rn/feature/profile/ProfileFormNameScreen';
import ProfileFormAgeAndGenderScreen from 'plawarn-rn/feature/profile/ProfileFormAgeAndGenderScreen';
import ProfileFormImageScreen from 'plawarn-rn/feature/profile/ProfileFormImageScreen';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const theme = useTheme();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AuthNavigator initialRouteName="OnboardScreen" theme={theme} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<RootStackParamList>();

type NavigatorProps = {
  initialRouteName: string;
  theme: ITheme;
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthNavigator({ initialRouteName = 'OnboardScreen' }: NavigatorProps) {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'NotoSansThaiSemiBold',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: '#ffffff' },
      }}
      initialRouteName="OnboardScreen"
    >
      <AuthStack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ title: '', headerShown: false }}
      />
      <AuthStack.Screen
        name="AuthLoginScreen"
        component={AuthLoginScreen}
        options={{ title: '', headerShown: false }}
      />
      <AuthStack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <AuthStack.Screen
          name="AuthLoginOtpModalScreen"
          component={AuthLoginOtpModalScreen}
        />
      </AuthStack.Group>

      <AuthStack.Screen
        name="ProfileFormNameScreen"
        component={ProfileFormNameScreen}
        options={{ title: 'สร้างโปรไฟล์', headerShown: true}}
      />

      <AuthStack.Screen
        name="ProfileFormImageScreen"
        component={ProfileFormImageScreen}
        options={{ title: 'สร้างโปรไฟล์', headerShown: true}}
      />

      <AuthStack.Screen
        name="ProfileFormAgeAndGenderScreen"
        component={ProfileFormAgeAndGenderScreen}
        options={{ title: 'สร้างโปรไฟล์', headerShown: true}}
      />

    </AuthStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
