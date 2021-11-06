import AsyncStorage from '@react-native-community/async-storage';
import {Axios_Url, Axios_Corona_New, Axios_Corona} from './Axios';

const SetStore = async ({data}) => {
  const jsonValue = JSON.stringify(data);
  console.log('----- 초기값 자동으로 넣기전에 이렇게 생겼어요!!!');
  console.log(jsonValue);
  try {
    // 받아온 값 집어넣기
    // 컨텐스트로 해도 상관없지만 스토리지에 넣어도 편할것 같음
    await AsyncStorage.setItem('SetStore', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const addLocationValue = async ({TempData}) => {
  console.log('addLocationValue', TempData);
  const jsonValue = JSON.stringify(TempData);
  try {
    await AsyncStorage.setItem('CurrentLocation', jsonValue);
    console.log('Done.');
  } catch (e) {
    // save error
    console.log(e);
  }
};

const getStore = async ({setNumber}) => {
  try {
    const value = await AsyncStorage.getItem('SetStore');
    if (value !== null) {
      let jsonValue = JSON.parse(value);
      console.log('getStore value = ', jsonValue);
      setNumber(jsonValue);
      return;
    } else {
      console.log('값이 없어요!');
      return 'null';
    }
  } catch (e) {
    console.log('에러예요!');
    return 'error';
  }
};

const SetStaff = async ({data}) => {
  const jsonValue = JSON.stringify(data);

  console.log('----- 초기값 자동으로 넣기전에 이렇게 생겼어요!!!');
  console.log(jsonValue);

  try {
    // 받아온 값 집어넣기
    // 컨텐스트로 해도 상관없지만 스토리지에 넣어도 편할것 같음
    await AsyncStorage.setItem('SetStore', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

//! URL 저장
const SetUrl = async () => {
  var Axios_Value = '';
  Axios_Value = await new Axios_Url();
  const jsonValue = JSON.stringify(Axios_Value);
  try {
    await AsyncStorage.setItem('Url', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('Url', 'error');
  }
};

//! URL 불러옴
const GetUrl = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Url');
    if (_value !== null) {
      if (JSON.parse(_value) == undefined) {
        result = 'error';
      } else {
        result = JSON.parse(_value);
      }
    } else {
      console.log('값이 없어요!');
      result = 'error';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const SetUser = async ({value}) => {
  const jsonValue = JSON.stringify(value);
  console.log('SetUser  = ', jsonValue);
  try {
    await AsyncStorage.setItem('User', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('User', 'error');
  }
};

const GetUser = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('User');
    if (_value !== null) {
      if (JSON.parse(_value).store_crn == undefined) {
        result = 'error';
      } else {
        result = JSON.parse(_value);
      }
    } else {
      console.log('값이 없어요!');
      result = 'error';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const SetLogin = async ({owner, store_crn}) => {
  const jsonValue = JSON.stringify([true, owner, store_crn]);
  try {
    await AsyncStorage.setItem('Login', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('Login', 'error');
  }
};

const GetLogin = async () => {
  var result = '';

  try {
    const _value = await AsyncStorage.getItem('Login');
    if (JSON.parse(_value)[0]) {
      result = ['true', JSON.parse(_value)[1], JSON.parse(_value)[2]];
    } else {
      result = ['false', JSON.parse(_value)[1], JSON.parse(_value)[2]];
    }
  } catch (e) {
    result = ['false', 0];
  }

  return result;
};

const LogOut = async () => {
  try {
    await AsyncStorage.removeItem('Login');
  } catch (e) {
    await AsyncStorage.removeItem('Login');
  }
};

//! URL 저장
const SetNotice = async ({notice}) => {
  var getdata = notice;
  var now = parseInt(Date.now());
  const value = JSON.stringify([now, getdata]);
  try {
    await AsyncStorage.setItem('Notice', value);
  } catch (e) {
    await AsyncStorage.setItem('Notice', 'error');
  }
};

//! URL 불러옴
const GetNotice = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Notice');
    if (_value !== null) {
      result = _value;
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const SetCorona = async () => {
  var dataA = '';
  var dataB = '';
  dataA = await Axios_Corona_New();
  dataB = await Axios_Corona();

  const value = JSON.stringify([dataA, dataB]);
  try {
    await AsyncStorage.setItem('Corona', value);
  } catch (e) {
    await AsyncStorage.setItem('Corona', 'error');
  }
};

const GetCorona = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Corona');
    if (_value !== null) {
      result = _value;
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const SetVisit = async ({data}) => {
  var getdata = data;
  const value = JSON.stringify(getdata);
  try {
    await AsyncStorage.setItem('Visit', value);
  } catch (e) {
    await AsyncStorage.setItem('Visit', 'error');
  }
};

//! URL 불러옴
const GetVisit = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Visit');
    if (_value !== null) {
      result = JSON.parse(_value);
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const getLocation = async ({setGeoGet}) => {
  try {
    const value = await AsyncStorage.getItem('CurrentLocation');
    if (value !== null) {
      let jsonValue = JSON.parse(value);
      console.log(jsonValue);
      setGeoGet(jsonValue);
      return;
    } else {
      console.log('값이 없어요!');
      return 'null';
    }
  } catch (e) {
    console.log('에러예요!');
    return 'error';
  }
};

const getValue = async (key) => {
  try {
    const _value = await AsyncStorage.getItem(key);
    if (_value !== null) {
      console.log('getData : ' + _value);
    } else {
      console.log('값이 없어요!');
    }
  } catch (e) {}
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};

const addValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
  console.log('Done.');
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
  console.log('Done.');
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
  console.log('clearAll Done.');
};

export {
  SetStore,
  getStore,
  SetStaff,
  SetUrl,
  GetUrl,
  SetUser,
  GetUser,
  SetLogin,
  GetLogin,
  LogOut,
  SetNotice,
  GetNotice,
  SetCorona,
  GetCorona,
  SetVisit,
  GetVisit,
};
