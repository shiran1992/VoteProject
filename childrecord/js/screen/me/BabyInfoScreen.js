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
let sex_icon = [
    require('../../img/userinfo/icon_woman_red.png'),
    require('../../img/userinfo/icon_man_blue.png'),
    require('../../img/userinfo/icon_woman_grey.png'),
    require('../../img/userinfo/icon_man_grey.png')
];
class BabyInfoScreen extends Component {
    constructor(props) {
        super(props);
        let babyinfo = Application.getBabyInfo() ? JSON.parse(Application.getBabyInfo()) : {};
        this.state = {
            bid: babyinfo.bid || '',
            uid: JSON.parse(Application.getUserInfo()).uid,
            name: babyinfo.name || '',
            sex: babyinfo.sex || '0',
            birth: babyinfo.birth || '',
            relation: babyinfo.relation || ''
        }
    }

//提交信息
    chageBabyInfo() {
        let params_json = {
            uid: this.state.uid,
            name: this.state.name,
            sex: this.state.sex,
            birth: this.state.birth,
            relation: this.state.relation
        };
        let url = StaticData.servlet + 'AddBabyInfoServlet?';
        if(Application.getBabyInfo()){
            params_json.bid = this.state.bid;
            url = StaticData.servlet + 'ChangeBabyInfoServlet?';
        }
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                Application.setBabyInfo(JSON.stringify(params_json));
                this.props.navigator.pop();
                Toast.show('保存成功');
            } else {
                Toast.show('保存失败，请重试！');
            }
        });
    }

    renderItems(title, rightView, underLineWidth, _onPress) {
        let showView = <View style={{
            width: widths,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: underLineWidth,
            borderBottomColor: Colors.separatorLine,
            paddingHorizontal: 10
        }}>
            <View style={{flex: 1, paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.commonText, {width: 100}]}>{title}</Text>
                {rightView}
            </View>
        </View>;
        if (_onPress) {
            return (
                <TouchableHighlight onPress={()=> {
                    _onPress
                }}>
                    {showView}
                </TouchableHighlight>
            )
        }
        return showView;
    }

//处理显示男
    manageMan() {
        if (this.state.sex == 1) {
            this.setState({
                sex: '0'
            })
        }
    }

//处理显示女
    manageWoman() {
        if (this.state.sex == 0) {
            this.setState({
                sex: '1'
            })
        }
    }

    render() {
        let label = <View style={{height: 10, width: widths, backgroundColor: Colors.commonBG}}/>;
        return (
            <View style={styles.container}>
                <NavigatorBar leftText={'取消'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'编辑宝宝信息'} rightText={'完成'} rightPress={()=> {
                    this.chageBabyInfo()
                }}/>
                <ScrollView>
                    {this.renderItems('姓名', <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                                                       numberOfLines={1} maxLength={16}
                                                       placeholder={this.state.name == '' ? '未填写' : this.state.name}
                                                       underlineColorAndroid={'transparent'}
                                                       onChangeText={(text)=> {
                                                           this.setState({name: text.trim()})
                                                       }}/>,
                        1)}

                    {this.renderItems('性别', <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={this.manageMan.bind(this)}>
                                <Image source={this.state.sex == 0 ? sex_icon[0] : sex_icon[2]}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.manageWoman.bind(this)}>
                                <Image source={this.state.sex == 1 ? sex_icon[1] : sex_icon[3]} style={{marginLeft: 30}}/>
                            </TouchableWithoutFeedback>
                        </View>,
                        1)}

                    {this.renderItems('生日', <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                                                       numberOfLines={1} maxLength={20}
                                                       placeholder={this.state.birth == '' ? '未填写' : this.state.birth}
                                                       underlineColorAndroid={'transparent'}
                                                       onChangeText={(text)=> {
                                                           this.setState({birth: text.trim()})
                                                       }}/>,
                        1)}

                    {this.renderItems('关系', <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                                                       numberOfLines={1} maxLength={10}
                                                       placeholder={this.state.relation == '' ? '未填写' : this.state.relation}
                                                       underlineColorAndroid={'transparent'}
                                                       onChangeText={(text)=> {
                                                           this.setState({relation: text.trim()})
                                                       }}/>,
                    )}
                    <View style={{height: 20}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default BabyInfoScreen;