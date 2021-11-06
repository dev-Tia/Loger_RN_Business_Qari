import {GetUrl} from '../../Function/Async';

const Url = async () => {
  var url = '';
  const Url_Async = async () => {
    var value = await new GetUrl();
    //console.log('value =', value);
    return value;
  };
  url = await new Url_Async();
  //console.log('url = ', url);

  return {
    Url_Now: url.CurrentServer,
    Axios_Demo: url.Qari_visit + 'visit/store_list/',
    Axios_Records: url.Qari_visit + 'visit/store_visit?nano_id=',
    Axios_Join: url.Qari_signin_login + 'store/join/', //? 회원가입용
    Axios_Login: url.Qari_signin_login + 'store/login',
    Axios_cgpw: url.Qari_signin_login + 'staff/join',
    Axios_Overlap: url.Qari_signin_login + 'store/overlap?store_crn=',
    Axios_Staff_Join: url.Qari_signin_login + 'staff/join',
    Axios_Staff_Delete: url.Qari_signin_login + 'staff/delete?store_crn=',
    Axios_Staff_List: url.Qari_signin_login + 'staff/staff_list?store_crn=',

    // Axios_socket: url.Qari_socket + 'socket/store?nano_id=',
    Axios_socket: url.Qari_socket,
    hero_loger: 'https://heronoah.github.io/Loger_JSON/JSON/qari/server.json', //? https://heronoah.github.io/Loger_JSON/JSON/qari/server_hyelim.json
    Notice:
      'https://heronoah.github.io/Loger_JSON/JSON/qari/business_notification.json',
    Corona_new:
      'https://api.corona-19.kr/korea/country/new/?serviceKey=d19d227e0b85c9ac7ecf2478dd802dd04',
    Corona:
      'http://api.corona-19.kr/korea/?serviceKey=d19d227e0b85c9ac7ecf2478dd802dd04',
  };
};
export default Url;
