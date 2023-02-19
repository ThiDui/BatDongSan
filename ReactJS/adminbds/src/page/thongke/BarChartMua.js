import React from "react";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from 'react';

function BarChartMua({chartDataMua}) {
    
    const options = {        
        legend: {
          display: false
        }
      }

    return(
        <Bar  options={{
            plugins: {
              legend: {
                display: false,
              },           
            }
          }}
           data={chartDataMua} />
    )
}
export default BarChartMua;