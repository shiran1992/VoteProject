import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  ListView,
  RefreshControl,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import VoteItem from './VoteItem';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/ApiUtil');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class FirstPageScreen extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isRefreshing: false
    };
  }

  componentDidMount() {
    this.getVoteList();
  }

  //获取数据
  async getVoteList() {
    this.setState({
      isRefreshing: true
    });
    let url = StaticData.servlet + 'GetAllVoteServlet';
    let json = await API.callAPI(url, {}, {method: 'GET'});
    if (json) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(json),
        isRefreshing: false
      })
    }
  }

  renderRow(rowData, seactionID, rowID) {
    return (
      <VoteItem vote={rowData} key={rowID} navigator={this.props.navigator}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigatorBar title={'投票中心'}/>
        <View style={{flex: 1}}>
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.getVoteList.bind(this)}
              />}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default FirstPageScreen;