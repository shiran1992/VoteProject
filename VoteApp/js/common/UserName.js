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
let Application = require('../utils/Application');
let StaticData = require('../config/static_data');
let API = require('../utils/api');
let Colors = require('../utils/colors');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;
class UserName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            name:''
        }
    }

    componentDidMount() {
        this.getNameByUid();
    }

    //通过uid获取name
    getNameByUid() {
        let url = StaticData.servlet + 'GetNameByUidServlet?';
        let params_json = {
            uid: JSON.parse(Application.getUserInfo()).uid
        };
        API.call(url, JSON.stringify(params_json), (json)=> {
            if (json) {
                this.setState({
                    name: json.name
                })
            }
        });
    }

    render() {
        return (
            <Text style={this.props.style}>{this.state.name}</Text>
        );
    }
}

export default UserName;