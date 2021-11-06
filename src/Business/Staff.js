import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  InteractionManager,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  font,
  color,
  btn,
  deviceWidth,
  deviceHeight,
  whatsize,
} from '../Common/CommonRule';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {SetStaff, GetLogin} from '../../Function/Async';
import Modal from 'react-native-modal';
import Float_Button from '../Common/Float_Button';
import {
  Axios_Staff_Join,
  Axios_OverLap,
  Axios_Staff_List,
  Axios_Staff_Delete,
} from '../../Function/Axios';
import Snackbar from 'react-native-snackbar';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const Memo_Button = React.memo(() => {
  return <Float_Button />;
});
// TODO: 직원삭제해야함
const Staff = () => {
  const navigation = useNavigation();
  //? 이름
  const [getName, setName] = useState('');
  const [getFocusName, setFocusName] = useState(false);

  //? 아이디
  const [getId, setId] = useState('');
  const [getRefId, setRefId] = useState('');
  const [getFocusId, setFocusId] = useState(false);

  //? 비밀번호
  const [getPw, setPw] = useState('');
  const [getRefPw, setRefPw] = useState('');
  const [getFocusPw, setFocusPw] = useState(false);

  //? 비밀번호 재확인
  const [getPwRe, setPwRe] = useState('');
  const [getRefPwRe, setRefPwRe] = useState('');
  const [getFocusPwRe, setFocusPwRe] = useState(false);

  //? 모달
  const [isModalVisible, setVisible] = useState(false);

  //? 로그인 결과에 담겨있는 사업자 번호 가져오기
  const [loginResult, GetLoginResult] = useState('');

  //? 직원 목록
  const [getStaffList, setStaffList] = useState('');

  async function get_Axios_Staff_List() {
    setStaffList(await Axios_Staff_List({store_crn: loginResult[2]}));
  }

  useEffect(() => {
    if (loginResult !== '') {
      get_Axios_Staff_List();
    }
  }, [loginResult]);

  async function CheckLogin() {
    GetLoginResult(await GetLogin());
  }

  useEffect(() => {
    CheckLogin();
  }, []);

  async function get_Axios_Staff_Result({formData}) {
    var returnData = await Axios_Staff_Join({formData: formData});
    console.log(returnData);
    if (returnData == true) {
      console.log('직원등록 완료');
      InteractionManager.runAfterInteractions(() => {
        setVisible(!isModalVisible);
      }).then(() => {
        setTimeout(() => {
          //get_Axios_Staff_List();
          var TempStaffList = getStaffList;
          TempStaffList = TempStaffList.concat({
            staff_name: formData.staff_name,
            id: formData.id,
          });
          console.log('TempStaffList ==', TempStaffList);

          setStaffList(TempStaffList);
          Snackbar.show({
            text: '직원등록 완료',
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
        }, 500);
      });
    } else if (returnData == false) {
      Snackbar.show({
        text: '입력 정보를 다시 확인 해 주세요',
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

  async function CheckOverLap() {
    var formData = {
      store_crn: loginResult[2],
      password: getPwRe,
      id: getId,
      staff_name: getName,
    };
    if (getPw !== getPwRe) {
      Snackbar.show({
        text: '비밀번호가 일치하지 않습니다',
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
      data = await Axios_OverLap({
        data: {store_crn: loginResult[2], id: getId},
      });
      if (data == false) {
        get_Axios_Staff_Result({formData: formData});
      } else {
        Snackbar.show({
          text: '입력 정보를 다시 확인 해 주세요',
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
  }

  async function Staff_Delete_Result({data}) {
    var result = '';

    result = await Axios_Staff_Delete({
      data: {store_crn: loginResult[2], id: data.item.id},
    });
    if (result == true) {
      var TempStaffList = getStaffList;
      (TempStaffList = TempStaffList.filter((del) => del.id !== data.item.id)),
        setStaffList(TempStaffList);
    }
  }

  const switchVisible = () => {
    setVisible(!isModalVisible);
  };
  const onChangeName = ({text}) => {
    setName(text);
  };
  const onChangePw = ({text}) => {
    setPw(text);
  };

  const onChangePwRe = ({text}) => {
    setPwRe(text);
  };

  const onChangeId = ({text}) => {
    setId(text);
  };

  /*   const listItem =({})={
    <Item data = {aaa}/>
  }
 */
  return (
    <>
      <View style={staff.mom}>
        <View style={staff.top}>
          <View style={staff.top1}>
            <Text style={staff.top_text}>직원목록</Text>
            <View style={staff.line}></View>
          </View>
          <TouchableOpacity
            style={staff.add_icon_box}
            onPress={() => {
              switchVisible();
            }}>
            <IconIon
              name="ios-person-add-outline"
              size={deviceWidth * 0.05}
              color="white"></IconIon>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: deviceHeight * 0.05,
            alignItems: 'center',
          }}>
          {/*          <SwipeListView
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={getStaffList}
            renderItem={(data) => (
              <View style={staff.middle}>
                <TouchableOpacity sylte={staff.neme_box}>
                  <Text style={staff.name}>{data.item.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity sylte={staff.num_box}>
                  <Text style={staff.num}>{data.item.staff_name}</Text>
                </TouchableOpacity>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <TouchableOpacity style={staff.del_icon_box}>
                <IconAnt
                  name="delete"
                  size={deviceWidth * 0.05}
                  color="red"></IconAnt>
              </TouchableOpacity>
            )}
            leftOpenValue={deviceWidth * 0.15}
            rightOpenValue={0}
          /> */}
          <FlatList
            style={{height: deviceHeight * 0.7}}
            showsVerticalScrollIndicator={false}
            data={getStaffList}
            keyExtractor={(data, index) => data.id}
            renderItem={(data) => {
              return (
                <View style={staff.middle}>
                  <TouchableOpacity
                    style={staff.del_icon_box}
                    onPress={() => {
                      console.log(data.index);

                      Staff_Delete_Result({data: data});
                    }}>
                    <IconAnt
                      name="delete"
                      size={deviceWidth * 0.05}
                      color="red"></IconAnt>
                  </TouchableOpacity>
                  <View style={staff.neme_box}>
                    <Text style={staff.name}>{data.item.id}</Text>
                  </View>
                  <View style={staff.num_box}>
                    <Text style={staff.num}>{data.item.staff_name}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <Memo_Button />
        <Modal
          onBackdropPress={() => {
            switchVisible();
          }}
          onBackButtonPress={() => {
            switchVisible();
          }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          coverScreen={true}
          hasBackdrop={true}
          backdropOpacity={0.5}
          isVisible={isModalVisible}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{
            position: 'absolute',
            Top: 0,
            marginTop: deviceHeight * 0.25,
            margin: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 25,
              backgroundColor: color.white,
              width: deviceWidth,
              height: deviceHeight * 0.75,
              padding: deviceWidth * 0.1,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: deviceHeight * 0.03,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: whatsize.large,
                  fontWeight: 'bold',
                }}>
                직원 추가
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: deviceHeight * 0.05,
                }}>
                <Text
                  style={{
                    width: '30%',
                    color: color.black,
                    fontSize: whatsize.medium,
                  }}>
                  이름
                </Text>
                <TextInput
                  style={{
                    width: '70%',
                    backgroundColor: color.white,
                    fontSize: whatsize.small,
                    fontWeight: 'bold',
                    borderBottomColor: color.black,
                    padding: 0,
                    borderBottomColor: getFocusName ? '#2A5FC1' : color.black,
                    borderBottomWidth: getFocusName ? 3 : 2,
                  }}
                  placeholderTextColor="grey"
                  placeholder="이름을 입력 해 주세요"
                  onSubmitEditing={(text) => {
                    getRefId.focus();
                  }}
                  onFocus={() => {
                    setFocusName(true);
                  }}
                  onBlur={() => {
                    setFocusName(false);
                  }}
                  onChangeText={(text) => {
                    onChangeName({text: text});
                  }}
                  //value={getName}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: deviceHeight * 0.05,
                }}>
                <Text
                  style={{
                    width: '30%',
                    color: color.black,
                    fontSize: whatsize.medium,
                  }}>
                  아이디
                </Text>
                <TextInput
                  style={{
                    width: '70%',
                    backgroundColor: color.white,
                    fontSize: whatsize.small,
                    fontWeight: 'bold',
                    borderBottomColor: color.black,
                    padding: 0,
                    borderBottomColor: getFocusId ? '#2A5FC1' : color.black,
                    borderBottomWidth: getFocusId ? 3 : 2,
                  }}
                  placeholderTextColor="grey"
                  placeholder="아이디를 입력 해 주세요"
                  ref={(data) => {
                    setRefId(data);
                  }}
                  onSubmitEditing={(text) => {
                    getRefPw.focus();
                  }}
                  onFocus={() => {
                    setFocusId(true);
                  }}
                  onBlur={() => {
                    setFocusId(false);
                  }}
                  onChangeText={(text) => {
                    onChangeId({text: text});
                    //console.log(text.length);
                  }}
                  // value={getId}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: deviceHeight * 0.05,
                }}>
                <Text
                  style={{
                    width: '30%',
                    color: color.black,
                    fontSize: whatsize.medium,
                  }}>
                  비밀번호
                </Text>
                <TextInput
                  style={{
                    width: '70%',
                    backgroundColor: color.white,
                    fontSize: whatsize.small,
                    fontWeight: 'bold',
                    padding: 0,
                    borderBottomColor: getFocusPw ? '#2A5FC1' : color.black,
                    borderBottomWidth: getFocusPw ? 3 : 2,
                  }}
                  placeholderTextColor="grey"
                  placeholder="비밀번호는 최대 6자리입니다"
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  keyboardType="numeric"
                  maxLength={6}
                  secureTextEntry={true}
                  ref={(data) => {
                    setRefPw(data);
                  }}
                  onSubmitEditing={(text) => {
                    getRefPwRe.focus();
                  }}
                  onFocus={() => {
                    setFocusPw(true);
                  }}
                  onBlur={() => {
                    setFocusPw(false);
                  }}
                  onChangeText={(text) => {
                    onChangePw({text: text});
                  }}
                  //value={getPw}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: deviceHeight * 0.05,
                }}>
                <Text
                  style={{
                    width: '30%',
                    color: color.black,
                    fontSize: whatsize.medium,
                  }}>
                  재확인
                </Text>
                <TextInput
                  style={{
                    width: '70%',
                    backgroundColor: color.white,
                    fontSize: whatsize.small,
                    fontWeight: 'bold',
                    padding: 0,
                    borderBottomColor: getFocusPwRe ? '#2A5FC1' : color.black,
                    borderBottomWidth: getFocusPwRe ? 3 : 2,
                  }}
                  placeholderTextColor="grey"
                  placeholder="비밀번호를 다시 입력 해 주세요"
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  keyboardType="numeric"
                  maxLength={6}
                  secureTextEntry={true}
                  ref={(data) => {
                    setRefPwRe(data);
                  }}
                  onFocus={() => {
                    setFocusPwRe(true);
                  }}
                  onBlur={() => {
                    setFocusPwRe(false);
                  }}
                  onChangeText={(text) => {
                    if (text.length > 5) {
                      Keyboard.dismiss();
                    }
                    onChangePwRe({text: text});
                  }}
                  //value={getPw}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
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
                  backgroundColor: '#2A5FC1',
                }}
                onPress={() => {
                  CheckOverLap();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: whatsize.small,
                    color: color.white,
                  }}>
                  직원등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const staff = StyleSheet.create({
  mom: {
    backgroundColor: color.white,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  top: {
    marginTop: deviceWidth * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.07,
    marginLeft: deviceWidth * 0.3,
  },
  top1: {
    flexDirection: 'column',
  },
  top_text: {
    color: color.black,
    fontSize: whatsize.xlarge,
    fontWeight: 'bold',
  },
  line: {
    borderWidth: 1,
  },
  add_icon_box: {
    backgroundColor: '#2A5FC1',
    width: whatsize.xlarge * 2,
    height: whatsize.xlarge * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  middle: {
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    alignItems: 'center',
  },
  del_icon_box: {
    backgroundColor: 'white',
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neme_box: {width: '40%'},
  name: {
    fontSize: whatsize.medium,
    textAlign: 'left',
  },
  num_box: {width: '40%'},
  num: {
    fontSize: whatsize.medium,
    textAlign: 'right',
  },
});
export default Staff;
