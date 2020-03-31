import React from 'react';
import { Line } from 'react-chartjs-2';
import * as axios from 'axios';

let instance = axios.create({
    baseURL: 'https://raw.githubusercontent.com/kirillzorin/internship2020/master/',
})



class Charts extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        console.log('props', this.props.data)
        axios.get('https://raw.githubusercontent.com/kirillzorin/internship2020/master/data.json')
            .then(response => {
                console.log(response.data);

                this.setState({
                    data: response.data
                });
            })
    }

    parseData = () => {
        let AData = [];
        let AAData = [];
        let AAAData = [];
        let BData = [];
        let BAData = [];
        let BABData = [];
        let Amax, AAmax, AAAmax = 0
        this.state.data.map(mass => {
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
        this.state.data.map(mass => {
            if(sortedData.has(mass[1])){
                let newMass = sortedData.get(mass[1])
                newMass.push({category: mass[2], value: mass[3]})
                sortedData.set(mass[1], newMass)
            }else{
                sortedData.set(mass[1], [{category: mass[2], value: mass[3]}])
            }
        })

        console.log('ME SORTED', sortedData)
        // let globalMap = new Map();
        // let temp = sortedData.get('Global')
        // console.log('global', temp)
        // temp.map(mass => {
        //     if(globalMap.has(mass.category)){
        //         let newMass = sortedData.get(mass.category)
        //         newMass.push(mass.value)
        //         globalMap.set(mass.category, newMass)
        //     }else{
        //         globalMap.set(mass.category, [mass.value])
        //     }
        // })

        

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
        return (
            <div>
                <Line
                    options={{
                        type: 'line',
                        responsive: true,
                        elements: { line: { 
                                        fill: false },
                                    point:{
                                        radius: [5, ...Array(22).fill(0), 5]
                                    } },
                        scales: {
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        }
                    }}
                    data={this.parseData}
                />
            </div>
        )
    }
}

export default Charts;