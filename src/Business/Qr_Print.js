import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  font,
  color,
  deviceHeight,
  deviceWidth,
  btn,
  whatsize,
} from '../Common/CommonRule';
import SignMain from '../Common/TopSign/SignMain';
import Float_Button from '../Common/Float_Button';
function Qr_Print() {

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <SignMain></SignMain>
      <View style={b_qr.mom}>
        <Text style={b_qr.txt}>QR 코드가 발급 되었습니다</Text>
        <Image
          style={b_qr.img}
          source={require('../../assets/img/qr_icon.png')}></Image>
        <View style={b_qr.bottom_box}>
          <TouchableOpacity
            style={b_qr.print_btn1}
            onPress={() => {
              navigation.push('Staff');
            }}>
            <Text style={[b_qr.btn__txt, {color: 'black'}]}>앨범에 저장</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[b_qr.print_btn2, {backgroundColor:color.red}]}
            onPress={() => {
              navigation.push('Business_List_Demo');
              
            }}>
            <Text style={b_qr.btn_txt}>프린트 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Float_Button />
    </View>
  );
}

const b_qr = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  txt: {
    textAlign: 'center',
    marginTop: whatsize.small,
    width: deviceWidth * 0.8,
    textAlign:'center',
    color: color.gray,
    fontWeight: 'bold',
    fontSize: whatsize.xlarge,
  },

  img: {
    marginTop: whatsize.xlarge,
    maxHeight: deviceWidth *0.4,
    width: whatsize.xlarge * 10,    
    resizeMode: 'contain',
  },

  bottom_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: deviceWidth  *0.7,
    height: deviceHeight * 0.08,
    marginTop: deviceHeight * 0.05,
    marginBottom: whatsize.xlarge * 1.5,   
  },

  print_btn1: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width:0,
      height:6,
    },
    shadowOpacity: 0.37,
    shadowRadius:7.49,
    elevation: 1,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    width: deviceWidth * 0.3
  },

  print_btn2: {
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset:{
    //   width:0,
    //   height:6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius:7.49,
    // elevation: 12,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    width: deviceWidth * 0.3
  },

  btn_txt: {
    textAlign: 'center',
    fontSize: whatsize.small,
    color: color.white,
  },
});

export default Qr_Print;
