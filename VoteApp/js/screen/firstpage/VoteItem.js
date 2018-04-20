import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PollDetailScreen from '../vote/PollDetailScreen';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');

class VoteItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pushToDetail(vote) {
    this.props.navigator.push({
      component: PollDetailScreen,
      passProps: {
        vote: vote
      }
    })
  }

  render() {
    let vote = this.props.vote || {};
    return (
      <TouchableOpacity onPress={()=>{this.pushToDetail(vote);}}>
        <View style={styles.container}>
          <View style={styles.border}>
            <Image style={{height: 60, width: 100}} source={{uri: StaticData.servlet + vote.cover}}/>
            <View style={{marginLeft: 10, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: Colors.primaryText}} numberOfLines={1}>{vote.title}</Text>
              <Text style={{fontSize: 12, color: Colors.secondaryText}} numberOfLines={1}>{vote.subtitle}</Text>
              <Text style={{fontSize: 12, color: Colors.secondaryText}} numberOfLines={2}>{vote.desc}</Text>
            </View>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.separatorLine,
    borderWidth: 1,
    backgroundColor: 'white'
  }
});

export default VoteItem;
