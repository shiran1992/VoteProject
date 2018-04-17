import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import FirstPageScreen from './firstpage/FirstPageScreen';
import PostListScreen from './post/PostListScreen';
import ReadListScreen from './read/ReadListScreen';
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
                    title="首页"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_notice.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_notice_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'first'})}>
                  {/*<FirstPageScreen navigator={this.props.navigator}/>*/}
                  <View style={{flex:1, backgroundColor: 'red'}}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'topic'}
                    title="话题"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_classmates.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_classmates_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'topic'})}>
                  {/*<PostListScreen navigator={this.props.navigator}/>*/}
                  <View style={{flex:1, backgroundColor: 'red'}}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'read'}
                    title="阅读"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_read.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_read_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'read'})}>
                  {/*<ReadListScreen navigator={this.props.navigator}/>*/}
                  <View style={{flex:1, backgroundColor: 'red'}}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab == 'me'}
                    title="我的"
                    selectedTitleStyle={{color: "#EA5504"}}
                    renderIcon={() => <Image source={require('../img/tab/tab_me.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../img/tab/tab_me_selected.png')}/>}
                    onPress={() => this.setState({selectedTab: 'me'})}>
                  {/*<UserInfoScreen navigator={this.props.navigator}/>*/}
                  <View style={{flex:1, backgroundColor: 'red'}}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    };
}