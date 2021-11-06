import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
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
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {GetUser} from '../../Function/Async';
import Snackbar from 'react-native-snackbar';
import {Axios_Login} from '../../Function/Axios';

const Top = React.memo(() => {
  return <SignMain />;
});

function Qr_Print() {
  var FlatData = [0];

  const navigation = useNavigation();

  const [Id, setId] = useState('');
  const [focusId, setFocusId] = useState();

  const [number, setNumber] = useState('');
  const [focusNumber, setFocusNumber] = useState();

  const [Pw, setPw] = useState('');
  const [focusPw, setFocusPw] = useState();

  const [pwRef, setPwRef] = useState(null);
  const [numberRef, setNumberRef] = useState(null);

  function Check() {
    var formData = {store_crn: number, password: Pw, id: Id};
    Axios_Login({
      formData: formData,
      navigation: navigation,
      Snackbar: Snackbar,
    });
  }
  return (
    <>
      <View style={{flex: 1}}>
        <Top />
        <FlatList
          style={{height: deviceHeight}}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          data={FlatData}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={<></>}
          renderItem={() => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}>
                <View style={bLogin.mom}>
                  <View style={bLogin.bNumBox}>
                    <Text style={bLogin.bNumTitle}>아이디</Text>
                    <TextInput
                      style={[
                        bLogin.bNumInput,
                        {borderColor: focusId ? '#2A5FC1' : 'black'},
                      ]}
                      /*   editable={false}
              selectTextOnFocus={false} */
                      placeholder="아이디를입력해주세요"
                      onFocus={() => {
                        setFocusId(true);
                      }}
                      onBlur={() => {
                        setFocusId(false);
                      }}
                      onSubmitEditing={(text) => {
                        numberRef.focus();
                      }}
                      onChangeText={(text) => {
                        setId(text);
                      }}
                      //value={MemoNumber}
                    />
                  </View>
                  <View style={bLogin.bPassBox}>
                    <Text style={bLogin.bNumTitle}>사업자 번호</Text>
                    <TextInput
                      style={[
                        bLogin.bNumInput,
                        {borderColor: focusNumber ? '#2A5FC1' : 'black'},
                      ]}
                      /*   editable={false}
              selectTextOnFocus={false} */
                      textContentType="telephoneNumber"
                      dataDetectorTypes="phoneNumber"
                      keyboardType="numeric"
                      placeholder="숫자10자리를입력해주세요"
                      maxLength={10}
                      ref={(input) => {
                        setNumberRef(input);
                      }}
                      onFocus={() => {
                        setFocusNumber(true);
                      }}
                      onBlur={() => {
                        setFocusNumber(false);
                      }}
                      onChangeText={(text) => {
                        if (text.length > 9) {
                          setNumber(text);

                          pwRef.focus();
                        }
                      }}
                      //value={MemoNumber}
                    />
                  </View>
                  <View style={bLogin.bPassBox}>
                    <Text style={bLogin.bNumTitle}>패스워드</Text>
                    <TextInput
                      style={[
                        bLogin.bNumInput,
                        {borderColor: focusPw ? '#2A5FC1' : 'black'},
                      ]}
                      /*   editable={false}
                selectTextOnFocus={false} */
                      textContentType="telephoneNumber"
                      dataDetectorTypes="phoneNumber"
                      keyboardType="numeric"
                      placeholder="숫자6자리를입력해주세요"
                      maxLength={6}
                      secureTextEntry={true}
                      ref={(input) => {
                        setPwRef(input);
                      }}
                      onFocus={() => {
                        setFocusPw(true);
                      }}
                      onBlur={() => {
                        setFocusPw(false);
                      }}
                      onChangeText={(text) => {
                        if (text.length > 5) {
                          setPw(text);
                          Keyboard.dismiss();
                        }
                      }}
                    />
                  </View>

                  <View style={bLogin.bBtnBox}>
                    <TouchableOpacity
                      style={[bLogin.loginBtn, {backgroundColor: '#2A5FC1'}]}
                      onPress={() => {
                        Check();
                      }}>
                      <Text style={bLogin.loginBtnTxt}>로그인</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: deviceHeight * 0.03}} />
                    <TouchableOpacity
                      style={[bLogin.loginBtn, {backgroundColor: color.red}]}
                      onPress={() => {
                        navigation.navigate('Check');
                      }}>
                      <Text style={bLogin.loginBtnTxt}>다른 사업자 등록</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: deviceHeight * 0.03}} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        <View style={{flex: 1}}></View>
      </View>
    </>
  );
}

const bLogin = StyleSheet.create({
  mom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: deviceWidth,
    paddingBottom: deviceHeight * 0.1,
  },
  bNumBox: {
    marginTop: deviceHeight * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: deviceWidth * 0.7,
  },
  bNumTitle: {
    color: color.gray,
    fontWeight: 'bold',
    fontSize: whatsize.medium,
  },
  bNumInput: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: deviceWidth * 0.7,
    height: whatsize.xlarge * 2,
    marginTop: whatsize.small,
  },
  bPassBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: deviceWidth * 0.7,
    marginTop: whatsize.xlarge,
  },

  bBtnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    marginTop: deviceHeight * 0.05,
  },

  loginBtn: {
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 1,
    borderRadius: 5,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
  },

  loginBtnTxt: {
    textAlign: 'center',
    fontSize: whatsize.small,
    color: color.white,
  },
});

export default Qr_Print;
