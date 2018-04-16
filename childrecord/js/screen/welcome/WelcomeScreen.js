import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    AsyncStorage,
    TouchableWithoutFeedback
} from 'react-native';
import LoginScreen from '../login/LoginScreen';
import Swiper from 'react-native-swiper';
var Dimensions = require('Dimensions');
var widths = Dimensions.get('window').width;
var heights = Dimensions.get('window').height;
class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 6
        }
    }

    componentDidMount() {
        let self = this;
        this.timer = setInterval(() => {
            self.countDown();
        }, 1000);
    }

    componentUnwillMount() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    //倒计时
    countDown() {
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
            })
        } else if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
            this.pushToLoginScreen();
        }
    }

    pushToLoginScreen() {
        clearInterval(this.timer);
        this.timer = undefined;
        this.props.navigator.push({
            component: LoginScreen
        })
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Swiper loop={false} showsButtons={false} autoplay={true} autoplayTimeout={1.5}>
                    <View style={{flex: 1}}>
                        <Image style={{height: heights, width: widths}}
                               source={require('../../img/welcome/wel_pic1.jpg')}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Image style={{height: heights, width: widths}}
                               source={require('../../img/welcome/wel_pic2.jpg')}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Image style={{height: heights, width: widths}}
                               source={require('../../img/welcome/wel_pic3.jpg')}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Image style={{height: heights, width: widths}}
                               source={require('../../img/welcome/wel_pic4.jpg')}/>
                    </View>
                </Swiper>
                <TouchableWithoutFeedback onPress={()=> {
                    this.pushToLoginScreen();
                }}>
                    <View style={{
                        position: 'absolute',
                        right: 20,
                        top: 30,
                        width: 60,
                        height: 25,
                        borderRadius: 12.5,
                        backgroundColor: 'black',
                        opacity: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: 'white',
                            backgroundColor: 'transparent'
                        }}>{this.state.time}S跳过</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
}

module.exports = WelcomeScreen;