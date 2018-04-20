import React, { PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/ApiUtil');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class HadVotedView extends PureComponent {
  constructor(props) {
    super(props);
    this.state={

    };
  }

  renderItem(){
    return this.props.options.map((option, i)=>{
      return (
        <View key={i} style={styles.container}>
          <View style={styles.border}>
            <View style={{paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: Colors.buttonBGPress}}>
              <Text style={{fontSize: 14, color: Colors.buttonBGPress}}>{option.num + '票'}</Text>
            </View>
            <Image style={{height: 60, width: 60, marginLeft: 10}}
                   source={{uri: StaticData.servlet + option.img}}/>
            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 10}}
                  numberOfLines={1}>{option.title}</Text>
          </View>
        </View>
      )
    });
  }

  render() {
    return (
      <View>
        {this.renderItem()}
      </View>
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

export default HadVotedView;
