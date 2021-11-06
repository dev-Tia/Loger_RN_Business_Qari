import axios from 'axios';
import {Alert, InteractionManager} from 'react-native';
import Url_List from '../src/Common/Url_List';
import {SetUser, SetLogin, SetNotice, GetNotice} from '../Function/Async';
import {StackActions} from '@react-navigation/native';
import {setupCache} from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

async function NoticeGet() {
  return await GetNotice();
}

const Notice_Axios = async () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  /*   axios.get(
    'https://hero-loger.github.io/Loger_JSON/JSON/ytt/notification.json',
    {
      cancelToken: source.token,
    },
  ); */
  await api({
    url: (await Url_List()).Notice,
    method: 'get',
    cancelToken: source.token,
  })
    .then(async function (response) {
      var Notice = await NoticeGet();
      Notice = JSON.parse(Notice);
      var now = parseInt(Date.now() / 1000);
      var TempNotice = response.data;
      //! 공지 갯수만큼 for 문
      for (var i = 0; i < response.data.length; i++) {
        //! 기존 async에 값 확인
        //! async에 값이 있을 시
        if (Notice !== null) {
          //! 시간 내에 있을 시
          if (
            new Date(Notice[0]).getDate() !==
            new Date(parseInt(Date.now())).getDate()
          ) {
            TempNotice[i].view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            TempNotice[i].will_view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            SetNotice({notice: TempNotice});
          } else {
            if (Notice[1][i].will_view == true) {
              Notice[1][i].view = true;
              SetNotice({notice: Notice[1]});
            }
          }
          //! async에 값이 없을 시
        } else if (Notice == null) {
          console.log('첫 실행!');
          TempNotice[i].view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          TempNotice[i].will_view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          SetNotice({notice: TempNotice});
        }
      }
    })
    .catch(function (error) {
      console.log('Notice_Axios error==', error);
      alert('공지 오류', error);
    });
};

//! URL 관리용
const Axios_Url = async () => {
  var data = '';
  await axios
    .get((await Url_List()).hero_loger)
    .then(function (response) {
      data = response.data;
      console.log('Axios_Url Response.data == ', data);
    })
    .catch(function (e) {
      data = 'error';
      alert('Url 요청 오류', e);
    });
  return data;
};

const Axios_Join = async ({formData, navigation}) => {
  axios({
    method: 'post',
    url: (await Url_List()).Axios_Join,
    data: formData,
    headers: {'content-type': 'multipart/form-data'}, // Check에서 헤더를 파라미터로 보내고 여기서 안받고있어서 그냥 여기다가 추가함
  })
    .then(function (response) {
      console.log('Store_JOIN', response.data);
      SetUser({
        value: {
          store_crn: formData._parts[2][1],
          password: formData._parts[3][1],
          store_img: formData._parts[0][1],
        },
      });
      if (response.data.check) {
        navigation.navigate('Business_Login');
      } else {
        console.log('사업자번호를 확인해 주세요');
      }

      //setData(response.data);
    })
    .catch(function (error) {
      console.log('Store_JOIN', error);
      alert('가입 오류', error);
    });
};

const Axios_Login = async ({formData, navigation, Snackbar}) => {
  axios({
    method: 'post',
    url: (await Url_List()).Axios_Login,
    data: formData,
  })
    .then(function (response) {
      console.log('Store_JOIN', response.data);
      if (response.data.store_crn && response.data.check) {
        SetLogin({owner: response.data.owner, store_crn: formData.store_crn});
        navigation.dispatch(StackActions.replace('Business_List_Demo'));
        //navigation.push('Business_List_Demo');
      } else if (!response.data.store_crn) {
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
      } else if (!response.data.check) {
        Snackbar.show({
          text: '아이디나 비밀번호를 확인 해 주세요',
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
        formData.number == '0000000000' &&
        formData.password == '000000'
      ) {
        navigation.push('Business_List_Demo');
      }
    })
    .catch(function (error) {
      alert('로그인 오류', error);
    });
};

const Axios_cgpw = async ({formData, Snackbar}) => {
  var returnData = '';
  await axios({
    method: 'post',
    url: (await Url_List()).Axios_Staff_Join,
    data: formData,
  })
    .then(function (response) {
      returnData = response.data.success;
    })
    .catch(function (error) {
      Snackbar.show({
        text: '네트워크 오류',
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
      alert('비밀번호 변경 오류', error);
    });
  return returnData;
};

const Axios_Staff_Join = async ({formData, Snackbar}) => {
  var returnData = '';
  await axios({
    method: 'post',
    url: (await Url_List()).Axios_Staff_Join,
    data: formData,
  })
    .then(function (response) {
      returnData = response.data.check;
    })
    .catch(function (error) {
      Snackbar.show({
        text: '네트워크 오류',
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
      alert('직원 가입 오류', error);
    });
  return returnData;
};

const Axios_OverLap = async ({data}) => {
  await axios
    .get((await Url_List()).Axios_Overlap + data.store_crn + '&id=' + data.id)
    .then(function (response) {
      data = response.data.overlap;
    })
    .catch(function (error) {
      alert('중복확인 오류', error);

      console.log(error);
      data = 'error';
    });
  return data;
};

const Axios_Staff_List = async ({store_crn}) => {
  await axios
    .get((await Url_List()).Axios_Staff_List + store_crn)
    .then(function (response) {
      console.log('직원불러오기');
      data = response.data.staffList;
    })
    .catch(function (error) {
      alert('직원 리스트 오류', error);

      console.log(error);
      data = 'error';
    });
  return data;
};

const Axios_Staff_Delete = async ({data}) => {
  await axios
    .get(
      (await Url_List()).Axios_Staff_Delete + data.store_crn + '&id=' + data.id,
    )
    .then(function (response) {
      data = response.data.success;
    })
    .catch(function (error) {
      alert('직원 삭제 오류', error);

      console.log(error);
      data = 'error';
    });
  return data;
};

const Axios_Corona_New = async () => {
  await axios
    .get((await Url_List()).Corona_new)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      alert('코로나 호출 오류', error);

      console.log(error);
      data = 'error';
    });
  return data;
};

const Axios_Corona = async () => {
  await axios
    .get((await Url_List()).Corona)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      alert('코로나 호출 오류', error);

      console.log(error);
      data = 'error';
    });
  return data;
};

export {
  Axios_Join,
  Axios_Url,
  Axios_Login,
  Notice_Axios,
  Axios_Corona_New,
  Axios_Corona,
  Axios_OverLap,
  Axios_Staff_Join,
  Axios_Staff_List,
  Axios_Staff_Delete,
  Axios_cgpw,
};

//  * https://qari.herokuapp.com/
// ! https://qari-check.herokuapp.com/store?StoreInfo=dd33
// ? http://pungryu.cafe24app.com/qari
// TODO: react-native-exit-app
