import ChartBar from "./ChartBar";

import "./Chart.css"

function Chart(props) {

    const values = props.dataPoints.map(dataPoint => dataPoint.value);
    const maximunValue = Math.max(...values);

    return <div className="chart">
        {props.dataPoints.map(dataPoint => 
            <ChartBar
                key={dataPoint.label}
                value={dataPoint.value}
                maxValue={maximunValue}
                label={dataPoint.label}
            />
        )}
    </div>
}

export default Chart;