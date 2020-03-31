import React from "react";
import { connect } from 'react-redux';
import {getData} from './../../redux/chartsReducer';
import { compose } from "redux";
import Charts from "./Charts";
import ChartsF from "./ChartsF";


class ChartsContainer extends React.Component {
  
  componentDidMount() {
    this.props.getData();
  }

  parseData = () => {
    let AData = [];
    let AAData = [];
    let AAAData = [];
    let BData = [];
    let BAData = [];
    let BABData = [];
    let Amax, AAmax, AAAmax = 0
    this.props.data.map(mass => {
        if (mass[1] === 'Global' && mass[2] === 'A') {
            AData.push(mass[3])
        } else if (mass[1] === 'Global' && mass[2] === 'AA') {
            AAData.push(mass[3])
        }
        else if (mass[1] === 'Global' && mass[2] === 'AAA') {
            AAAData.push(mass[3])
        }
        else if (mass[1] === 'Global' && mass[2] === 'B') {
            BData.push(mass[3])
        }
        else if (mass[1] === 'Global' && mass[2] === 'BA') {
            BAData.push(mass[3])
        }
        else if (mass[1] === 'Global' && mass[2] === 'BAB') {
            BABData.push(mass[3])
        }
        
        //date:new Date(mass[0]), 
    })

    let sortedData = new Map();
    this.props.data.map(mass => {
        if(sortedData.has(mass[1])){
            let newMass = sortedData.get(mass[1])
            newMass.push({category: mass[2], value: mass[3]})
            sortedData.set(mass[1], newMass)
        }else{
            sortedData.set(mass[1], [{category: mass[2], value: mass[3]}])
        }
    })

    console.log('ME SORTED', sortedData)
    debugger;
    let globalMap = new Map();
    let temp = sortedData.get('Global')
    console.log('global', temp)
    temp.map(mass => {
        if(globalMap.has(mass.category)){
            let newMass = sortedData.get(mass.category)
            newMass.push(mass.value)
            globalMap.set(mass.category, newMass)
        }else{
            globalMap.set(mass.category, [mass.value])
        }
    })
    console.log('global map', globalMap)
    

    Amax = AData.indexOf(Math.max(AData));
    AAmax = AAData.indexOf(Math.max(AAData));
    AAAmax = AAAData.indexOf(Math.max(AAAData));



    console.log(AData)
    console.log(AAData)
    console.log(AAAData)


    let data = {
        labels: Array(AData.length).fill(0),
        datasets: [
            {
                label: `${AData.length}`,
                borderColor: "#bae755",
                data: AData,
                display: 'false'
            },
            {
                label: `${AAData.length}`,
                borderColor: "red",
                data: AAData,
                display: 'false'
            },
            {
                label: `${AAAData.length}`,
                borderColor: "yellow",
                data: AAAData,
                display: 'false'
            },
            {
                label: `${BData.length}`,
                borderColor: "#bff755",
                data: BData,
                display: 'false'
            },
            {
                label: `${BAData.length}`,
                borderColor: "blue",
                data: BAData,
                display: 'false'
            },
            {
                label: `${BABData.length}`,
                borderColor: "purple",
                data: BABData,
                display: 'false'
            }
        ]
    }
    return data;
}

  render() {
    return <div>
      <ChartsF data={this.parseData}/>
    </div>
  }
}

let mapStateToProps = (state) => ({
  data: state.chartsData.data,
});

export default compose(
  connect(mapStateToProps, {getData})
)(ChartsContainer)
