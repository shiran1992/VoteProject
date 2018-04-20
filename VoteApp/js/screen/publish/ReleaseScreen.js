import React, { Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import PublishScreen from './PublishScreen';
let Colors = require('../../utils/colors');

class ReleaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state={

    };
  }

  pushToVoteInfo(){
    this.props.navigator.push({
      component: PublishScreen,
      passProps: {

      }
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.commonBG}}>
        <NavigatorBar title={'发布'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>{this.pushToVoteInfo();}}>
            <Image source={require('../../img/publish/icon_add@2x.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 16, color: Colors.primaryText, marginTop: 20, width: 240}}>
            发布成功之后，投票信息将公布给大家，请保证发布信息真实无误
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.commonBG
  },
});

export default ReleaseScreen;
