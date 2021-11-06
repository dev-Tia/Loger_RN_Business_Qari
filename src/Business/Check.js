import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Button,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../Common/CommonRule';
import {SetStore} from '../../Function/Async';
import {Axios_Join, Axios_OverLap} from '../../Function/Axios';
import {StackActions, useNavigation} from '@react-navigation/native';
import showPicker from '../../Function/ImagePicker';
import Ocr from '../../Function/Ocr';
import Modal from 'react-native-modal';
import ocr_result from '../../Function/ocrResult';
import Snackbar from 'react-native-snackbar';
import Postcode from 'react-native-daum-postcode';

function Check() {
  const navigation = useNavigation();

  //? imagePicker 값
  const [imageUri, setimageUri] = useState(null);

  //? Textinput 값
  const [storeName, setStoreName] = useState('');
  const [numberA, setNumberA] = useState('');
  const [numberB, setNumberB] = useState('');
  const [numberC, setNumberC] = useState('');
  const [numberD, setNumberD] = useState('');
  const [Pw, setPw] = useState('');
  const [Id, setId] = useState('');
  const [PwCheck, setPwCheck] = useState('');

  //? Textinput focus를 위한 Ref
  const [RefD, setRefD] = useState(null);
  const [refPw, setRefPw] = useState(null);
  const [refPw2, setRefPw2] = useState(null);
  const [refId, setRefId] = useState(null);

  //? Textinput focus를 확인하는 bool
  const [focusStoreName, setFocusStoreName] = useState('');
  const [focusId, setFocusId] = useState(false);
  const [focusTextD, setFocusTextD] = useState(false);
  const [focusPw, setFocusPw] = useState(false);
  const [focusPwCheck, setFocusPwCheck] = useState(false);

  //? 사업자번호 직접입력 선택 여부
  const [selfInput, setSelfInput] = useState(false);
  const [numD, setNumD] = useState('');
  //?모달 관련
  const [inputModal, setInputModal] = useState(false);

  //? post 관련
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [postResult, setPostResult] = useState('');
  const [setResult, getResult] = useState('');
  const [setAllText, getAllText] = useState('');

  useEffect(() => {
    var text = '';
    if (setResult !== '') {
      for (var i = 0; i < setResult.images[0].fields.length; i++) {
        text = text + setResult.images[0].fields[i].inferText;
        //console.log(text);
      } //(\d{2})(\d{5})$
      var match = text.match(/[0-9]{3}[-][0-9]{2}[-][0-9]{5}/);
      if (match !== null) {
        console.log('match ====', match[0]);
        console.log('match ====', match[0].slice(0, 3));
        console.log('match ====', match[0].slice(4, 6));
        console.log('match ====', match[0].slice(7, 12));
        setNumD(match[0]);
        setNumberA(match[0].slice(0, 3));
        setNumberB(match[0].slice(4, 6));
        setNumberC(match[0].slice(7, 12));
        setNumberD(
          match[0].slice(0, 3) + match[0].slice(4, 6) + match[0].slice(7, 12),
        );
      } else {
        Snackbar.show({
          text: '사업자 등록증을 다시 찍어 주세요.',
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
      getAllText(text);
      console.log(text);
    }
  }, [setResult]);

  const switchVisible = () => {
    setInputModal(!inputModal);
  };

  const switchPostVisible = () => {
    setPostModalVisible(!postModalVisible);
  };

  useEffect(() => {
    if (imageUri !== null) {
      Ocr({imageUri: imageUri, getResult: getResult});
    }
  }, [imageUri]);
  //? OCR 이미지 + 선택 + 확인
  const Image_Pick_Post = () => {
    return (
      <View style={{alignItems: 'center'}}>
        {imageUri ? (
          <View style={styles.image_view}>
            <Image source={{uri: imageUri.uri}} style={styles.image} />
          </View>
        ) : (
          <View style={styles.no_image}>
            <Text
              style={{
                fontSize: whatsize.mini,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              사업자 등록증을 {'\n'}업로드 해 주세요
            </Text>
          </View>
        )}
        <View style={b_check.BottomBox}>
          <TouchableOpacity
            style={b_check.terms_btn}
            onPress={() => {
              showPicker({setimageUri: setimageUri});
            }}>
            <Text style={[b_check.btn_txt, {color: 'black'}]}>
              이미지 선택하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //? 사업자 등록증 TextInput 3개
  const Input_Box_A = () => {
    return (
      <View>
        <View style={{width: '80%'}}>
          <View style={styles.input_view}>
            {/*  <Text style={styles.input_Id_Text}>사업자번호</Text> */}

            <Text style={[styles.input_A, {borderColor: 'black'}]}>
              {numberA}
            </Text>
            <Text style={styles.input_bar}>-</Text>
            <Text style={[styles.input_B, {borderColor: 'black'}]}>
              {numberB}
            </Text>
            <Text style={styles.input_bar}>-</Text>
            <Text style={[styles.input_C, {borderColor: 'black'}]}>
              {numberC}
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12,
                borderRadius: btn.radius,
                borderColor: btn.b_color,
                marginTop: deviceHeight * 0.01,
                width: '30%',
                //width: deviceWidth * 0.3,
                height: '50%',
                backgroundColor: '#2A5FC1',
              }}
              onPress={() => {
                switchVisible();
              }}>
              <Text style={[b_check.btn_txt, {color: 'white'}]}>직접 입력</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  function CheckValue() {
    if (
      Pw.length == 6 &&
      PwCheck.length == 6 &&
      PwCheck == Pw &&
      numberA.length == 3 &&
      numberB.length == 2 &&
      numberC.length == 5 &&
      imageUri !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  //? 회원가입 버튼 클릭시 스낵바 함수
  function CheckAlert() {
    if (!(Pw.length == 6 && PwCheck.length == 6 && PwCheck == Pw)) {
      Snackbar.show({
        text: '비밀번호를 다시 확인 해 주세요',
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
    } else if (
      !(numberA.length == 3 && numberB.length == 2 && numberC.length == 5)
    ) {
      Snackbar.show({
        text: '사업자 번호를 확인 해 주세요',
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
    } else if (imageUri == null) {
      Snackbar.show({
        text: '업로드한 이미지를 확인 해 주세요',
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
    } else {
      // 보내는 데이터 formData에 추가해서 formData통째로 보내야함!! -> 이미지 보낼때 다시 해보기
      var data = '';
      async function CheckOverLap() {
        data = await Axios_OverLap({data: {store_crn: numberD, id: Id}});
        if (data == false) {
          var crn_check = 0;
          if (numD == numberA + '-' + numberB + '-' + numberC) {
            crn_check = 1;
          }
          let formData = new FormData();
          formData.append('store_img', {
            uri: imageUri.uri,
            name: numberD + '.jpg',
            type: 'image/jpg',
          });
          formData.append('store_crn', numberD);
          formData.append('store_name', storeName);
          formData.append('id', Id);
          formData.append('password', PwCheck);
          formData.append('address', JSON.stringify(postResult));
          formData.append('ocr', setAllText);
          formData.append('crn_check', crn_check);

          Axios_Join({formData: formData, navigation: navigation});
        } else {
          Snackbar.show({
            text: '이미 사용중인 아이디 입니다',
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
      }

      CheckOverLap();
    }
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <StatusBar barStyle="light-content" backgroundColor={'#2A5FC1'} />

          <View style={b_check.mom}>
            <View style={b_check.input_title}>
              <Image
                style={b_check.TopImg}
                source={require('../../assets/img/nameCard_icon.png')}></Image>
              <Text style={b_check.TopTitle}>회원 가입</Text>
            </View>
            <View style={{width: '100%'}}>
              <View style={b_check.input_sub_title}>
                <Text style={styles.input_Id_Text}>업체이름</Text>
                <TextInput
                  style={[
                    styles.input_Id,
                    {borderColor: focusStoreName ? '#2A5FC1' : 'black'},
                  ]}
                  onFocus={() => {
                    setFocusStoreName(true);
                  }}
                  onBlur={() => {
                    setFocusStoreName(false);
                  }}
                  onSubmitEditing={() => {
                    refId.focus();
                  }}
                  onChangeText={(text) => {
                    setStoreName(text);
                  }}
                  value={storeName}
                />
              </View>
              <View style={b_check.input_sub_title}>
                <Text style={styles.input_Id_Text}>
                  I&nbsp;&nbsp;&nbsp;&nbsp;D
                </Text>
                <TextInput
                  style={[
                    styles.input_Id,
                    {borderColor: focusStoreName ? '#2A5FC1' : 'black'},
                  ]}
                  ref={(input) => {
                    setRefId(input);
                  }}
                  onFocus={() => {
                    setFocusId(true);
                  }}
                  onBlur={() => {
                    setFocusId(false);
                  }}
                  onSubmitEditing={() => {
                    refPw.focus();
                  }}
                  onChangeText={(text) => {
                    setId(text);
                  }}
                  value={Id}
                />
              </View>
              <View style={b_check.input_sub_title}>
                <Text style={styles.input_Id_Text}>
                  P&nbsp;&nbsp;&nbsp;&nbsp;W
                </Text>
                <TextInput
                  style={[
                    styles.input_Id,
                    {borderColor: focusPw ? '#2A5FC1' : 'black'},
                  ]}
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  keyboardType="numeric"
                  placeholder="숫자6자리를입력해주세요"
                  maxLength={6}
                  secureTextEntry={true}
                  ref={(input) => {
                    setRefPw(input);
                  }}
                  onFocus={() => {
                    setFocusPw(true);
                  }}
                  onBlur={() => {
                    setFocusPw(false);
                  }}
                  onChangeText={(text) => {
                    if (text.length > 5) {
                      refPw2.focus();
                    }
                    setPw(text);
                  }}
                  value={Pw}
                />
              </View>
              <View style={b_check.input_sub_title}>
                <Text style={styles.input_Id_Text}>PW확인</Text>
                <TextInput
                  style={[
                    styles.input_Id,
                    {borderColor: focusPwCheck ? '#2A5FC1' : 'black'},
                  ]}
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  keyboardType="numeric"
                  placeholder="비밀번호재확인"
                  secureTextEntry={true}
                  maxLength={6}
                  ref={(input) => {
                    setRefPw2(input);
                  }}
                  onFocus={() => {
                    setFocusPwCheck(true);
                  }}
                  onBlur={() => {
                    setFocusPwCheck(false);
                  }}
                  onChangeText={(text) => {
                    if (text.length > 5) {
                      Keyboard.dismiss();
                      //setInputModal(true);
                    }
                    setPwCheck(text);
                  }}
                  value={PwCheck}
                />
              </View>
            </View>

            <View style={b_check.input_sub_title_post}>
              <TouchableOpacity
                style={b_check.post_btn}
                accessible={true}
                //disabled={!CheckValue()}
                onPress={() => {
                  switchPostVisible();
                  Keyboard.dismiss();
                }}>
                <Text style={[b_check.btn_txt, {color: 'white'}]}>
                  주소 찾기
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input_post]}
                placeholder="주 소"
                editable={false}
                selectTextOnFocus={false}
                value={postResult.address}
              />
            </View>

            <Image_Pick_Post />
            {numberA !== '' ? (
              <Input_Box_A />
            ) : (
              <View style={styles.input_view}></View>
            )}
            <View style={b_check.btn_View}>
              <TouchableOpacity
                style={[
                  b_check.id_btn,
                  {backgroundColor: CheckValue() ? '#2A5FC1' : color.gray},
                ]}
                accessible={true}
                //disabled={!CheckValue()}
                onPress={() => {
                  CheckAlert();

                  Keyboard.dismiss();
                }}>
                <Text style={[b_check.btn_txt, {color: 'white'}]}>
                  회원 가입
                </Text>
              </TouchableOpacity>
            </View>
            <View style={b_check.btn_View}>
              <TouchableOpacity
                style={[b_check.id_btn, {backgroundColor: '#2A5FC1'}]}
                accessible={true}
                //disabled={!CheckValue()}
                onPress={() => {
                  navigation.pop();
                  Keyboard.dismiss();
                }}>
                <Text style={[b_check.btn_txt, {color: 'white'}]}>
                  뒤로 가기
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            onBackdropPress={() => {
              switchPostVisible();
              setFocusTextD(false);
            }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
            coverScreen={true}
            hasBackdrop={true}
            backdropOpacity={0.5}
            isVisible={postModalVisible}
            style={
              ([b_check.input_number_Modal],
              {
                justifyContent: 'flex-end',
                margin: 0,
                bottom: 0,
                position: 'absolute',
              })
            }>
            <View
              style={{
                width: deviceWidth,
                paddingTop: deviceHeight * 0.03,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Postcode
                style={{
                  width: deviceWidth,
                  height: deviceHeight * 0.5,
                  backgroundColor: 'white',
                }}
                jsOptions={{animated: true}}
                onSelected={(data) => {
                  //alert(JSON.stringify(data));
                  setPostResult(data);
                  switchPostVisible();
                  Keyboard.dismiss();
                }}
              />
            </View>
          </Modal>

          <Modal
            onBackdropPress={() => {
              setInputModal(false);
              setFocusTextD(false);
            }}
            onModalShow={() => {
              RefD.focus();
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={0.1}
            animationOutTiming={0.1}
            coverScreen={true}
            hasBackdrop={true}
            backdropOpacity={0}
            isVisible={inputModal}
            style={b_check.input_number_Modal}>
            <View style={b_check.input_number_View}>
              <TextInput
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
                selectionColor={color.white}
                style={b_check.input_number_textinput}
                placeholder={'\t- 없이 사업자번호를 입력해 주세요'}
                ref={(input) => {
                  setRefD(input);
                }}
                onSubmitEditing={() => {
                  switchVisible();
                }}
                onFocus={() => {
                  setFocusTextD(true);
                }}
                onBlur={() => {
                  setFocusTextD(false);
                }}
                onChangeText={(text) => {
                  setNumberD(text);

                  if (0 < text.length < 4) {
                    setNumberA(text.slice(0, 3));
                  }
                  if (4 < text.length < 6) {
                    setNumberB(text.slice(3, 5));
                  }
                  if (6 < text.length < 10) {
                    setNumberC(text.slice(5, 10));
                  }
                }}
                value={numberD}
                maxLength={10}
              />
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const b_check = StyleSheet.create({
  mom: {
    width: deviceWidth,
    //height: deviceHeight * 0.9,
    alignItems: 'center',
    flexDirection: 'column',
    padding: deviceWidth * 0.04,
    justifyContent: 'center',
  },

  TopBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: deviceWidth * 0.8,
  },

  TopRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: deviceWidth * 0.8,
    marginBottom: deviceWidth * 0.08,
  },

  TopImg: {
    height: deviceWidth * 0.08,
    width: deviceWidth * 0.11,
    resizeMode: 'contain',
  },

  TopTitle: {
    flexWrap: 'wrap',
    fontSize: whatsize.medium,
    fontWeight: 'bold',
    marginLeft: whatsize.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: deviceWidth * 0.015,
  },

  TopInput: {
    backgroundColor: '#D6D6D6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    height: whatsize.large,
    width: deviceWidth * 0.8,
    borderRadius: 7,
  },

  BottomBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth * 0.75,
    height: deviceHeight * 0.06,
    marginTop: deviceWidth * 0.04,
  },

  terms_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    width: deviceWidth * 0.3,
    height: deviceHeight * 0.06,
  },

  btn_txt: {
    textAlign: 'center',
    fontSize: whatsize.mini,
    color: color.white,
  },

  btn_View: {
    width: '80%',
    height: deviceHeight * 0.07,
    marginTop: deviceHeight * 0.02,
  },

  id_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    flex: 1,
  },

  post_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    flex: 1,
    marginTop: deviceHeight * 0.01,
    marginLeft: deviceWidth * 0.01,
    marginRight: deviceWidth * 0.01,
    backgroundColor: '#2A5FC1',
  },

  input_title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input_sub_title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  input_sub_title_post: {
    marginTop: deviceHeight * 0.015,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  input_number_Modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  input_number_View: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    backgroundColor: 'white',
    margin: -20,
  },

  input_number_textinput: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: deviceWidth * 0.01,
    fontSize: deviceHeight * 0.02,
    backgroundColor: '#89898955',
    borderRadius: 25,
    color: 'black',
    includeFontPadding: true,
    paddingLeft: deviceWidth * 0.01,
    marginLeft: deviceWidth * 0.01,
    marginRight: deviceWidth * 0.01,
    marginBottom: deviceWidth * 0.01,
    marginTop: deviceWidth * 0.01,
    height: deviceHeight * 0.08,
  },
});

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: 'white'},

  inner_view: {flex: 1, padding: 16},

  image_view: {width: '100%', alignItems: 'center'},

  image: {
    width: Width * 0.3,
    height: Width * 0.3,
    backgroundColor: 'black',
    //resizeMode: '',
    marginBottom: Height * 0.02,
    marginTop: Height * 0.02,
  },

  no_image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Width * 0.3,
    height: Width * 0.3,
    marginBottom: Height * 0.02,
    marginTop: Height * 0.02,
  },

  input_view: {
    flexDirection: 'row',
    height: deviceHeight * 0.08,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: deviceHeight * 0.005,
    marginBottom: deviceHeight * 0.01,
  },

  input_A: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: Width * 0.01,
    fontSize: Height * 0.02,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: '18%',
    includeFontPadding: true,
    paddingLeft: Width * 0.01,
  },

  input_B: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: Width * 0.01,
    fontSize: Height * 0.02,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: '12%',
    paddingLeft: Width * 0.01,
  },

  input_C: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: Width * 0.01,
    fontSize: Height * 0.02,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: '30%',
    paddingLeft: Width * 0.01,
  },

  input_Id: {
    fontWeight: 'bold',
    letterSpacing: Width * 0.01,
    fontSize: Height * 0.016,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    marginRight: Width * 0.02,
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: Width * 0.5,
    paddingLeft: Width * 0.01,
  },

  input_post: {
    fontWeight: 'bold',
    letterSpacing: Width * 0.001,
    fontSize: Height * 0.016,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    marginRight: Width * 0.02,
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: Width * 0.5,
    paddingLeft: Width * 0.01,
  },

  input_post_two: {
    fontWeight: 'bold',
    letterSpacing: Width * 0.001,
    fontSize: Height * 0.016,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    marginRight: Width * 0.02,
    color: 'black',
    borderBottomWidth: 1,
    padding: 0,
    width: Width * 0.5,
    paddingLeft: Width * 0.01,
  },

  input_Id_Text: {
    paddingTop: Width * 0.03,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: Width * 0.01,
    fontSize: whatsize.xmini,
    marginTop: Height * 0.02,
    //backgroundColor: 'white',
    color: 'black',
    padding: 0,
    width: Width * 0.2,
    paddingLeft: Width * 0.01,
  },
  input_bar: {marginTop: Height * 0.02, fontSize: Width * 0.1},
});

export default Check;
