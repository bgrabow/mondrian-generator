import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

function last(coll: ArrayLike<any>) {
    return coll[coll.length - 1];
}

function weightedRandomIndex(weights: Array<number>) {
    const total = last(weights);
    const target = Math.random() * total;
    const index = weights.filter(v => v <= target).length;
    return index;
}

function randomElement(coll: Array<any>) {
    return coll[Math.floor(Math.random() * coll.length)];
}

function forTimes(n: number, f: (n: number) => any) {
    let xs = [];
    for (let i = 0; i < n; i++) {
        xs.push(f(i));
    }
    return xs;
}

const white = "#FFF";
const grey = "#888";
const black = "#000";
type Complexity = Array<number>;
type Orientation = "column" | "row" | "row-reverse" | "column-reverse" | undefined;
interface BodyProps {
    colorPalette: () => string,
    maxDepth: number,
    sizes: Array<number>,
    flexGrow: number,
    divisions: number,
    complexity: Complexity,
    orientation: Orientation
}
interface CellProps { colorPalette: () => string }

export function colorPalette() {
    const redYellowBlue = [
        white,
        "#F00",
        "#FF0",
        "#00F",
        black,
        grey];
    const hueBasis = Math.floor(Math.random() * 360);
    const hslRotated = [
        white,
        `hsl(${hueBasis},100%,50%)`,
        `hsl(${hueBasis + 60},100%,50%)`,
        `hsl(${hueBasis + 240},100%,50%)`,
        black,
        grey];
    const weights = [12, 14, 16, 18, 19, 20];
    const randomPalette = randomElement([redYellowBlue, hslRotated]);
    return () => { return randomPalette[weightedRandomIndex(weights)]; };
}

export function generate(
    key: number,
    complexity: Complexity,
    sizes: Array<number>,
    colorPalette: () => string,
    maxDepth: number,
    orientation: Orientation) {

    const divisions = maxDepth == 0 ? 0 : randomElement(complexity);
    switch (divisions) {
        case 0:
            return (
                <Cell key={key} colorPalette={colorPalette} />
            );
        default:
            return (
                <Body
                    key={key}
                    colorPalette={colorPalette}
                    maxDepth={maxDepth}
                    sizes={sizes}
                    flexGrow={randomElement(sizes)}
                    divisions={divisions}
                    complexity={complexity.concat([1])}
                    orientation={orientation}
                />);
    }
}

class Cell extends Component<CellProps> {
    render() {
        const style = {
            flex: 1,
            borderWidth: 3,
            borderColor: "#000",
            backgroundColor: this.props.colorPalette()
        }
        return (<View style={style} />);
    }
}

class Body extends Component<BodyProps> {
    _childOrientation(orientation: Orientation) {
        return orientation == "column" ? "row" : "column";
    }

    render() {
        const styles = StyleSheet.create({
            bodyStyle: {
                flex: this.props.flexGrow,
                flexDirection: this.props.orientation
            }
        });
        const children = forTimes(this.props.divisions, (i: number) => {

            const result = generate(
                i,
                this.props.complexity,
                this.props.sizes,
                this.props.colorPalette,
                this.props.maxDepth - 1,
                this._childOrientation(this.props.orientation)
            );
            const withKey = { ...result, props: { ...result.props, key: i.toString() } };
            return result;
        });

        return (
            <View style={styles.bodyStyle}>
                {children}
            </View>
        );
    }
}

export default { generate: generate, colorPalette: colorPalette };