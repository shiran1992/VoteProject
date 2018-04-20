import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/ApiUtil');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class OptionsItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false
    };
  }

  componentDidMount(){
    //this.getSelected();
  }

  async getSelected(){
    let url = StaticData.servlet + 'GetIsVotedServlet';
    let params = {
      oid: this.props.option.oid,
      uid: JSON.parse(Application.getUserInfo()).uid
    };
    let json = await API.callAPI(url, params, {method: 'GET'});
    if (json) {
      this.setState({
        isSelect: json
      });
    }
  }

  render() {
    let option = this.props.option || {};
    let selected= require('../../img/vote/icon_select@2x.png');
    let unSelect= require('../../img/vote/icon_unselect@2x.png');
    return (
      <TouchableOpacity onPress={()=>{this.props.callBack && this.props.callBack(option.oid);}}>
        <View style={styles.container}>
          <View style={styles.border}>
            <Image style={{marginRight: 10}} source={option.oid == this.props.selectOid ? selected : unSelect}/>
            <Image style={{height: 60, width: 60}} source={{uri: StaticData.servlet + option.img}}/>
            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 10}}
                  numberOfLines={1}>{option.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.separatorLine,
    borderWidth: 1,
    backgroundColor: 'white'
  }
});

export default OptionsItem;

