import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import Mondrian from './Mondrian';

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
  newColor = Mondrian.colorPalette();
  state = {
    ...this.randomState()
  }

  randomState() {
    return {
      complexity: this.randomComplexity(),
      sizes: this.randomSizes(),
      colorPalette: Mondrian.colorPalette(),
      maxDepth: this.randomMaxDepth(),
      primaryOrientation: this.randomOrientation()
    }
  }

  randomComplexity() {
    return [2, 3];
  }

  randomSizes() {
    return [1, 2, 3, 4];
  }

  randomMaxDepth() {
    return randomElement([2, 3, 4]);
  }

  randomOrientation() {
    return randomElement(["column", "row"]);
  }

  refreshDesign() {
    this.setState({
      ...this.state,
      ...this.randomState()
    })
  }

  render() {
    const content =
      <View style={{ flex: 1, flexDirection: "row" }}>
        {Mondrian.generate(
          0,
          this.state.complexity,
          this.state.sizes,
          this.state.colorPalette,
          this.state.maxDepth,
          this.state.primaryOrientation)}
      </View>;
    return (
      <View style={styles.container} onTouchStart={() => this.refreshDesign()}>
        {content}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24
  },
});
