import { Component } from "react";
import { View, StyleSheet } from "react-native";

function last(coll: ArrayLike<any>) {
    return coll[coll.length - 1];
}

function weightedRandomIndex(weights: Array<number>) {
    const total = last(weights);
    const target = Math.random() * total;
    const index = weights.filter(v => v <= target).length;
    return index;
};

function mondrianColorPalette() {
    const redYellowBlue = [
        "#FFF",
        "#F00",
        "#FF0",
        "#00F",
        "#000",
        "#AAA"];
    const hueBasis = Math.floor(Math.random() * 360);
    const hslRotated = [
        "#FFF",
        `hsl(${hueBasis},100%,50%)`,
        `hsl(${hueBasis+60},100%,50%)`,
        `hsl(${hueBasis+240},100%,50%)`,
        "#000",
        "#AAA"];
    const weights = [12, 14, 16, 18, 19, 20];
    const randomPalette = randomElement([/* redYellowBlue, */ hslRotated]);
    return () => { return randomPalette[weightedRandomIndex(weights)]; };
}

function childOrientation(orientation: Orientation) {
    return orientation == "column" ? "row" : "column";
}

function randomElement(coll: Array<any>) {
    return coll[Math.floor(Math.random() * coll.length)];
}

function generateMondrian(
    complexity: number,
    sizes: Array<number>,
    colorPalette: () => string,
    maxDepth: number,
    orientation: Orientation) {

    const divisions = maxDepth == 0 ? 0 : Math.floor(Math.random() * complexity);
    switch (divisions) {
        case 0:
            return (
                <MondrianCell colorPalette={colorPalette}/>
            );
        default:
            return (
                <MondrianBody
                    colorPalette={colorPalette}
                    maxDepth={maxDepth}
                    sizes={sizes}
                    flexGrow={randomElement(sizes)}
                    divisions={divisions}
                    complexity={complexity}
                    orientation={orientation}
                />);
    }
}

type Orientation = "column" | "row" | "row-reverse" | "column-reverse" | undefined;

interface MondrianBodyProps {
    colorPalette: () => string,
    maxDepth: number,
    sizes: Array<number>,
    flexGrow: number,
    divisions: number,
    complexity: number,
    orientation: Orientation
}

function forTimes<T>(n: number, f: (n: number)=>T):Array<T> {
    let xs=[];
    for(let i=0; i<n; i++) {
        xs.push(f(i));
    }
    return xs;
}

interface MondrianCellProps {
    colorPalette: () => string
}

class MondrianCell extends Component<MondrianCellProps> {
    render() {
        const style = {
            flex: 1,
            borderWidth: 6,
            borderColor: "#000",
            backgroundColor: this.props.colorPalette()
        }
        return(<View style={style}/>);
    }
}

class MondrianBody extends Component<MondrianBodyProps> {
    render() {
        const styles = StyleSheet.create({
            bodyStyle: {
                flex: this.props.flexGrow,
                flexDirection: this.props.orientation
            }
        });
        return (
            <View style={styles.bodyStyle}>
                {forTimes(this.props.divisions,(i: number)=>{
                    Object.assign(
                        generateMondrian(
                            this.props.complexity,
                            this.props.sizes,
                            this.props.colorPalette,
                            this.props.maxDepth - 1,
                            childOrientation(this.props.orientation)
                            ),
                        {key: i})
                })}
            </View>
        );
    }
}

export { mondrianColorPalette, generateMondrian, weightedRandomIndex };