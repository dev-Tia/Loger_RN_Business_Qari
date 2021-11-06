import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useNavigation,StackActions} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../Common/CommonRule';

function Business_Check2() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={color.red} />
      <View style={b_check2.mom}>
        <View style={b_check2.title_box}>
          <Text style={b_check2.title}>큐아리 업체 가입하기</Text>
        </View>
        <View style={b_check2.logo_box}>
          <Image
            style={b_check2.qari_img}
            source={require('../../assets/img/cat.png')}></Image>
          <Text style={b_check2.qari_txt}>
            사업자 등록증 사진을 첨부 해 주세요.
          </Text>
        </View>
        <View style={b_check2.camera_upload_box}>
          <TouchableOpacity
            style={b_check2.camera_box}
            onPress={() => {
              navigation.navigate('Camera');
            }}>
            <Image
              style={b_check2.camera}
              source={require('../../assets/img/camera.png')}></Image>
            <Text style={b_check2.camera_upload_txt}>바로찍어{'\n'}올리기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={b_check2.upload_box}
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              style={b_check2.upload}
              source={require('../../assets/img/upload.png')}></Image>
            <Text style={b_check2.camera_upload_txt}>
              사진첩에서{'\n'}올리기
            </Text>
          </TouchableOpacity>
        </View>
        <View style={b_check2.btn_box}>
          <TouchableOpacity
            style={b_check2.cancel}
            onPress={() => {
              navigation.pop();
            }}>
            <Text style={b_check2.btn_txt}>뒤로가기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[b_check2.cancel, b_check2.agree]}
            onPress={() => {
              navigation.dispatch(StackActions.replace('B_Terms'));
            }}>
            <Text style={b_check2.btn_txt}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const b_check2 = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  title_box: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: whatsize.large,
    color: color.gray,
  },
  logo_box: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  qari_img: {
    resizeMode: 'contain',
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.1,
    marginBottom: '10%',
  },

  qari_txt: {
    fontSize: whatsize.small,
    color: color.gray,
  },

  camera_upload_box: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: deviceWidth * 0.8,
    marginBottom: '5%',
  },

  upload_box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  upload: {
    resizeMode: 'contain',
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.1,
  },

  camera_box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    resizeMode: 'contain',
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.1,
  },

  camera_upload_txt: {
    fontSize: whatsize.small,
    color: color.gray,
    marginTop: '5%',
    lineHeight: deviceHeight * 0.03,
    textAlign: 'center',
  },

  btn_box: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '85%',
    marginTop: '5%',
  },

  cancel: {
    justifyContent: 'center',
    width: '35%',
    height: btn.height,
    elevation: btn.elevation,
    borderRadius: btn.radius,
    borderWidth: btn.b_width,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
  },

  agree: {
    backgroundColor: btn.btn_b,
  },
  btn_txt: {
    textAlign: 'center',
    fontSize: whatsize.medium,
    color: color.gray,
  },
});

export default Business_Check2;
