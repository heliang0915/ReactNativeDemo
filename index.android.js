/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

// import MyWebView from './app/Web'
import MyWebView from './app/components/IReader'
// ./gradlew assembleRelease

AppRegistry.registerComponent('ReactNatDemo', ()=>MyWebView);
