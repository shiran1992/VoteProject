import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import NavigatorBar from '../../common/NavigatorBar';
let Colors = require('../../utils/colors');
let StaticData = require('../../config/static_data');
let API = require('../../utils/api');
let Application = require('../../utils/Application');
let Dimensions = require('Dimensions');
let widths = Dimensions.get('window').width;
let heights = Dimensions.get('window').height;

class EpidemicDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.rowData.title,
            content: props.rowData.content
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title={'防疫详情'} leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }} />
                <View style={{flex:1,padding:10}}>
                    <View style={{
                        width: widths - 20,
                        height: 40,
                        justifyContent: 'center',
                        borderColor: Colors.separatorLine,
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingHorizontal: 5,
                        marginTop: 20
                    }}>
                        <Text style={{fontSize: 16, color: Colors.primaryText}}>{this.state.title}</Text>
                    </View>
                    <View style={{
                        width: widths - 20,
                        height: 120,
                        justifyContent: 'center',
                        borderColor: Colors.separatorLine,
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingHorizontal: 5,
                        marginTop: 50
                    }}>
                        <Text style={{fontSize: 16, color: Colors.primaryText}}>{this.state.content}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default EpidemicDetailScreen;