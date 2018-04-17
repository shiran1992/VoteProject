import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    TouchableHighlight,
    AsyncStorage,
    ScrollView
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
import Toast from 'react-native-root-toast';
let Application = require('../../utils/Application');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Colors = require('../../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class AddCommentScreen extends Component {
    constructor(props) {
        super(props);
        let userinfo = JSON.parse(Application.getUserInfo());
        this.state = {
            uid: userinfo.uid,
            pid: props.pid,
            content: ''
        }
    }

//提交评论
    addComment() {
        let url = StaticData.servlet + 'AddCommentServlet?';
        let params_json = {
            uid: this.state.uid,
            pid: this.state.pid,
            content: this.state.content
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                this.props.getCommentList();
                this.props.navigator.pop();
                Toast.show('评论成功');
            } else {
                Toast.show('评论失败，请重试！');
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar leftText={'取消'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'编辑评论'} rightText={'完成'} rightPress={()=> {
                    this.addComment()
                }}/>
                <View style={{width: widths, height: 120, backgroundColor: 'white'}}>
                    <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                               numberOfLines={1} maxLength={100}
                               placeholder={'评论内容'}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text)=> {
                                   this.setState({content: text.trim()})
                               }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.commonBG
    },
    commonText: {
        fontSize: 16,
        color: Colors.primaryText
    },
    secondText: {
        fontSize: 14,
        color: Colors.secondaryText
    }
});

export default AddCommentScreen;