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
import UserName from '../../common/UserName';
let Colors = require('../../utils/colors');

class CommentListView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.list),
        };
    }

    componentWillReceiveProps(nextProps) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.list),
        })
    }

    //将时间戳转化成时间
    getLocalTime(ns) {
        let data = new Date(parseInt(ns));
        let co_y = data.getFullYear();
        let co_m = data.getMonth()+1;
        let co_d = data.getDate();

        let now = new Date();
        let to_y = now.getFullYear();
        let to_m = now.getMonth()+1;
        let to_d = now.getDate();
        if(co_y == to_y && co_m == to_m && co_d == to_d ){
            return data.getHours()+':'+data.getMinutes();
        }else if ((now.getTime()-parseInt(ns))/1000/60/60<48){
            return (now.getTime()-parseInt(ns))/1000/60/60+'小时前';
        }else {
            return co_y+'/'+co_m+'/'+co_d;
        }
       // return new Date(parseInt(ns)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }

    renderRow(rowData, seactionID, rowID) {
        return (
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: Colors.separatorLine
            }}>
                <View style={{flex: 1}}>
                    <UserName uid={rowData.uid} style={{fontSize: 18, color: Colors.buttonBG}}/>
                    <Text style={{fontSize: 14, color: Colors.primaryText}}>{rowData.content}</Text>
                </View>
                <Text style={{fontSize: 12, color: Colors.primaryText}}>{this.getLocalTime(rowData.createtime)}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
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
export default CommentListView;