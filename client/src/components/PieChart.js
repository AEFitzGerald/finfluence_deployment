import React, {useState, useEffect} from 'react';
import { defaults } from 'react-chartjs-2';
import { Pie } from "react-chartjs-2";
import axios from 'axios';


const PieChart = () =>{

defaults.font = {'family':'roboto','size': 14, 'weight': '300' };
defaults.plugins.title.font.weight ='300'
defaults.plugins.title.font.size ='18'
defaults.maintainAspectRatio ='false'
defaults.color= '#ccf2ff';
console.log(defaults)

const [chartData, setChartData] = useState({})

useEffect(()=>{

    console.log("loading...dashboard api data") 
    axios.get("https://api.coingecko.com/api/v3/global")
    .then(res=>{ 
        console.log("the global api response looks like this:") 
        console.log(res.data.data.market_cap_percentage)
        const labels = Object.keys(res.data.data.market_cap_percentage)
        const data = Object.values(res.data.data.market_cap_percentage)
        
        setChartData({
            labels: labels,
                datasets: [
                    {
                        label: "Global Market Cap Percentage",
                        data: data,
                        backgroundColor: [
                        'rgb(0,191,255,0.3)',
                        "#c7a1ab",
                        'rgb(199,96,5,0.8)',
                        'rgb(0,191,255,0.7)',
                        "#e2cfd4",
                        "#1ac6ff",
                        "#9f6071",
                        '#63ecff',
                        "rgb(112,67,79,0.8)",
                        "#FA9137",
                        ], 
                        borderWidth: 0
                }
            ]

    });
    })
    .catch(err=>{
        console.log(err)
    })

},[]) 


return (
    <>
    <div className="pie-chart">
    <Pie
        data={ chartData }
        options={{
            plugins: {
            title: {
                position:'top',
                align:'start',
                display: true,
                text: "Digital Asset Global Market Cap %s",
                },

            legend: {
                display: true,
                position: "left",
                labels: {
                    usePointStyle: true,
                },
            }
        }
        }}
        />
    </div>
    </>
);

};

export default PieChart;


