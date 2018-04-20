import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Toast from 'react-native-root-toast';
import NavigatorBar from '../../common/NavigatorBar';
import OptionsItem from './OptionsItem';
import HadVotedView from './HadVotedView';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/ApiUtil');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class PollDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectOid: '',
      hasVoted: false
    };
  }

  componentDidMount() {
    this.getOptions();
  }

  async getOptions() {
    let url = StaticData.servlet + 'GetOptionByVidServlet';
    let params = {
      vid: this.props.vote.vid,
      uid: JSON.parse(Application.getUserInfo()).uid
    };
    let json = await API.callAPI(url, params, {method: 'GET'});
    if (json && json[0].num === undefined) {
      this.setState({
        options: json
      });
      this.options = json;
    } else {
      this.setState({
        hasVoted: true,
        options: json
      });
    }
  }

  //投票
  async doVote(){
    let url = StaticData.servlet + 'DoVoteServlet';
    let params = {
      oid: this.state.selectOid,
      uid: JSON.parse(Application.getUserInfo()).uid,
      vid: this.props.vote.vid
    };
    let json = await API.callAPI(url, params, {method: 'GET'});
    if (json) {
      Toast.show('投票成功');
      this.props.navigator.pop();
    }
  }

  renderOptions() {
    return this.state.options.map((option, i)=> {
      return (
        <View key={i}>
          <OptionsItem selectOid={this.state.selectOid} option={option} callBack={(oid)=> {
            this.callBack(oid);
          }}/>
        </View>
      );
    })
  }

  callBack(oid) {
    this.setState({
      selectOid: oid
    });
  }

  render() {
    let vote = this.props.vote || {};
    return (
      <ScrollView>
        <View style={styles.container}>
          <NavigatorBar title={'投票'} leftText={'返回'} leftPress={()=>{this.props.navigator.pop();}}/>
          <Image style={{width: widths, height: widths / 5 * 3}}
                 source={{uri: StaticData.servlet + vote.cover}}/>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 16, color: Colors.primaryText}}>{vote.title}</Text>
            <Text style={{fontSize: 14, color: Colors.secondaryText}}>{vote.subtitle}</Text>
            <Text style={{fontSize: 12, color: Colors.secondaryText}}>{vote.desc}</Text>
          </View>
          <View style={{height: 10, backgroundColor: '#e0e0e0'}}/>
          {this.state.hasVoted ?
            <View>
              <HadVotedView options={this.state.options}/>
            </View>:
            <View>
              {this.renderOptions()}
              <View style={{alignItems: 'center'}}>
                <TouchableHighlight style={{marginTop: 30, borderRadius: 5}} onPress={()=>{this.doVote();}}>
                  <View style={{width: widths - 40, height: 40, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.buttonBGPress, borderRadius: 5}}>
                    <Text style={{fontSize: 15, color: 'white'}}>投出一票</Text>
                  </View>
                </TouchableHighlight>
              </View>
          </View>}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.commonBG
  },
});

export default PollDetailScreen;