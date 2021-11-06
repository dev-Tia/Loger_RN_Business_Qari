import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import Business_Qr from './Business_Qr';
import Business_List_Demo from './BusinessList_Demo';
import Records from './Records';
import Personal_Records from '../Personal/Personal_Records';
import Terms from '../FirstScreen/Terms';

import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../Common/CommonRule';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tab_A = () => {
  return (
    <>
      <Personal_Records></Personal_Records>
    </>
  );
};
const Tab_B = ({navigation}) => {
  var start = 'Business_List_Demo';
  useEffect(() => {
    navigation.addListener('tabPress', () => {
      navigation.navigate(start);
    });
  }, [navigation]);
  return (
    <>
      <Stack.Navigator
        initialRouteName={start}
        screenOptions={{
          animationEnabled: false,
        }}>
        <Stack.Screen
          name="Business_List_Demo"
          component={Business_List_Demo}
        />

        <Stack.Screen name="Records" component={Records} />
      </Stack.Navigator>
    </>
  );
};
const Tab_C = () => {
  return (
    <>
      <Business_Qr />
    </>
  );
};
const Tab_D = () => {
  return (
    <>
      <Terms />
    </>
  );
};

function Business_Main() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={color.red} />
      <View style={{flex: 1}}>
        <Tab.Navigator
          backBehavior="initialRoute"
          detachPreviousScreen={true}
          tabBarOptions={{
            labelStyle: {
              color: color.black,
              fontSize: 10,
            },
            showLabel: true,
            style: {
              backgroundColor: 'white',
              height: deviceHeight * 0.08,
              paddingBottom: deviceHeight * 0.01,
            },
            keyboardHidesTabBar: true,
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              let iconName;
              if (route.name === '개인기록') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === '업체목록') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'QR재발급') {
                iconName = focused ? 'qr-code' : 'qr-code-outline';
              } else if (route.name === '약관보기') {
                iconName = focused ? 'receipt' : 'receipt-outline';
              }
              return <Icon name={iconName} size={size} color={color.red} />;
            },
            //notifications-outline 알림 아이콘
          })}>
          <Tab.Screen name="개인기록" component={Tab_A} 
            options={{
              title: '개인기록',
              headerStyle: {backgroundColor: color.red},
            }}
          />
          <Tab.Screen name="업체목록" component={Tab_B} />
          <Tab.Screen name="QR재발급" component={Tab_C} />
          <Tab.Screen name="약관보기" component={Tab_D} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const tab_a = StyleSheet.create({
  mom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  line: {
    marginTop: '3%',
    backgroundColor: color.gray,
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.001,
  },

  top: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginTop: deviceHeight * 0.02,
    width: deviceWidth * 0.8,
  },

  title: {
    fontSize: whatsize.medium,
    color: color.black,
  },

  contents: {
    flexDirection: 'column',
    width: deviceWidth * 0.88,
    marginTop: '5%',
  },

  list_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  list: {
    textAlign: 'center',
    fontSize: font.showLabel,
    marginBottom: '5%',
  },
});

export default Business_Main;
