import ImagePicker from 'react-native-image-picker';

export default showPicker = ({setimageUri}) => {
  //ImagePicker를 이용해서 카메라 or 사진선택앱을 선택하여 이미지 가져오기
  // 카메라를 다루려면 Camera, External Storage 퍼미션이 필요함
  // Android의 경우 퍼미션을 주려면 .. AndroidManifest.xml에서 직접 작성
  // <uses-permission android:name="android.permission.CAMERA" />
  // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  //android:requestLegacyExternalStorage="true"
  // PickerDialog의 옵션 객체

  const options = {
    title: '이미지 선택', //다이얼로그의 제목
    takePhotoButtonTitle: '카메라',
    chooseFromLibraryButtonTitle: '이미지 선택',
    cancelButtonTitle: '취소',
    storageOptions: {
      skipBackup: true, //ios에서 icloud에 백업할 것인가?- 안드로이드에서는 무시됨
      path: 'images', //카메라로 캡쳐시에 저장될 폴더명 [ Pictures/[path] 경로]
    },
  };
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      alert('이미지 선택 취소.');
    } else if (response.error) {
      alert('에러 : ', response.error);
    } else if (response.customButton) {
      alert('커스텀버튼 선택 :' + response.customButton);
    } else {
      // 이곳에 왔다면 이미지가 잘 선택된 것임
      // 선택된 이미지의 경로 uri 얻어오기
      var data = response;
      setimageUri(data);
    }
  });
};
