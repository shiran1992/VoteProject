import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
let Colors = require('../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;

class NavigatorBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftText: this.props.leftText || '',
            title: this.props.title || '',
            rightText: this.props.rightText || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            leftText: nextProps.leftText || '',
            title: nextProps.title || '',
            rightText: nextProps.rightText || ''
        })
    }

    render() {
        return (
            <View
                style={{
                    height: 60,
                    width: widths,
                    backgroundColor: Colors.navigatorBG,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Text onPress={()=> {
                    this.props.leftPress()
                }} style={{color: 'white', fontSize: 16}}>{this.state.leftText}</Text>
                <Text style={{flex: 1, textAlign: 'center', color: 'white', fontSize: 20}}>{this.state.title}</Text>
                <Text onPress={()=> {
                    this.props.rightPress()
                }} style={{color: 'white', fontSize: 16}}>{this.state.rightText}</Text>
            </View>
        );
    }
}

export default NavigatorBar;