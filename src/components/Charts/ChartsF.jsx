import React from 'react';
import { Line } from 'react-chartjs-2';


let ChartsF = (props) => {
    return (
        <div>
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
                data={props.data}
            /></div>
    )
}

export default ChartsF