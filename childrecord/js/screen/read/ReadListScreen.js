import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import WebViewScreen from '../../common/WebViewScreen';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class ReadListScreen extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount(){
        this.getReadList();
    }

    //获取推荐阅读列表
    getReadList() {
        let url = StaticData.servlet + 'GetAllReadServlet?';
        let params_json = {};
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(json)
                })
            }
        });
    }

    pushToReading(url) {
        this.props.navigator.push({
            component: WebViewScreen,
            passProps: {
                uri: url
            }
        })
    }

    renderRow(rowData, seactionID, rowID) {
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.pushToReading(rowData.url);
            }}>
                <View style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.separatorLine
                }}>
                    <Text style={{fontSize: 18}}>{parseInt(rowID) + 1}、{rowData.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title={'阅读'}/>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default ReadListScreen;