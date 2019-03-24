import React from 'react';
import { View, Text } from 'react-native';
const analytics = require('./instancias/analytics');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    analytics.setClient('35009a79-1a05-49d7-b876-2b884d0f825b');
  }

  render() {
    return (
      <View>
        <Text>Ola</Text>
      </View>
    );
  }
}
