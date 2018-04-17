import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import Toast from 'react-native-root-toast';
const API = require('../../utils/ApiUtil');
const StaticData = require('../../config/static_data');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class FindBackPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeStr: '',
      codeResult: '',
      code: '',
      phone: '',
      password: ''
    }
  }

  componentDidMount() {
    this.createCode();
  }

  //生成验证码
  createCode() {
    let a = parseInt(20 * Math.random());
    let b = parseInt(20 * Math.random());
    this.setState({
      codeStr: a + ' + ' + b + ' = ' + '?',
      codeResult: a + b
    });
  }

  //点击提交按钮
  async onSubmitPress() {
    if (this.state.code == this.state.codeResult) {
      let url = StaticData.servlet + 'ForgetPasswordServlet';
      let params = {
        password: this.state.password,
        phone: this.state.phone
      };
      let json = await API.callAPI(url, params, {method: 'GET'});
      if (json) {
        Toast.show('修改成功');
        this.props._callBack_ShowPhoneAndPassword(this.state.phone, this.state.password);
        this.props.navigator.pop();
      }
    } else {
      Toast.show('验证码不正确');
    }
  }

  render() {
    return (
      <Image source={require('../../img/login/login_bg.png')}
             style={{width: widths, height: heights, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={()=> {
          this.props.navigator.pop();
        }}>
          <Image style={{position: 'absolute', left: 20, top: 20}} source={require('../../img/back.png')}/>
        </TouchableWithoutFeedback>
        <View style={styles.borderInput}>
          <Image source={require('../../img/login/login_account@2x.png')}/>
          <TextInput width={widths - 180}
                     ref={(ref) => {
                       this.accountInput = ref;
                     } }
                     style={styles.input}
                     placeholder="手机"
                     placeholderTextColor="white"
                     clearButtonMode="while-editing"
                     autoCapitalize="none"
                     autoCorrect={false}
                     returnKeyType="next"
                     keyboardType="ascii-capable"
                     onChangeText={(text) => this.setState({phone: text})}
                     value={this.state.account}
                     underlineColorAndroid="transparent"
                     onSubmitEditing={() => this.codeInput.focus()}
          />
        </View>
        <View style={{width: widths - 80, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.borderInput, {width: (widths - 80) / 2}]}>
            <Image source={require('../../img/login/register_code@2x.png')}/>
            <TextInput width={(widths - 180) / 2}
                       ref={(ref) => {
                         this.codeInput = ref;
                       } }
                       style={styles.input}
                       placeholder="验证码"
                       placeholderTextColor="white"
                       clearButtonMode="while-editing"
                       autoCapitalize="none"
                       autoCorrect={false}
                       returnKeyType="next"
                       keyboardType="ascii-capable"
                       onChangeText={(text) => this.setState({code: text})}
                       underlineColorAndroid="transparent"
                       onSubmitEditing={() => this.passwordInput.focus()}
            />
          </View>
          <TouchableWithoutFeedback onPress={()=> {
            this.createCode();
          }}>
            <View style={{
              height: 40,
              width: 100,
              borderColor: 'white',
              borderWidth: 1,
              alignItems: "center",
              justifyContent: 'center',
              borderRadius: 5,
              marginLeft: 20
            }}>
              <Text style={{color: 'white'}}>{this.state.codeStr}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={[styles.borderInput, {marginTop: 10}]}>
          <Image source={require('../../img/login/login_password@2x.png')}/>
          <TextInput width={widths - 180}
                     ref={(ref) => {
                       this.passwordInput = ref;
                     } }
                     style={styles.input}
                     placeholder="新密码"
                     returnKeyType="done"
                     placeholderTextColor="white"
                     keyboardType="ascii-capable"
                     clearButtonMode="never"
                     secureTextEntry={true}
                     autoCapitalize="none"
                     autoCorrect={false}
                     onChangeText={(text) => this.setState({password: text})}
                     value={this.state.password}
                     underlineColorAndroid="transparent"/>
        </View>
        <TouchableHighlight onPress={()=> {
          this.onSubmitPress();
        }} style={{marginTop: 20, borderRadius: 20, marginTop: 80}}>
          <View style={{
            width: widths - 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 20
          }}>
            <Text style={{fontSize: 16, color: '#2DA4FC', fontWeight: 'bold'}}>确认修改</Text>
          </View>
        </TouchableHighlight>
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

export default FindBackPasswordScreen;