import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TdeeForm from './src/components/tdeeform';

class App extends React.Component {

  /**
   * void main.
   *
   * @access public
   */
  render = () => {

    return (
      <View style={styles.container}>
        <Image source={require('./src/assets/exercise-icon-19.png')} style={{width: 100, height: 100}}/>
        <Text>Calculate your TDEE.</Text>
      <TdeeForm/>
     </View>
    );

  }
}

const styles = StyleSheet.create({

  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'

  },

});

export default App;
