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
import TopicDetatilScreen from '../post/TopicDetatilScreen';
let colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class JoinPostListScreen extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            topics: [],
            isRefreshing: true,
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this.getTopicList();
    }

    //获取话题列表
    getTopicList() {
        let url = StaticData.servlet + 'GetPostsByUidServlet?';
        let params_json = {
            uid:JSON.parse(Application.getUserInfo()).uid
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isRefreshing: false,
                    topics: json,
                    dataSource: ds.cloneWithRows(json)
                });
            }
        });
    }

    onPressTopic(topic) {
        this.props.navigator.push({
            component: TopicDetatilScreen,
            passProps: {
                topic: topic
            }
        });
    }

    //下拉刷新
    async _onRefresh() {
        this.getTopicList();
    }

    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this.onPressTopic(rowData)}
                                style={{marginTop: 2, borderRadius: 5}}>
                <View style={{
                    width: (widths - 22) / 2,
                    height: (widths - 22) / 2 + 30,
                    borderRadius: 5,
                    overflow: 'hidden',
                    backgroundColor: 'white'
                }}>
                    <Image
                        style={{width: (widths - 22) / 2, height: (widths - 22) / 2, backgroundColor: '#e0e0e0'}}
                        source={{uri: StaticData.servlet + rowData.image}}
                        defaultSource={require('../../img/userinfo/default_company_head.jpg')}/>
                    <View style={{
                        height: 30,
                        width: (widths - 22) / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: colors.primaryText,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} numberOfLines={1}>{rowData.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'参与的话题'}/>
                <ListView
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderRow={this._renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="gray"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="gray"/>
                    }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
});
export default JoinPostListScreen;