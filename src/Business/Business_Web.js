import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  InteractionManager,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Float_Button from '../Common/Float_Button';
import {
  deviceHeight,
  deviceWidth,
  color,
  whatsize,
  btn,
} from '../Common/CommonRule';
import QRCode from 'react-native-qrcode-generator';
import ViewShot, {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import SignMain from '../Common/TopSign/SignMain';
import Snackbar from 'react-native-snackbar';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture({uri}) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  CameraRoll.save(uri);
  Snackbar.show({
    text: 'QR코드 저장 완료',
    backgroundColor: '#2A5FC1',
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: '확인',
      textColor: 'white',
      onPress: () => {
        /* Do something. */
      },
    },
  });
}

const Web_View = () => {
  var FlatData = [0];
  const [Ref, setRef] = useState(null);
  const [uri, setUri] = useState('');
  const [qrUrl, setQrUrl] = useState('http://qari.cafe24app.com/MQRXE');
  const [imageSwitch, setImageSwitch] = useState(false);
  useEffect(() => {}, [uri]);

  const backgroundChange = () => {
    setImageSwitch(!imageSwitch);
  };

  const onImageLoad = ({check}) => {
    captureRef(Ref, {
      width: 500,
      format: 'jpg',
      quality: 1,
    }).then(
      (uri) => {
        console.log(uri);
        if (uri == undefined) {
          onImageLoad();
        } else {
          setUri(uri);
          setTimeout(() => {
            savePicture({uri: uri});
            if (check == 'ok') {
              onShare({uri: uri});
            }
          }, 500);
        }
      },
      (error) => console.error('Oops, snapshot failed', error),
    );
  };

  const onShare = async ({uri}) => {
    try {
      const result = await Share.open({
        url: uri,
      });
      //console.log(result.action);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('취호떄림!');
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/*  <WebView
        source={{uri: 'http://qari.cafe24app.com/makeQR?nano_id=MQRXE'}}
      /> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <SignMain />
        <FlatList
          style={{height: deviceHeight}}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          data={FlatData}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={() => {
            return <></>;
          }}
          renderItem={() => {
            return (
              <View style={{paddingBottom: deviceHeight * 0.1}}>
                <View
                  style={{
                    marginTop: deviceHeight * 0.05,
                    width: deviceWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ViewShot
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    ref={(data) => {
                      setRef(data);
                    }}>
                    {imageSwitch ? (
                      <Image
                        style={{
                          backgroundColor: 'white',
                          width: deviceWidth * 0.702,
                          height: deviceWidth * 0.9,
                          resizeMode: 'cover',
                        }}
                        source={require('../../assets/img/boxA.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          backgroundColor: 'white',
                          width: deviceWidth * 0.702,
                          height: deviceWidth * 0.9,
                          resizeMode: 'cover',
                        }}
                        source={require('../../assets/img/boxB.png')}
                      />
                    )}
                    <View
                      style={{
                        position: 'absolute',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        style={{
                          fontWeight: 'bold',
                          fontSize: whatsize.medium,
                          paddingBottom: deviceHeight * 0.03,
                          marginTop: -deviceHeight * 0.05,
                        }}
                      />
                      <QRCode
                        value={'http://qari.cafe24app.com/MQRXE'}
                        size={deviceWidth * 0.37}
                        bgColor="black"
                        fgColor="white"
                      />
                    </View>
                  </ViewShot>
                </View>
                <View style={{width: deviceWidth, alignItems: 'center'}}>
                  <Text
                    style={{
                      margin: deviceHeight * 0.02,
                      fontSize: whatsize.medium,
                      fontWeight: 'bold',
                    }}>
                    여기에 매장이름 올거에요
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2A5FC1',
                      width: deviceWidth * 0.7,
                      height: deviceWidth * 0.12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: btn.b_color,
                    }}
                    onPress={() => {
                      backgroundChange();
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: whatsize.small,
                        color: color.white,
                      }}>
                      QR액자 변경하기
                    </Text>
                  </TouchableOpacity>
                  <View style={{height: deviceHeight * 0.02}} />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2A5FC1',
                      width: deviceWidth * 0.7,
                      height: deviceWidth * 0.12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: btn.b_color,
                    }}
                    onPress={() => {
                      onImageLoad({check: 'no'});
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: whatsize.small,
                        color: color.white,
                      }}>
                      저장하기
                    </Text>
                  </TouchableOpacity>
                  <View style={{height: deviceHeight * 0.02}} />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2A5FC1',
                      width: deviceWidth * 0.7,
                      height: deviceWidth * 0.12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: btn.b_color,
                    }}
                    onPress={() => {
                      onImageLoad({check: 'ok'});
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: whatsize.small,
                        color: color.white,
                      }}>
                      공유하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}></FlatList>

        {/*    {uri !== '' && (
          <View
            style={{
              width: 200,
              height: 200,
              //backgroundColor: 'blue',
            }}>
            <Image
              style={{
                backgroundColor: 'white',
                width: 200,
                height: 200,
                resizeMode: 'center',
              }}
              source={{uri: uri}}
            />
          </View>
        )} */}
        <Float_Button />
      </View>
    </View>
  );
};

export default Web_View;
