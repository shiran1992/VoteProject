import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import FirstPageScreen from './firstpage/FirstPageScreen';
import ReleaseScreen from './publish/ReleaseScreen';
import UserInfoScreen from './me/UserInfoScreen';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'first'
        }
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'first'}
                    title="投票"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_notice.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_notice_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'first'})}>
                  <FirstPageScreen navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'read'}
                    title="发布"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_read.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_read_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'read'})}>
                  <ReleaseScreen navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'me'}
                    title="我的"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_me.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_me_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'me'})}>
                  <UserInfoScreen navigator={this.props.navigator}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    };
}