import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '../FirstScreen/node_modules/@react-navigation/native';
import { font, color } from './CommonRule';

function Btn_b(props) {
    return (
        <>  
            <View style={btn.mom, props.btn_size}>
                <TouchableOpacity style={btn.btn_b}>
                    <Text>{props.txt}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const btn = StyleSheet.create({
    
    mom: {
        flex:1,        
    },
    
    btn_b: {        
        backgroundColor: color.blue, 
        borderRadius: 20,
        height: '50%',
        elevation: 5,  
    }

});

export default Btn_b;