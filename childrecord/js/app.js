import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    AsyncStorage,
    Navigator
} from 'react-native';
import WelcomeScreen from './screen/welcome/WelcomeScreen';
function renderScene(route, navigator) {
    return <route.component route={route} navigator={navigator}/>;
}
class app extends Component {
    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    constructor(props) {
        super(props);
    }

    render() {
        const initialRoute = {
            component: WelcomeScreen
        };
        return (
            <Navigator
                initialRoute={initialRoute}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.passProps} navigator={navigator}/>
                }}/>
        )
    };
}

AppRegistry.registerComponent('childrecord', () => app);
module.exports = app;