import ActionButton from 'react-native-action-button';
import {LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deviceHeight, color, deviceWidth} from './CommonRule';
import {StackActions} from '@react-navigation/native';
import {NavigationActions} from 'react-navigation';

import {LogOut, GetLogin} from '../../Function/Async';
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.',
  'Warning: componentWillReceiveProps has been renamed,',
]);
export default Button = () => {
  const navigation = useNavigation();

  // 혜림추가: 버튼클릭시 float버튼 사이즈 변경 ->
  const [float, setFloat] = useState(false);
  const [loginResult, GetLoginResult] = useState(0);
  const CheckLogin = async () => {
    GetLoginResult(await GetLogin());
  };
  useEffect(() => {
    CheckLogin();
  }, []);
  var wid = '25%';
  var hei = '20%';
  if (float === true) {
    wid = '100%';
    hei = '100%';
  }

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        right: 0,
        width: wid,
        height: hei,
      }}>
      <ActionButton
        onPress={() => setFloat(!float)}
        buttonColor={color.red}
        bgColor="#ffffffcc"
        useNativeFeedback={true}
        backgroundTappable={true}
        activeOpacity={0.3}
        hideShadow={false}>
        {/* <ActionButton.Item
          textContainerStyle={{backgroundColor: 'transparent', height: deviceHeight * 0.04}}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="QR코드 저장"
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('Qr_Print'),
            );
          }}>
          <Icon name="qr-code" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}

        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="매장 목록"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Business_List_Demo'));
          }}>
          <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="QR코드 확인하기"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Business_Web'}],
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Business_Web'}],
            });
            //navigation.dispatch(StackActions.replace('Business_Web'));
          }}>
          <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        {loginResult && loginResult[1] == 1 && (
          <ActionButton.Item
            textContainerStyle={{
              backgroundColor: 'transparent',
              height: deviceHeight * 0.04,
            }}
            hideLabelShadow={true}
            size={deviceHeight * 0.055}
            textStyle={{
              fontWeight: 'bold',
              fontSize: deviceHeight * 0.02,
            }}
            buttonColor={color.red}
            title="직원 관리"
            onPress={() => {
              navigation.dispatch(StackActions.replace('Staff'));
            }}>
            <Icon name="reader-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        )}
        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="로그아웃"
          onPress={() => {
            LogOut();
            setFloat(!float);
            //navigation.pop();
            navigation.reset({
              index: 0,
              routes: [{name: 'Business_Login'}],
            });
            //navigation.dispatch(StackActions.replace('Business_Login'));
          }}>
          <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        {/* <ActionButton.Item
          textContainerStyle={{backgroundColor: 'transparent', height: deviceHeight * 0.04}}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="방문 기록"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Records'));
          }}>
          <Icon name="person-add-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: deviceHeight * 0.03,
    width: '100%',
    /*  height: '100%', */
    color: 'white',
  },
});
