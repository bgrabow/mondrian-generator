import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { mondrianColorPalette } from './Mondrian';

function randomElement(coll: ArrayLike<any>) {
  return coll[Math.floor(Math.random() * coll.length)];
}

interface Comment {
  body: string,
  email: string,
  id: number,
  name: string,
  postId: number
}

export default class App extends React.Component {
  _comments = [];
  newColor = mondrianColorPalette();
  state = {
    text: randomElement(this._comments),
    color: "no color"
  }

  updateText() {
    this.setState({...this.state, text: randomElement(this._comments), color: this.newColor()});
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        this._comments = json.map((commentObj: Comment) => commentObj.body);
      })
      .then(() => this.updateText());
  }

  render() {
    return (
      <View style={styles.container} onTouchStart={() => this.updateText()}>
        <Text>{this.state.text}</Text>
        <Text>{this.state.color}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
