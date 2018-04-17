import React, {Component} from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import App from '../App';
import Toast from 'react-native-root-toast';
import RegisterScreen from './RegisterScreen';
import FindBackPasswordScreen from './FindBackPasswordScreen';
const StaticData = require('../../config/static_data');
const API = require('../../utils/ApiUtil');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    }
  }

  componentDidMount() {
    let self = this;
    AsyncStorage.getItem('userInfo', function (error, result) {
      if (!error) {
        if (result) {
          let userinfo = JSON.parse(result);
          self.setState({
            phone: userinfo.phone || '',
            password: userinfo.password || ''
          });
        }
      }
    });
  }

  //点击登录按钮
  async onLoginPress() {
    let url = StaticData.servlet + 'LoginServlet';
    let params = {
      password: this.state.password,
      phone: this.state.phone
    };
    let json = await API.callAPI(url, params, {method: 'GET'});
    if (json) {
      AsyncStorage.setItem('userInfo', JSON.stringify(json), (error)=> {
      });
      Application.setUserInfo(JSON.stringify(json));
      this.props.navigator.push({
        component: App
      })
    } else {
      Toast.show('账号或者密码不对!');
    }
  }

  //忘记密码
  forgetPassword() {
    this.props.navigator.push({
      component: FindBackPasswordScreen,
      passProps: {
        _callBack_ShowPhoneAndPassword: this.callBack_ShowPhoneAndPassword.bind(this)
      }
    })
  }

  //进入注册界面
  pushToRegisterScreen() {
    this.props.navigator.push({
      component: RegisterScreen,
      passProps: {
        _callBack_ShowPhoneAndPassword: this.callBack_ShowPhoneAndPassword.bind(this)
      }
    })
  }

  //注册成功之后回调
  callBack_ShowPhoneAndPassword(phone, password) {
    this.setState({
      phone: phone,
      password: password
    });
  }

  render() {
    return (
      <Image source={require('../../img/login/login_bg.png')}
             style={{width: widths, height: heights, alignItems: 'center'}}>
        <Text style={{
          fontSize: 16,
          backgroundColor: 'transparent',
          position: 'absolute',
          right: 20,
          top: 20,
          color: 'white'
        }} onPress={()=> {
          this.pushToRegisterScreen();
        }}>注册</Text>
        <Image style={{height: 100, width: 100, borderRadius: 40, marginBottom: 80, marginTop: 100}}
               source={require('../../img/login/app_logo.png')}/>
        <View style={styles.borderInput}>
          <Image source={require('../../img/login/login_account@2x.png')}/>
          <TextInput width={widths - 180}
                     ref={(ref) => {
                       this.accountInput = ref;
                     } }
                     style={styles.input}
                     placeholder="账号"
                     placeholderTextColor="white"
                     clearButtonMode="while-editing"
                     autoCapitalize="none"
                     autoCorrect={false}
                     returnKeyType="next"
                     keyboardType="ascii-capable"
                     onChangeText={(text) => this.setState({phone: text})}
                     value={this.state.phone}
                     underlineColorAndroid="transparent"
                     onSubmitEditing={() => this.passwordInput.focus()}
          />
        </View>
        <View style={[styles.borderInput, {marginTop: 10}]}>
          <Image source={require('../../img/login/login_password@2x.png')}/>
          <TextInput width={widths - 180}
                     ref={(ref) => {
                       this.passwordInput = ref;
                     } }
                     style={styles.input}
                     placeholder="密码"
                     returnKeyType="done"
                     placeholderTextColor="white"
                     keyboardType="ascii-capable"
                     clearButtonMode="never"
                     secureTextEntry={true}
                     autoCapitalize="none"
                     autoCorrect={false}
                     onChangeText={(text) => this.setState({password: text})}
                     value={this.state.password}
                     underlineColorAndroid="transparent"
                     onSubmitEditing={this.onLoginPress.bind(this)}/>
        </View>
        <TouchableHighlight onPress={()=> {
          this.onLoginPress();
        }} style={{marginTop: 20, borderRadius: 20, marginTop: 80}}>
          <View style={{
            width: widths - 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 20
          }}>
            <Text style={{fontSize: 16, color: '#2DA4FC', fontWeight: 'bold'}}>登 陆</Text>
          </View>
        </TouchableHighlight>
        <Text style={{color: 'white', textDecorationLine: 'underline', marginTop: 20}} onPress={()=> {
          this.forgetPassword();
        }}>忘记密码</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  borderInput: {
    width: widths - 80,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  input: {
    color: '#ffffff',
    borderWidth: 0,
    padding: 0,
    marginLeft: 15
  },
});

export default LoginScreen;