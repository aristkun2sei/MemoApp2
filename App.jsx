import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import firebase from 'firebase';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { firebaseConfig } from './env';

require('firebase/firestore');

if(firebase.apps.length === 0){//初期化されているファイルが0であれば実行される。初期化を最初だけ行う。
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName = 'SingUp'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#467FD3',
        },
        headerTitleStyle: {
          color: '#FFFFFF',
        },
        headerTitle: 'Memo App',
        headerTintColor: '#ffffff',
        headerBackTitle: 'Back',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,//iosとAndroidどちらも横スライド遷移にするために必要
      }}
      >
        <Stack.Screen name='MemoList' component={MemoListScreen} />
        <Stack.Screen name='MemoDetail' component={MemoDetailScreen} />
        <Stack.Screen name='MemoEdit' component={MemoEditScreen} />
        <Stack.Screen name='MemoCreate' component={MemoCreateScreen} />
        <Stack.Screen
          name='LogIn'
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


