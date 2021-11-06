import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Fragment,
  View,
  Text,
  Linking,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Dimensions} from 'react-native';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
} from '../src/Common/CommonRule';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {Axios_First, Axios_Second, Axios_Third} from './Axios.js';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';

const QRCodeScreen = (props) => {
  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [axiosValue, setAxiosValue] = useState('');
  const scanner = React.useRef('');
  //https://qari-check.herokuapp.com/

  const onSuccess = (e) => {
    const check = e.data.indexOf('http://pungryu.cafe24app.com/qari');
    console.log('스캔된 전체 코드 : ' + e.data);
    console.log('로거주소 확인부분 : ' + check);

    setResult(e);
    setScan(false);
    setScanResult(true);

    if (check === 0) {
      console.log('로거주소 확인 되었습니다');
      //alert(e.data);
      //할일을 여기에 적기
      //다시 원래대로 돌리기
      setScanResult(false);
      Axios_Third({link: e.data, setAxiosValue: setAxiosValue});
    } else {
      setResult(e);
      setScan(false);
      setScanResult(false);
    }
  };

  const activeQR = () => {
    setScan(true);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  // const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.'
  const desccription = 'Qari - Loger';

  useEffect(() => {
    if (axiosValue !== '') {
      props.navigation.pop();
      props.navigation.push('Personal_Exit', {time: axiosValue});
    }
  }, [axiosValue]);

  return (
    <View style={styles.container}>
      <View>
        {/*<StatusBar barStyle="dark-content" />*/}
        {/* <Text style={styles.textTitle}>
          Welcome To React-Native QR Code Tutorial !
        </Text> */}
        {!scan && !scanResult && (
          <View style={styles.cardView}>
            <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>
                일치하는 매장이 없습니다.{'\n'}QR코드를 확인해 주세요
              </Text>
              {/* <Text>{JSON.stringify(axiosValue)}</Text> */}
            </TouchableOpacity>
          </View>
        )}

        {/* {scanResult &&
        <Fragment>
          <Text style={styles.textTitle1}>Result !</Text>
          <View style={scanResult ? styles.scanCardView : styles.cardView}>
            <Text>Type : {result.type}</Text>
            <Text>Result : {result.data}</Text>
            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
            <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
            </TouchableOpacity>

          </View>
        </Fragment>
        } */}

        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => {
              scanner.current = node;
            }}
            onRead={onSuccess}
            cameraStyle={{height: deviceHeight * 0.8}}
            markerStyle={{borderColor: 'transparent'}}
            /*  topContent={
              <Text style={styles.centerText}>
                Go to
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
                on your computer and scan the QR code to test.
              </Text>
            } */
            /*  bottomContent={
              <View>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => scanner.current.reactivate()}>
                  <Text style={styles.buttonTextStyle}>뭔가요?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => setScan(false)}>
                  <Text style={styles.buttonTextStyle}>스캐너 정지!</Text>
                </TouchableOpacity>
              </View>
            } */
          />
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          width: deviceWidth,
          height: deviceHeight * 0.1,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.push('Business_Main');
          }}
          style={{
            borderRadius: 14,
            backgroundColor: 'white',
            width: deviceHeight * 0.1,
            height: deviceHeight * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <View
            style={{
              borderWidth: deviceHeight * 0.005,
              borderColor: 'black',
              borderRadius: 50,
              //backgroundColor: 'black',
              width: deviceHeight * 0.075,
              height: deviceHeight * 0.075,
              alignItems: 'center',
              justifyContent: 'center',
            }}> */}
            <Icon name="document-text-outline" size={40} color={color.red} />
          {/* </View> */}
          <Text style={styles.recTxt}>기록보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    height: '100%',
    width: '100%',
  },

  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99003d',
  },

  recTxt: {
    fontSize: 15,
    fontFamily: font.font_a,
    fontWeight: 'bold',
    color: color.black,
    marginTop: '10%'
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black',
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    /*  borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10, */
    backgroundColor: 'black',
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonScan: {
    width: 42,
  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 50,
  },

  highlight: {
    fontWeight: '700',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: '#ffffff',
    marginTop: 32,

    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: deviceHeight * 0.025,
  },
});
