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
import AddCommentScreen from './AddCommentScreen';
import CommentListView from './CommentListView';
let API = require('../../utils/api');
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class TopicDetatilScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getCommentList();
    }

    //获取列表
    getCommentList() {
        let url = StaticData.servlet + 'GetCommentByPidServlet?';
        let params_json = {
            pid: this.props.topic.pid
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
               this.setState({
                   list: json
               })
            }
        });
    }

    pushAddComment() {
        this.props.navigator.push({
            component: AddCommentScreen,
            passProps: {
                pid: this.props.topic.pid,
                getCommentList: this.getCommentList.bind(this)
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar title={'话题详情'} leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }}/>
                <ScrollView style={styles.container}>
                    <Image style={{width: widths, height: widths / 2}}
                           source={{uri: StaticData.servlet + this.props.topic.image}}
                           defaultSource={require('../../img/userinfo/default_company_head.jpg')}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 10,
                            backgroundColor: 'black',
                            opacity: 0.5
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: 'white',
                                fontWeight: 'bold'
                            }}>{this.props.topic.title}</Text>
                            <Text style={{fontSize: 12, color: 'white', marginTop: 5}}>{this.props.topic.content}</Text>
                        </View>
                    </Image>
                    <CommentListView list={this.state.list}/>
                </ScrollView>
                <View style={{
                    width: widths,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    backgroundColor: Colors.commonBG
                }}>
                    <Text style={{fontSize: 18, color: Colors.buttonBG}} onPress={()=> {
                        this.pushAddComment();
                    }}>发表评论</Text>
                </View>
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

export default TopicDetatilScreen;