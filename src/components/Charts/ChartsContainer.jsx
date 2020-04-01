import React from "react";
import { connect } from 'react-redux';
import { getData } from './../../redux/chartsReducer';
import { compose } from "redux";
import Charts from "./Charts";


class ChartsContainer extends React.Component {

    state = {
        chartid:'',
        scaleMode: false,
        scale: {
            min: 0,
            max: 0,
        }
    }

    componentDidMount() {
        this.props.getData();
    }

    scaleAllToOne = (min, max, chartid) => {
        console.log('limits', min, max)
        if (this.state.chartid === chartid) {
            this.setState({
                chartid:'',
                scaleMode: false,
                scale: {
                    min: min,
                    max: max,
                }
            })
        } else {
            this.setState({
                chartid: chartid,
                scaleMode: true,
                scale: {
                    min: min,
                    max: max,
                }
            })
        }

        //alert(data)
    }

    parseData = () => {

        let sortedData = new Map();
        this.props.data.map(mass => {
            if (sortedData.has(mass[1])) {
                let newMass = sortedData.get(mass[1])
                newMass.push({ category: mass[2], value: mass[3] })
                sortedData.set(mass[1], newMass)
            } else {
                sortedData.set(mass[1], [{ category: mass[2], value: mass[3] }])
            }
        })

        let allDataArray = []

        sortedData.forEach((value, key) => {
            let regionMap = new Map();
            if (sortedData.get(key)) {
                let temp = sortedData.get(key)
                temp.map(mass => {
                    if (regionMap.has(mass.category)) {
                        let newMass = regionMap.get(mass.category)
                        newMass.push(mass.value)
                        regionMap.set(mass.category, newMass)
                    } else {
                        regionMap.set(mass.category, [mass.value])
                    }
                })
            }
            
            let country = key;
            regionMap.forEach((value, key) => {
                let dataset = []
                dataset = [...regionMap.get(key)]
                let color = '#EF666A';
                if (dataset[0] < dataset[dataset.length - 1]) {
                    color = '#6EC168'
                }
                let data = {
                    labels: Array(dataset.length + 1).fill(0),
                    datasets: [
                        {
                            label: `${country} ${key}`,
                            borderColor: color,
                            data: [...dataset],
                            display: 'false'
                        }]
                }

                allDataArray.push(data);
            })
        });

        return allDataArray;
    }

    render() {
        console.log('render')
        let data = this.parseData()
        return <div>
            <h1 style={{textAlign:'center'}}>Charts</h1>
            {!this.state.scaleMode &&
                <div>
                    {data.map(dataset =>
                        <Charts scaleAllToOne={this.scaleAllToOne} 
                            key={JSON.stringify(dataset)} 
                            data={dataset}
                            chartid={dataset.datasets[0].label}
                            max={Math.max(...dataset.datasets[0].data)}
                            min={Math.min(...dataset.datasets[0].data)}
                            active={false} />
                    )}
                </div>}
            {this.state.scaleMode &&
                <div>
                    {data.map(dataset =>
                        <Charts scaleAllToOne={this.scaleAllToOne} 
                            key={JSON.stringify(dataset)} 
                            data={dataset}
                            chartid={dataset.datasets[0].label}
                            max={this.state.scale.max}
                            min={this.state.scale.min}
                            active={dataset.datasets[0].label === this.state.chartid} />
                    )}
                </div>}
        </div>
    }
}

let mapStateToProps = (state) => ({
    data: state.chartsData.data,
});

export default compose(
    connect(mapStateToProps, { getData })
)(ChartsContainer)
