import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';

import { deviceWidth, deviceHeight, whatsize } from '../CommonRule';

function TopPoster() {
    return <>
        <View style={topPoster.mom}>
            <Image style={topPoster.poster1}
              source={require('../../../assets/img/poster2.png')}>
            </Image>
        </View>

    </>
};

const topPoster = StyleSheet.create({
    mom:{    
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset:{
            width:0,
            height:6,
        },
        shadowOpacity: 0.37,
        shadowRadius:7.49,
        elevation: 12,
    },
    poster1:{
        flex:1,
        resizeMode: 'contain',   
        width: deviceWidth,
        height: whatsize.xlarge * 3
    }
});

export default TopPoster;