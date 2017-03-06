import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  Button,
  View
} from 'react-native';
import Sound from 'react-native-sound'
import {AudioRecorder, AudioUtils} from 'react-native-audio'

export default class AudioAssets extends Component {

  constructor(props) {
    super(props);
    this.play = this.play.bind(this)
  }

  async play (fileName) {

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      // var sound = new Sound(this.state.audioPath, '', (error) => {

      var initialPath = (Platform.OS === 'ios') ? AudioUtils.MainBundlePath : AudioUtils.DocumentDirectoryPath
      var sound = new Sound(initialPath + '/' + fileName, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native Assets
        </Text>
        <Button title="Play Audio 1" onPress={() => this.play('organfinale.mp3')}/>
        <Button title="Play Audio 2" onPress={() => this.play('piano.mp3')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

