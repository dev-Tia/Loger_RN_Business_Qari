import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {font, color, btn, whatsize} from './src/Common/CommonRule';

import Splash from './src/FirstScreen/Splash';
import Terms from './src/FirstScreen/Terms';
import Qr_Print from './src/Business/Qr_Print';
import Business_List_Demo from './src/Business/BusinessList_Demo';
import Business_Login from './src/Business/Business_Login';
import Business_Web from './src/Business/Business_Web';
import Check from './src/Business/Check';
import Staff from './src/Business/Staff';
import Business_Check2 from './src/Business/Business_Re_Check2';
import Records from './src/Business/Records';
// import Business_Main from './src/Business/Business_Main';
import SignMain from './src/Common/TopSign/SignMain';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SetUrl, GetUrl, GetLogin, GetUser, SetCorona} from './Function/Async';
import {Notice_Axios} from './Function/Axios';
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [UserResult, GetLoginResult] = useState('');
  const [User, setUser] = useState('');
  const CheckLogin = async () => {
    GetLoginResult(await GetLogin());
    setUser(await GetUser());
  };
  useEffect(() => {
    CheckLogin();
    Notice_Axios();

    setTimeout(() => {
      setLoading(true);
    }, 2000);
  },[]);

  useEffect(() => {
    SetUrl();
    SetCorona();
    setTimeout(() => {
      GetUrl();
    }, 500);
  }, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#2A5FC1', color: 'white'}} />

      <StatusBar barStyle="light-content" backgroundColor={'#2a5fc1'} />

      {!isLoading ? (
        <Splash />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              UserResult[0] == 'false'
                ? !User.store_crn
                  ? 'Business_Login'
                  : 'Business_Login'
                : 'Business_List_Demo'
            }
            screenOptions={{animationEnabled: false}}>
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Check"
              component={Check}
              options={{
                title: '업체 가입 하기',
                headerTitleStyle: {
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: whatsize.RFmedium,
                },
                headerShown: false,
                headerStyle: {backgroundColor: color.blue},
              }}
            />
            <Stack.Screen
              name="Business_Login"
              component={Business_Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Qr_Print"
              component={Qr_Print}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Business_List_Demo"
              component={Business_List_Demo}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Business_Web"
              component={Business_Web}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Records"
              component={Records}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignMain"
              component={SignMain}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Staff"
              component={Staff}
              options={{
                title: '알바 관리',
                headerTitleStyle: {
                  color: 'white',
                  fontSize: whatsize.RFmedium,
                },
                headerShown: false,
                headerStyle: {backgroundColor: color.blue},
              }}
            />

            {/* <Stack.Screen
              name="Business_Check2"
              component={Business_Check2}
              options={{
                title: '업체 가입 하기',
                headerTitleStyle: {fontFamily: font.font_a, fontSize: font.m},
                headerStyle: {backgroundColor: color.blue},
              }}
            /> */}
            {/* <Stack.Screen name="Business_Main" component={Business_Main} 
            options={{
              title: '큐아리 기록 보기',
              headerTintColor: 'white',
              headerTitleStyle: {color: color.white, fontWeight:'bold', fontFamily: font.font_a, fontSize: font.m},
              headerStyle: {backgroundColor: color.red},
            }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
