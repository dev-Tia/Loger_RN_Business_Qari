import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { font, color } from './CommonRule';

const Btn_w = (props) => {
    return (
        <View style={btn.mom, props.btn_size}>
            <TouchableOpacity style={btn.btn_w} >
                <Text>{props.txt}</Text>
            </TouchableOpacity>
        </View>
    );
}

const btn = StyleSheet.create({

    mom: {
        flex: 1,
    },

    btn_w: {
        backgroundColor: color.white,
        borderRadius: 20,
        height: '50%',
        elevation: 5,
    }

});

export default Btn_w;