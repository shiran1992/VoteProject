import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import MyVoteListScreen from './MyVoteListScreen';
import LastVoteListScreen from './LastVoteListScreen';
let Application = require('../../utils/Application');
let Colors = require('../../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    let userinfo = JSON.parse(Application.getUserInfo());
    this.state = {
      name: userinfo.name || '未填写',
      sex: userinfo.sex || 0,
      age: userinfo.age || '未填写'
    }
  }

  componentDidMount() {

  }

  changeName(name) {
    this.setState({
      name: name
    })
  }

  //进入我创建的投票
  pushToMyVote() {
    this.props.navigator.push({
      component: MyVoteListScreen,
    })
  }

  //进入我的投票记录
  pushToLastVote(){
      this.props.navigator.push({
        component: LastVoteListScreen,
      })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.commonBG}}>
        <NavigatorBar title={'我的'}/>
        <View style={{marginTop: 40, marginHorizontal: 20, alignItems: 'center'}}>
          <View style={{
            width: widths - 40, height: 120, borderWidth: 1,
            borderColor: '#e0e0e0', marginTop: 35, justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'white'
          }}>
            <Text style={{fontSize: 16}}>{this.state.name}</Text>
          </View>
          <Image source={require('../../img/userinfo/default_head.jpg')}
                 defaultSource={require('../../img/userinfo/default_head.jpg')}
                 style={{width: 70, height: 70, borderRadius: 35, borderColor: '#e0e0e0', borderWidth: 2, top: -155}}/>

        </View>
        <TouchableHighlight onPress={()=> {this.pushToLastVote();}}>
          <View style={{
            width: widths,
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: Colors.separatorLine
          }}>
            <Image source={require('../../img/userinfo/icon_last_record.png')}
                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>历史投票记录</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{marginTop: 10}} onPress={()=> {this.pushToMyVote();}}>
          <View style={{
            width: widths,
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: Colors.separatorLine
          }}>
            <Image source={require('../../img/userinfo/icon_my_record.png')}
                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>我创建的投票</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commonText: {
    fontSize: 14,
    color: Colors.primaryText
  },
  secondText: {
    fontSize: 14,
    color: Colors.secondaryText
  }
});

export default UserInfoScreen;