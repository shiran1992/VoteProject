import React, { PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
const StaticData = require('../../config/static_data');
const API = require('../../utils/ApiUtil');
let Colors = require('../../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class OptionItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      title: '',
      img: '',
      status: 0
    };
  }

  //选择图片
  onSelectImg(index) {
    if(index === 0){
      ImagePicker.openCamera({
        width: 360,
        height: 300,
        cropping: true,
      }).then(image => {
        this.setState({img: image.path});
      });
    } else if(index === 1){
      ImagePicker.openPicker({
        width: 360,
        height: 300,
        cropping: true,
        mediaType:'photo',//类型，还可以是 'video', or 'any'
      }).then(image => {
        this.setState({img: image.path});
      });
    }
  }

  //添加选择
  async addOption(){
    let url = StaticData.servlet + 'AddOptionServlet';
    let params = {
      title: this.state.title,
      vid: this.props.vid
    };
    let json = await API.uploadImage(url, this.state.img, params);
    if(json){
      this.setState({
        status: 1
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{this.props.delOption && this.props.delOption(i);}}>
          <Image style={{height: 20, width: 20, marginLeft: 5}}
                 source={require('../../img/publish/icon_delete.png')}/>
        </TouchableOpacity>
        <View style={{
          paddingVertical: 8, borderWidth: 1, borderColor: Colors.separatorLine,
          borderRadius: 5,  backgroundColor: 'white',
        }}>
          <TextInput style={{padding: 0, width: widths - 140,
            color: Colors.primaryText, paddingHorizontal: 10}}
                     placeholder="选项标题（必填：12个字以内）"
                     placeholderTextColor="#aaaaaa"
                     clearButtonMode="while-editing"
                     autoCapitalize="none"
                     autoCorrect={false}
                     returnKeyType="next"
                     maxLength={12}
                     keyboardType="ascii-capable"
                     onChangeText={(text) => {
                       this.setState({title: text});}
                     }
                     value={this.state.title}
                     underlineColorAndroid="transparent"
          />
        </View>
        <TouchableOpacity onPress={()=>{this.ActionSheet.show();}}>
          <Image style={{height: 40, width: 50, marginLeft: 5}}
                 source={this.state.img ? {uri: this.state.img} :
                   require('../../img/publish/icon_upload.png')}/>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.state.status ? <Text style={{fontSize: 12, color: Colors.secondaryText}}>已添加</Text>
            :<Text style={{fontSize: 14, color: Colors.buttonBG}} onPress={()=>{this.addOption();}}>添加</Text>}
        </View>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 10
  },
});

export default OptionItem;
