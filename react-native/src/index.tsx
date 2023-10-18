import * as React from 'react';
import { Component } from 'react-simplified';
import { View, Text, TextInput } from 'react-native';
import moji from 'moji-translate';

class Card extends Component<{ title?: string }> {
  render() {
    return (
      <View
        style={{
          borderRadius: 6,
          backgroundColor: '#fff',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          margin: 5,
        }}
      >
        <Text style={{ margin: 10, fontSize: 24 }}>{this.props.title}</Text>
        <Text style={{ margin: 10, fontSize: 16 }}>{this.props.subtitle}</Text>
        <View style={{ fontSize: 14, padding: 5, margin: 10 }}>{this.props.children}</View>
      </View>
    );
  }
}

export class App extends Component {
  input = 'Hello World';

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card title="Welcome" subtitle="Type something and get it translated to emoji!">
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={this.input}
            onChangeText={(text) => (this.input = text)}
          ></TextInput>
          <Text style={{ padding: 10 }}>{moji.translate(this.input)}</Text>
        </Card>
      </View>
    );
  }
}
