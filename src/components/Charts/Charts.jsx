import React from 'react';
import { Line } from 'react-chartjs-2';
import h from './Charts.module.scss'


class Charts extends React.Component {

    handleClick = () => {

        console.log(this.props.max)
        console.log(this.props.min)
        console.log(this.props.chartid)
        let max = Math.max(...this.props.data.datasets[0].data)
        let min = Math.min(...this.props.data.datasets[0].data)
        this.props.scaleAllToOne(min, max, this.props.chartid)
    }

    render() {
        return (
            <div style={{border: this.props.active ? '2px solid #6EC168':'none'}} className={h.container} onClick={this.handleClick}>
                <Line
                    options={{
                        type: 'line',
                        responsive: true,
                        elements: {
                            line: {
                                fill: false
                            },
                            point: {
                                radius: [5, ...Array(22).fill(0), 5]
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