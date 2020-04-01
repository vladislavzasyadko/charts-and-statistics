import React from 'react';
import { Line } from 'react-chartjs-2';
import h from './Charts.module.scss'


class Charts extends React.Component {

    state = {
        hovered:false,
    }

    handleClick = () => {
        let max = Math.max(...this.props.data.datasets[0].data)
        let min = Math.min(...this.props.data.datasets[0].data)
        this.props.scaleAllToOne(min, max, this.props.chartid)
    }

    radiusCalculation = () => {
        let points = this.props.data.datasets[0].data
        let radiuses = Array(points.length).fill(0)
        let maxIndex = points.indexOf(Math.max(...points))
        let minIndex = points.indexOf(Math.min(...points))

        radiuses[maxIndex] = 5
        radiuses[minIndex] = 5
        radiuses[radiuses.length - 1] = 5

        let colors = Array(points.length).fill(0)
        colors[maxIndex] = 'green'
        colors[minIndex] = 'red'
        colors[radiuses.length - 1] = 'blue'
        return {radiuses: radiuses, colors: colors}
    }

    showAverageValue = () => {
        const array = this.props.data.datasets[0].data;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let sum = array.reduce(reducer)
        return parseInt(sum/array.length)
    }

    setHovered = () => {
        this.setState({
            hovered: true,
        })
    }

    unsetHovered = () => {
        this.setState({
            hovered: false,
        })
    }


    render() {
        let info = this.radiusCalculation()
        let average = this.showAverageValue()
        return (
            <div onMouseEnter={this.setHovered}
                onMouseLeave={this.unsetHovered}
                style={{border: this.props.active ? '2px solid #6EC168':'none'}} 
                className={h.container} 
                onClick={this.handleClick}>
                {this.state.hovered && <div className={h.average}>avg: {average}</div>}
                <Line
                    options={{
                        type: 'line',
                        responsive: true,
                        elements: {
                            line: {
                                fill: false
                            },
                            point: {
                                radius: info.radiuses,
                                backgroundColor: info.colors
                            }
                        },
                        scales: {
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    min: this.props.min*0.5,//magic numbers just to see all the lines fully without cutting off
                                    max: this.props.max*1.1,
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
                    data={this.props.data}
                /></div>
        )
    }
}

export default Charts