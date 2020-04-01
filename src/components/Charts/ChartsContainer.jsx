import React from "react";
import { connect } from 'react-redux';
import { getData } from './../../redux/chartsReducer';
import { compose } from "redux";
import Charts from "./Charts";


class ChartsContainer extends React.Component {

    componentDidMount() {
        this.props.getData();
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

        //console.log('ME SORTED', sortedData)
        this.data = sortedData;
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
            //console.log(`global map ${key} `, regionMap)
            let country = key;
            regionMap.forEach((value, key) => {
                let dataset = []
                dataset = [...regionMap.get(key)]
                //console.log(`I am dataset for ${country} ${key} `,dataset)
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

        console.log('ME HAB ALL DATA ', allDataArray)

        // Amax = AData.indexOf(Math.max(AData));
        // AAmax = AAData.indexOf(Math.max(AAData));
        // AAAmax = AAAData.indexOf(Math.max(AAAData));

        return allDataArray;
    }

    render() {
        let data = this.parseData()
        return <div>
            {data.map(dataset =>
            <Charts key={JSON.stringify(dataset)} data={dataset} />
            )}
        </div>
    }
}

let mapStateToProps = (state) => ({
    data: state.chartsData.data,
});

export default compose(
    connect(mapStateToProps, { getData })
)(ChartsContainer)
