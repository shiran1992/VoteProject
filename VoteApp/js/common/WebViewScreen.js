import React, {Component} from 'react';
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
}from'react-native';
import NavigatorBar from './NavigatorBar';
class WebViewScreen extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar leftText={'返回'} leftPress={()=> {
                    this.props.navigator.pop()
                }} title={'推荐阅读'}/>
                <WebView
                    style={styles.webView}
                    source={{uri: this.props.uri}}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b5998',
    },
    webView: {
        height: 350,
    }
});

module.exports = WebViewScreen;