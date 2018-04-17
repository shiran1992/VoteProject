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
import JoinPostListScreen from './JoinPostListScreen';
import ChangeInfoScreen from './ChangeInfoScreen';
import BabyInfoScreen from './BabyInfoScreen';
import EpidemicListScreen from './EpidemicListScreen';
import NutritionCenterScreen from './NutritionCenterScreen';
let Application = require('../../utils/Application');
let Colors = require('../../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class UserInfoScreen extends Component {
    constructor(props) {
        super(props);
        let userinfo = JSON.parse(Application.getUserInfo());
        this.state = {
            name: userinfo.name || '未填写',
            sex: userinfo.sex || 0,
            age: userinfo.age || '未填写'
        }
    }

    componentDidMount() {

    }

    changeName(name) {
        this.setState({
            name: name
        })
    }

    //进入编辑资料页
    pushToChangeInfo() {
        this.props.navigator.push({
            component: ChangeInfoScreen,
            passProps: {
                changeName: this.changeName.bind(this)
            }
        })
    }

    //进入宝宝信息
    pushToBabyInfo() {
        this.props.navigator.push({
            component: BabyInfoScreen,
            passProps: {

            }
        })
    }

    //进入防疫列表
    pushToEpidemic(){
        this.props.navigator.push({
            component: EpidemicListScreen,
            passProps: {

            }
        })
    }

    //进入营养中心
    pushToNutrition(){
        this.props.navigator.push({
            component: NutritionCenterScreen,
            passProps: {

            }
        })
    }

    //进入参与的话题
    pushToMyPost() {
        this.props.navigator.push({
            component: JoinPostListScreen,
        })
    }

    render() {
        let label = <View style={{height: 10, width: widths, backgroundColor: Colors.commonBG}}/>;
        return (
            <View style={{flex: 1}}>
                <NavigatorBar title={'我的'}/>

                <ScrollView style={styles.container}>
                    <Image source={require('../../img/userinfo/userinfo_bg.png')}
                           style={{
                               width: widths,
                               height: widths / 10 * 6,
                               alignItems: 'center',
                               justifyContent: 'center'
                           }}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../img/userinfo/default_head.jpg')}
                                   defaultSource={require('../../img/userinfo/default_head.jpg')}
                                   style={{width: 70, height: 70, borderRadius: 10}}/>
                            <Text style={{color: 'white', fontSize: 14, marginTop: 15}}>{this.state.name}</Text>
                        </View>
                    </Image>
                    {label}
                    <TouchableHighlight onPress={()=> {
                        this.pushToChangeInfo();
                    }}>
                        <View style={{
                            width: widths,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.separatorLine
                        }}>
                            <Image source={require('../../img/userinfo/icon_change_peopleinfo.png')}
                                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
                            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>修改资料</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {
                        this.pushToBabyInfo();
                    }}>
                        <View style={{
                            width: widths,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.separatorLine
                        }}>
                            <Image source={require('../../img/userinfo/icon_baby.png')}
                                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
                            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>宝宝信息</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {
                        this.pushToEpidemic();
                    }}>
                        <View style={{
                            width: widths,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.separatorLine
                        }}>
                            <Image source={require('../../img/userinfo/icon_epidemic.png')}
                                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
                            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>宝宝防疫</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {
                        this.pushToNutrition();
                    }}>
                        <View style={{
                            width: widths,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.separatorLine
                        }}>
                            <Image source={require('../../img/userinfo/icon_nutrition.png')}
                                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
                            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>营养中心</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {
                        this.pushToMyPost();
                    }}>
                        <View style={{
                            width: widths,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.separatorLine
                        }}>
                            <Image source={require('../../img/userinfo/icon_myclasses.png')}
                                   style={{marginLeft: 10, marginRight: 5, tintColor: Colors.secondaryText}}/>
                            <Text style={{fontSize: 16, color: Colors.primaryText, marginLeft: 20}}>参与的话题</Text>
                        </View>
                    </TouchableHighlight>
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
        fontSize: 14,
        color: Colors.primaryText
    },
    secondText: {
        fontSize: 14,
        color: Colors.secondaryText
    }
});

export default UserInfoScreen;