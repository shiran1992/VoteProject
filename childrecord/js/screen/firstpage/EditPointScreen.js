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
class EditPointScreen extends Component {
    constructor(props) {
        super(props);
        let userinfo = JSON.parse(Application.getUserInfo());
        this.state = {
            uid: userinfo.uid,
            bid: props.bid,
            age: props.age || '',
            weight: props.weight || ''
        }
    }

    componentDidMount() {

    }


//提交
    editComment() {
        if(this.state.age>=36){
            Toast.show('我们只支持36月以内的宝宝哦~');
            return ;
        }
        let params_json = {
            bid: this.state.bid,
            age: this.state.age,
            weight: this.state.weight,
        };
        let url = StaticData.servlet + 'AddGrowServlet?';
        if (this.props.gid) {
            params_json.gid = this.props.gid;
            url = StaticData.servlet + 'EditGrowServlet?';
        }
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                this.props.getGrowList(this.state.bid);
                this.props.navigator.pop();
            }
        });
    }

    //删除增长点
    deleteGrowPoint(){
        let params_json = {
            gid: this.props.gid
        };
        let url = StaticData.servlet + 'DeleteGrowServlet?';
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                this.props.getGrowList(this.state.bid);
                this.props.navigator.pop();
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar leftText={'取消'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'编辑生长点'} rightText={'完成'} rightPress={()=> {
                    this.editComment()
                }}/>
                <View style={styles.inputborder}>
                    <Text style={{fontSize: 16, width: 100, marginRight: 10}}>年龄(单位:月)</Text>
                    <TextInput style={styles.input} numberOfLines={1} maxLength={5} placeholder={this.state.age}
                               underlineColorAndroid={'transparent'} onChangeText={(text)=> {
                        this.setState({age: text.trim()})
                    }}/>
                </View>
                <View style={[styles.inputborder, {marginTop: 10}]}>
                    <Text style={{fontSize: 16, width: 100, marginRight: 10}}>体重(单位:kg)</Text>
                    <TextInput style={styles.input} numberOfLines={1} maxLength={5} placeholder={this.state.weight}
                               underlineColorAndroid={'transparent'} onChangeText={(text)=> {
                        this.setState({weight: text.trim()})
                    }}/>
                </View>
                {this.props.gid ?
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableWithoutFeedback onPress={()=> {
                            this.deleteGrowPoint();
                        }}>
                            <View style={{
                                height: 50,
                                width: 200,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                backgroundColor: 'red'
                            }}>
                                <Text style={{color: 'white', fontSize: 16}}>删除该生长点</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : null}
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
    },
    inputborder: {
        width: widths,
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.separatorLine,
        borderBottomWidth: 1
    },
    input: {
        color: Colors.secondaryText,
        fontSize: 14,
        borderWidth: 1,
        borderColor: Colors.buttonBG,
        height: 50,
        width: 100
    }
});

export default EditPointScreen;