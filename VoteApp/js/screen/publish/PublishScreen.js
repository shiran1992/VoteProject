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
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import NavigatorBar from '../../common/NavigatorBar';
import EditOptionsScreen from './EditOptionsScreen';
const StaticData = require('../../config/static_data');
const API = require('../../utils/ApiUtil');
let Colors = require('../../utils/colors');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class PublishScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      title: '',
      subTitle: '',
      content: '',
      hideBtn: false
    }
  }

  componentDidMount() {

  }

  onSelectImg(index) {
    if(index === 0){
      ImagePicker.openCamera({
        width: 600,
        height: 360,
        cropping: true,
      }).then(image => {
        this.setState({
          img: image.path
        })
      });
    } else if(index === 1){
      ImagePicker.openPicker({
        width: 600,
        height: 360,
        cropping: true,
        mediaType:'photo',//类型，还可以是 'video', or 'any'
      }).then(image => {
        this.setState({
          img: image.path
        })
      });
    }
  }

  async pushToOption(){
    let url = StaticData.servlet + 'AddVoteServlet';
    let params = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      content: this.state.content,
      uid: JSON.parse(Application.getUserInfo()).uid
    };
    let json = await API.uploadImage(url, this.state.img, params);
    if(json && json.vid){
      this.setState({
        hideBtn: true
      },()=>{
        this.props.navigator.push({
          component: EditOptionsScreen,
          passProps: {
            vid: json.vid
          }
        });
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.commonBG}}>
        <NavigatorBar title={'投票信息'} leftText={'返回'} leftPress={()=>{this.props.navigator.pop();}}/>
        <ScrollView>
          <View style={styles.bgStyle}>
            <View style={styles.container}>
              {this.state.img ?
                <TouchableOpacity onPress={()=> {
                  this.ActionSheet.show();
                }}>
                  <Image style={{width: widths - 80, height: 160}} source={{uri: this.state.img}}/>
                </TouchableOpacity>:
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=> {
                  this.ActionSheet.show();
                }}>
                  <Image source={require('../../img/publish/icon_select_img.png')}/>
                </TouchableOpacity>
                <Text style={{fontSize: 15, color: 'black', marginTop: 18}}>上传投票封面</Text>
                <Text style={{fontSize: 13, color: Colors.separatorLine, marginTop: 10}}>
                  请确保上传图片内容清晰完整
                </Text>
              </View>
                }
            </View>
          </View>
          <View style={{
            paddingVertical: 8, borderWidth: 1, borderColor: Colors.separatorLine,
            borderRadius: 5, margin: 10, marginTop: 20, backgroundColor: 'white'
          }}>
            <TextInput style={{padding: 0, color: Colors.primaryText, paddingHorizontal: 10}}
                       placeholder="标题（必填：12个字以内）"
                       placeholderTextColor="#aaaaaa"
                       clearButtonMode="while-editing"
                       autoCapitalize="none"
                       autoCorrect={false}
                       returnKeyType="next"
                       maxLength={12}
                       keyboardType="ascii-capable"
                       onChangeText={(text) => this.setState({title: text})}
                       value={this.state.title}
                       underlineColorAndroid="transparent"
            />
          </View>
          <View style={{
            paddingVertical: 8, borderWidth: 1, borderColor: Colors.separatorLine,
            borderRadius: 5, margin: 10, backgroundColor: 'white'
          }}>
            <TextInput style={{padding: 0, color: Colors.primaryText, paddingHorizontal: 10}}
                       placeholder="副标题（选填：20个字以内）"
                       placeholderTextColor="#aaaaaa"
                       clearButtonMode="while-editing"
                       autoCapitalize="none"
                       autoCorrect={false}
                       returnKeyType="next"
                       maxLength={20}
                       keyboardType="ascii-capable"
                       onChangeText={(text) => this.setState({subTitle: text})}
                       value={this.state.subTitle}
                       underlineColorAndroid="transparent"
            />
          </View>
          <View style={{
            paddingVertical: 8, borderWidth: 1, borderColor: Colors.separatorLine,
            borderRadius: 5, margin: 10, backgroundColor: 'white'
          }}>
            <TextInput style={{padding: 0, color: Colors.primaryText, paddingHorizontal: 10, height: 60}}
                       placeholder="投票说明（选填：50个字以内）"
                       placeholderTextColor="#aaaaaa"
                       clearButtonMode="while-editing"
                       autoCapitalize="none"
                       autoCorrect={false}
                       returnKeyType="next"
                       maxLength={50}
                       multiline={true}
                       keyboardType="ascii-capable"
                       onChangeText={(text) => this.setState({content: text})}
                       value={this.state.content}
                       underlineColorAndroid="transparent"
            />
          </View>
          {!this.state.hideBtn &&
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight style={{marginTop: 30, borderRadius: 5}} onPress={()=>{this.pushToOption();}}>
              <View style={{width: widths - 40, height: 40, justifyContent: 'center', alignItems: 'center',
                backgroundColor: Colors.buttonBG, borderRadius: 5}}>
                <Text style={{fontSize: 15, color: 'white'}}>下一步</Text>
              </View>
            </TouchableHighlight>
          </View>}
        </ScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['拍照', '从相册选择', '取消']}
          cancelButtonIndex={2}
          onPress={(index) => { this.onSelectImg(index); }}
        />
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
    width: widths - 60,
    height: 180,
    borderStyle: 'dashed',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default PublishScreen;
