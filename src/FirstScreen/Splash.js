import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {
  font,
  color,
  deviceWidth,
  deviceHeight,
  whatsize,
} from '../Common/CommonRule';

function Splash() {
  return (
    <View style={splash.mom}>
       <Image
          style={splash.title}
          source={require('../../assets/img/qr_code_txt2.png')}></Image>
       <Image
          style={splash.sub}
          source={require('../../assets/img/qr_code_txt.png')}></Image>
     
      <TouchableOpacity style={splash.touchbox}>
        <Image
          style={splash.top_img}
          source={require('../../assets/img/cat_blue.png')}></Image>
      </TouchableOpacity>
      <Image
          style={splash.name}
          source={require('../../assets/img/qari_txt.png')}></Image>
      <Text style={{ marginBottom: 10 }}>ver. 1.0.1 (12)</Text>
{/*     
      <Image
        style={splash.bottom_img}
        source={require('../assets/img/splash_1.png')}></Image> */}
    </View>
  );
}

const splash = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    flexDirection: 'column',
  },

  touchbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  top_img: {
    resizeMode: 'contain',
    marginTop: '2%',
    marginBottom: '10%',
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },

  bottom_img: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.1,
    marginTop: '2%',
    marginBottom: '8%',
  },

  sub: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.03,
    marginBottom: '10%',
  },

  title: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.03,
    marginBottom: '5%',   
  },
  name: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.05,
    marginBottom: '1%',   
  },
});

export default Splash;