import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  font,
  color,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../Common/CommonRule';
import SignMain from '../Common/TopSign/SignMain';
import url from '../Common/Url_List';
import Float_Button from '../Common/Float_Button';
import {StackActions} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-generator';
import Modal from 'react-native-modal';
import {GetNotice, SetNotice} from '../../Function/Async';

const Top = React.memo(() => {
  return <SignMain />;
});

const Business_List_Demo = () => {
  //const getNumber = props['route']['params']['store_number'];
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [setSendUrl, getSendUrl] = useState();
  const [NoticeValue, setNoticeValue] = useState('');
  const [NoticeBackground, setNoticeBackground] = useState(0);

  async function getAxios_Demo() {
    axios
      .get((await url()).Axios_Demo)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function setServer() {
    getSendUrl((await url()).Axios_socket);
  }

  async function reCallNotice() {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }

  useEffect(() => {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }, []);

  useEffect(() => {
    getAxios_Demo();
    setServer();
  }, []);

  //console.log(data);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={b_list_demo.mom}>
          <Top />
          {NoticeValue !== null && (
            <FlatList
              data={NoticeValue[1]}
              showsVerticalScrollIndicator={false}
              keyExtractor={(notice, index) => index.toString()}
              renderItem={(notice) => {
                return (
                  <Modal
                    style={{
                      backgroundColor: 'rgba(0,0,0,1)',
                      width: deviceWidth,
                      height: deviceHeight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 0,
                    }}
                    onModalShow={() => {
                      setNoticeBackground(NoticeBackground + 1);
                    }}
                    onBackButtonPress={() => {
                      var TempNotice = NoticeValue[1];
                      TempNotice[[notice.index]].view = false;
                      SetNotice({notice: TempNotice});
                      setNoticeBackground(NoticeBackground - 1);

                      reCallNotice();
                    }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={0.2}
                    animationOutTiming={0.2}
                    /*   coverScreen={true}
                    hasBackdrop={true} */
                    backdropOpacity={
                      NoticeBackground ? 0.8 / NoticeBackground : 0.8
                    }
                    isVisible={NoticeValue[1][notice.index].view}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: deviceWidth * 0.64,
                        height: deviceHeight * 0.4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255,1)',
                        borderRadius: 15,
                        elevation: 15,
                        opacity: 1,
                      }}>
                      <View
                        style={{
                          paddingLeft: deviceWidth * 0.03,
                          paddingRight: deviceWidth * 0.03,
                        }}>
                        <Text
                          style={{
                            marginTop: deviceWidth * 0.05,
                            marginBottom: deviceWidth * 0.05,
                            fontSize: deviceWidth * 0.05,
                            color: 'black',
                          }}>
                          {notice.item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingLeft: deviceWidth * 0.03,
                          paddingRight: deviceWidth * 0.03,
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.035,
                            color: 'black',
                            textAlign: 'center',
                          }}>
                          {notice.item.discription}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: deviceWidth * 0.6,
                        paddingTop: deviceWidth * 0.04,
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: deviceWidth * 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          var TempNotice = NoticeValue[1];
                          TempNotice[[notice.index]].view = false;
                          SetNotice({notice: TempNotice});
                          setNoticeBackground(NoticeBackground - 1);
                          reCallNotice();
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.03,
                            color: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}>
                          닫기
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: deviceWidth * 0.04,
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        |
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: deviceWidth * 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          var TempNotice = NoticeValue[1];
                          TempNotice[[notice.index]].view = false;
                          TempNotice[[notice.index]].will_view = false;
                          SetNotice({notice: TempNotice});
                          setNoticeBackground(NoticeBackground - 1);
                          reCallNotice();
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.03,
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          오늘 다시 보지 않기
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                );
              }}
            />
          )}
          {!data ? (
            <View>
              <Text>로딩중 입니다.</Text>
            </View>
          ) : (
            <FlatList
              //stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              data={data}
              keyExtractor={(store) => store.key}
              renderItem={(store) => {
                //console.log(store);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={b_list_demo.card}
                    onPress={() => {
                      //console.log(setSendUrl);
                      /*  navigation.dispatch(
                        StackActions.replace('Records', {
                          nano_id: store.item.nano_id,
                          server: setSendUrl,
                        }),
                      ); */
                      navigation.navigate('Records', {
                        nano_id: store.item.nano_id,
                        server: setSendUrl,
                      });
                      /*  navigation.dispatch(
                        StackActions.replace('Records', {aaa: '111'}),
                      ); */
                    }}>
                    <View style={b_list_demo.text_box}>
                      <Text style={b_list_demo.title}>
                        상호: {store.item.store_name}
                      </Text>
                      <Text style={b_list_demo.sub}>
                        사업자 등록번호: {store.item.store_num}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListHeaderComponent={() => {
                return <></>;
              }}
              ListFooterComponent={() => {
                return (
                  <View style={b_list_demo.card_list_footer}>
                    <QRCode
                      value={'http://qari.cafe24app.com/MQRXE'}
                      size={1}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
        <Float_Button />
      </SafeAreaView>
    </>
  );
};

const b_list_demo = StyleSheet.create({
  mom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  top_box: {
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight * 0.02,
  },
  top_txt: {
    fontSize: 22,
  },

  card_list_footer: {
    height: deviceHeight * 0.1,
  },
  card: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: '5%',
    marginLeft: deviceWidth * 0.12,
    marginRight: deviceWidth * 0.12,
    flexDirection: 'column',
    height: deviceHeight * 0.12,
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
      },
      android: {
        elevation: 5,
      },
    }),
    borderWidth: 0,
    borderColor: 'rgba(198, 198, 198, 0.2)',
  },

  text_box: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.12,
  },

  title: {
    fontSize: whatsize.medium,
    fontWeight: 'bold',
  },
  sub: {
    fontSize: whatsize.small,
  },
});

export default Business_List_Demo;
