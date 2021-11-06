import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  LogBox,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../Common/CommonRule';
import SignMain from '../Common/TopSign/SignMain';
import Checks from './Check';
import url from '../Common/Url_List';
import Float_Button from '../Common/Float_Button';
import io from 'socket.io-client';
import Snackbar from 'react-native-snackbar';
import {SetVisit, GetVisit} from '../../Function/Async';
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'Unrecognized WebSocket connection option(s) `localAddress`. ',
]);

const Records = (props) => {
  //? props.route.params.nano_id
  let data2 = [];

  // ! 원래 쓰던거 const getNumber = props['route']['params']['store_number'];
  const [data, setData] = useState();
  const [getCnt, setCnt] = useState(0);
  const [socketID, setSocketID] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [getVisitData, setVisitData] = useState([]);
  const [getTime, setTime] = useState(
    Date().slice(Date().indexOf('GMT') - 9, Date().indexOf('GMT') - 4),
  );

  async function getAxios_Records() {
    axios
      .get((await url()).Axios_Records + props.route.params.nano_id)
      .then(function (response) {
        setData(response.data.visit_list);
        SetVisit({data: response.data.visit_list});
        setVisitData(response.data.visit_list);

        console.log('getAxios_Records 호출');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (data !== undefined) {
      if (getCnt == 0) {
        console.log('데이터!!');
        setCnt(1);
      }
    }
  }, [getVisitData]);

  useEffect(() => {
    if (getVisitData !== undefined) {
      const option = {
        transports: ['websocket'],
        forceNode: true,
      };
      //http://qari.cafe24app.com/
      var visit_Result = '';
      async function Get_Visit_Result() {
        visit_Result = await GetVisit();
        //!--------------------------------------------------
        const server = props.route.params.nano_id;
        console.log(props.route.params.server + props.route.params.nano_id);
        var url = props.route.params.server;
        if (socketID == '') {
          const socket = io(url, option);
          socket.on('connect', function () {
            console.log('연결이 안되니?');
            socket.emit('income', {
              store: server,
              id: socket.id,
            });
            console.log('연결됨');
            console.log(socket.id);
            setSocketID(socket.id);
          });

          socket.on('sendToStore', (result) => {
            var user_id = result.user_tel.toString();
            var TempResult = {
              key: parseInt(visit_Result[0].key) + 1 + '',
              user_id: user_id.slice(-4, user_id.length),
              visit_date: result.time,
            };
            visit_Result.unshift(TempResult);
            if (visit_Result.length > 50) {
              SetVisit({data: visit_Result.slice(0, 50)});
            } else {
              SetVisit({data: visit_Result});
            }
            async function set_visit_data() {
              var set_visit = await GetVisit();
              setVisitData(set_visit);
            }
            set_visit_data();
            Test();
          });
          const backAction = () => {
            console.log('뒤로갈껀데여');
            socket.close();
            socket.disconnect();
            navigation.pop();
            return true;
          };
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          );

          return () => backHandler.remove();
        }
      }
      Get_Visit_Result();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('소켓 연결 종료');
      socket.close();
      socket.disconnect();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getAxios_Records();
  }, [navigation]);

  function Test() {
    //click();
    setTime(Date().slice(Date().indexOf('GMT') - 9, Date().indexOf('GMT') - 4));
    Snackbar.show({
      text: 'QR인증이 확인되었습니다.',
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
    //socket.close();
  }

  function click() {
    function Call() {
      setTime(
        Date().slice(Date().indexOf('GMT') - 9, Date().indexOf('GMT') - 4),
      );

      getAxios_Records();
      //console.log('새로고침 클릭');
    }
    return Call();
  }

  function VsTime({business}) {
    let date = new Date();
    var date_getDate = 0;
    if (date.getDate() < 10) {
      date_getDate = '0' + date.getDate();
    } else {
      date_getDate = date.getDate();
    }
    var data_getMonth = 0
    if(date.getMonth() < 10){
      data_getMonth = '0' + (date.getMonth()+1);
    }else{
      data_getMonth = date.getMonth()+1;
    }
    var today =
      date.getFullYear() + '-' + data_getMonth + '-' + date_getDate;
    if (
      today == getVisitData[business.index].visit_date.slice(0, 10) &&
      getTime.slice(0, 2) ==
        getVisitData[business.index].visit_date.slice(-8, -3).slice(0, 2)
    ) {
      if (
        getTime == getVisitData[business.index].visit_date.slice(-8, -3) ||
        parseInt(getTime.slice(3, 5)) ==
          parseInt(
            getVisitData[business.index].visit_date.slice(-8, -3).slice(3, 5),
          ) +
            1
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    click();
    wait(200).then(() => setRefreshing(false));
  }, []);
  // ! Warning: Please report: Excessive number of pending callbacks: 501. Some pending callbacks that might have leaked by never being called from native code: {"1879":{},"1881":{},"1883":{},"1885":{},"1887":{},"1889":{},"1891":{},"1893":{},"1895":{},"1897":{},"1899":{},"1901":{},"1903":{},"1905":{},"1907":{},"1909":{},"1911":{},"1913":{},"1915":{},"1917":{},"1919":{},"1921":{},"1923":{},"1925":{},"1927":{},"1929":{},"1931":{},"1933":{},"1935":{},"1937":{},"1939":{},"1941":{},"1943":{},"1945":{},"1947":{},"1949":{},"1951":{},"1953":{},"1955":{},"1957":{},"1959":{},"1961":{},"1963":{},"1965":{},"1967":{},"1969":{},"1971":{},"1973":{},"1975":{},"1977":{},"...(truncated keys)...":451}
  const navigation = useNavigation();
  return (
    <>
      <View style={tab_a.mom}>
        <SignMain />

        {!getVisitData ? (
          <View style={tab_a.loading_box}>
            <Image
              style={tab_a.loading_img}
              source={require('../../assets/img/cat_blue.png')}></Image>
            <Text style={tab_a.loading_txt}>최근 방문 업체가 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            style={{height: deviceHeight * 0.7}}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            data={getVisitData}
            ListHeaderComponent={() => {
              return (
                <View style={tab_a.TopAlign}>
                  <View style={tab_a.top}>
                    <Text style={tab_a.title}>날짜</Text>
                    <Text style={tab_a.title}>시간</Text>
                    <Text style={tab_a.title}>방문자ID</Text>
                  </View>
                  <View style={tab_a.line}></View>
                </View>
              );

              // return !Platform.OS == 'ios' ? (<View />):
              //  (<Top_Sign />)
            }}
            extraData={getVisitData}
            refreshControl={
              <RefreshControl
                colors={['rgba(42, 95, 193, 0.9)', 'black']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            keyExtractor={(business) => business.key}
            renderItem={(business) => {
              return (
                <View style={tab_a.contents}>
                  <View
                    style={[
                      {
                        color: color.white,
                        backgroundColor: VsTime({business: business})
                          ? 'rgba(42, 95, 193, 0.9)'
                          : null,
                      },
                      tab_a.list_box,
                    ]}>
                    <Text
                      style={[
                        {
                          fontWeight: VsTime({business: business})
                            ? 'bold'
                            : 'normal',
                          color: VsTime({business: business})
                            ? color.white
                            : color.black,
                        },
                        tab_a.list,
                      ]}>
                      {business.item.visit_date.slice(0, 10)}
                    </Text>
                    <Text
                      style={[
                        {
                          fontWeight: VsTime({business: business})
                            ? 'bold'
                            : 'normal',
                          color: VsTime({business: business})
                            ? color.white
                            : color.black,
                        },
                        tab_a.list,
                      ]}>
                      {business && business.item.visit_date.slice(-8, -3)}
                    </Text>
                    <Text
                      style={[
                        {
                          fontWeight: VsTime({business: business})
                            ? 'bold'
                            : 'normal',
                          color: VsTime({business: business})
                            ? color.white
                            : color.black,
                        },
                        tab_a.list,
                      ]}>
                      {business.item.user_id}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      <Float_Button />
    </>
  );
};

const tab_a = StyleSheet.create({
  mom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  refresh: {
    fontSize: whatsize.mini,
  },
  line: {
    marginTop: '3%',
    backgroundColor: color.gray,
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.001,
    borderWidth: 1,
  },

  top: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: deviceHeight * 0.03,
    width: deviceWidth * 0.85,
    borderRadius: 1.5,
  },
  TopAlign: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: whatsize.large,
    fontWeight: 'bold',
    color: color.gray,
  },

  contents: {
    flexDirection: 'column',
    width: deviceWidth,
    marginTop: '0.1%',
    marginBottom: '0.1%',
    paddingTop: '1.4%',
    paddingBottom: '1.4%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  list_box: {
    flex: 1,
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: whatsize.small,
    marginBottom: '2%',
    marginTop: '2%',
  },
  loading_box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_img: {
    marginTop: '25%',
    resizeMode: 'contain',
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.5,
  },
  loading_txt: {
    fontSize: whatsize.xlarge,
    marginBottom: deviceWidth * 0.3,
  },
});

export default Records;
