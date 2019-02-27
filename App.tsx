import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';

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
  state = {
    text: randomElement(this._comments)
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        this._comments = json.map((commentObj: Comment) => commentObj.body);
      })
      .then(() => this.setState({...this.state, text: randomElement(this._comments)}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
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
