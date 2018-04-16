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
import EpidemicDetailScreen from './EpidemicDetailScreen';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class EpidemicListScreen extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount(){
        this.getEpidemicList();
    }

    //获取防疫列表
    getEpidemicList() {
        let url = StaticData.servlet + 'GetAllEpidemicsServlet?';
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

    pushToEpidemic(rowData) {
        this.props.navigator.push({
            component: EpidemicDetailScreen,
            passProps: {
                rowData: rowData
            }
        })
    }

    renderRow(rowData, seactionID, rowID) {
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.pushToEpidemic(rowData);
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
                <NavigatorBar title={'防疫'} leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }}/>
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
export default EpidemicListScreen;