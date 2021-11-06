import axios from 'axios';
import {color} from 'react-native-reanimated';

function Ocr({imageUri, getResult}) {
  var x = new Date();

  var url =
    'https://1389e56ffe844acea6346a8d6990f03f.apigw.ntruss.com/custom/v1/5345/dbf4e388036bf7dba351ae169189cf408d7d1b9ae4908723b74b1237cd939c08/general';

  axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': 'Y0VlT0RZTUNLbG5TdEdDUnFNdFpidGdrRGVSY1pKQmo=',
    },
    data: {
      images: [
        {
          format: 'jpg',
          name: 'Test',
          data: imageUri.data,
        },
      ],
      lang: 'ko',
      requestId: 'string',
      resultType: 'string',
      timestamp: x.getTime(),
      version: 'V1',
    },
  })
    .then(function (response) {
      var textAll = '';
      var textOne = response.data;
      for (var i = 0; i < textOne.images[0].fields.length; i++) {
        console.log(textOne.images[0].fields[i].inferText);
        textAll = textAll + textOne.images[0].fields[i].inferText;
      }
      //console.log(textAll);
      //console.log(JSON.stringify(response.data));
      getResult(response.data);
    })
    .catch(function (error) {
      console.log('error', error);
    });
}

export default Ocr;
