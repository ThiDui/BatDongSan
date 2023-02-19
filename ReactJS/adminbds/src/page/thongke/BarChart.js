import React from "react";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from 'react';

function BarChart({chartData}) {
    
    

    return(
        <Bar data={chartData} />
    )
}
export default BarChart;