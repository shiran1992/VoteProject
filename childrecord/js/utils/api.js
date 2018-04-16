import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';

export function call(url, param, callback) {
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json;charset=UTF-8",
        }),
        body: param
    }).then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        }) .done();
}


