import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function None_Business() {

    const navigation = useNavigation();

  return (
    <>  
    <View style={b_qr.mom}>
           
      </View>
    </>
  );
}

const b_qr = StyleSheet.create({
  
    mom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        flexDirection: 'column'
      },
    
    });

export default None_Business;