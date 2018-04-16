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
]
class ChangeStudentInfoScreen extends Component {
    constructor(props) {
        super(props);
        let userinfo = JSON.parse(Application.getUserInfo());
        this.state = {
            name: userinfo.name || '',
            sex: userinfo.sex || 0,
            age: userinfo.age || '',
            phone: userinfo.phone || '',
            password: userinfo.password,
            uid: userinfo.uid,
        }
    }

//提交信息
    chageUserInfo() {
        let url = StaticData.servlet + 'ChangeInfoServlet?';
        let params_json = {
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            phone: this.state.phone,
            password: this.state.password,
            uid: this.state.uid
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                this.props.changeName(this.state.name);
                Application.setUserInfo(JSON.stringify(params_json));
                this.props.navigator.pop();
                Toast.show('修改成功');
            } else {
                Toast.show('修改失败，请重试！');
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
                sex: 0
            })
        }
    }

//处理显示女
    manageWoman() {
        if (this.state.sex == 0) {
            this.setState({
                sex: 1
            })
        }
    }

    render() {
        let label = <View style={{height: 10, width: widths, backgroundColor: Colors.commonBG}}/>;
        return (
            <View style={styles.container}>
                <NavigatorBar leftText={'取消'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'编辑资料页'} rightText={'完成'} rightPress={()=> {
                    this.chageUserInfo()
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

                    {this.renderItems('年龄', <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                                                       numberOfLines={1} maxLength={11}
                                                       placeholder={this.state.age == '' ? '未填写' : this.state.age}
                                                       underlineColorAndroid={'transparent'}
                                                       onChangeText={(text)=> {
                                                           this.setState({age: text.trim()})
                                                       }}/>,
                        1)}

                    {this.renderItems('电话', <TextInput style={{flex: 1, color: Colors.secondaryText, fontSize: 14}}
                                                       numberOfLines={1} maxLength={11}
                                                       placeholder={this.state.phone == '' ? '未填写' : this.state.phone}
                                                       underlineColorAndroid={'transparent'}
                                                       onChangeText={(text)=> {
                                                           this.setState({phone: text.trim()})
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

export default ChangeStudentInfoScreen;