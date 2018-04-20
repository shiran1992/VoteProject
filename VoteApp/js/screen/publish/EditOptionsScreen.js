import React, {Component} from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Toast from 'react-native-root-toast';
import NavigatorBar from '../../common/NavigatorBar';
import OptionItem from './OptionItem';
const StaticData = require('../../config/static_data');
const API = require('../../utils/ApiUtil');
let Colors = require('../../utils/colors');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class EditOptionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{title0: '', img0: '', status0: 0}]
    }
  }

  componentDidMount() {

  }

  //新增
  addOption(){
    let options = Object.assign([], this.state.options);
    let len = options.length;
    options.push({['title' + len] : '', ['img' + len]: '', ['status' + len]: 0});
    this.setState({
      options: options
    })
  }

  //删除
  delOption(index){
    if(this.state.options.length > 1){
      let options = Object.assign([], this.state.options);
      options.splice(index, 1);
      this.setState({
        options: options
      })
    } else {
      Toast.show('投票选项不得少于1个');
    }
  }

  renderCell(options){
    return options.map((option, i)=>{
      return (
        <OptionItem key={i} vid={this.props.vid} option={option} delOption={(i)=>{this.delOption(i);}}/>
      )
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.commonBG}}>
        <NavigatorBar title={'投票选项'}
                      leftText={'返回'} leftPress={()=>{this.props.navigator.pop();}}/>
        <ScrollView>
          {this.renderCell(this.state.options)}
          <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.addOption();}}>
            <View style={{height: 40, width: 60, borderWidth: 1, borderColor: Colors.separatorLine, borderRadius: 5,
            justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: Colors.secondaryText}}>新增</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
  bgStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 15,
    marginTop: 20
  },
  container: {
    borderStyle: 'dashed',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    paddingTop: 27,
    paddingBottom: 24
  },
});

export default EditOptionsScreen;

