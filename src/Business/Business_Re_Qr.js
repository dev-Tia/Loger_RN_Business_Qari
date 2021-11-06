import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Float_Button from '../Common/Float_Button';
function Business_Re_Qr() {
  const navigation = useNavigation();

  return (
    <>
      <View style={b_re_qr.mom}>
        <Text style={b_re_qr.txt}>QR_Code 다시발급</Text>
        <Float_Button />
      </View>
    </>
  );
}

const b_re_qr = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'column',
  },

  touchbox: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '50%',
    height: '10%',
    borderRadius: 20,
  },

  txt: {
    textAlign: 'center',
    color: 'white',
    width: '80%',
    height: '50%',
    fontSize: 25,
  },
});

export default Business_Re_Qr;
