import { Component } from "react";
import { View, ViewStyle } from "react-native";
import { FlexDirectionProperty } from "csstype";

function hue(h: number) {
    return `hsl(${0},100%,50%)`
}

function last(coll: ArrayLike<any>) {
    return coll[coll.length - 1];
}

function reductions<A, E>(coll: ArrayLike<E>, init: A, f: (acc: A,e: E) => A): Array<A> {
    let rxs = [init];
    for (let i = 0; i < coll.length; i++) {
        rxs.push(f(last(rxs), coll[i]));
    }
    return rxs;
}

function weightedRandomIndex(weights: Array<number>) {
    const total = last(weights);
    const target = Math.random() * total;
    const index = weights.filter(v => v <= target).length;
    return index;
};

function mondrianColorPalette() {
    const redYellowBlue = ["#FFF","#F00","#FF0","#00F", "#000", "#AAA"];
    const hueBasis = Math.floor(Math.random() * 360);
    const hslRotated = ["#FFF",hue(hueBasis),hue(hueBasis + 60),hue(hueBasis + 240), "#000", "#AAA"];
    const weights = [12, 14, 16, 18, 19, 20];
    const randomPalette = [redYellowBlue, hslRotated][Math.floor(Math.random() * 2)];
    return () => { return randomPalette[weightedRandomIndex(weights)]; };
}

function generateMondrian(maxDepth: number, complexity: number, orientation: FlexDirectionProperty) {
    const divisions = maxDepth == 0 ? 0 : Math.floor(Math.random() * complexity);
}

interface MondrianProps {
    divisions: number,
    cellStyle: ViewStyle,
    maxDepth: number,
    complexity: number,
    orientation: FlexDirectionProperty,
    childOrientation: FlexDirectionProperty
}

class Mondrian extends Component<MondrianProps> {
    render() {
        if (this.props.divisions == 0) {
            return (
                <View style={this.props.cellStyle}></View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }
}

export {mondrianColorPalette, generateMondrian, weightedRandomIndex};