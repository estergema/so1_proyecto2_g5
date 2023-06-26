import React,{useState,useEffect} from 'react'
//import {fetchAPI} from '../helpers/fetch';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import '../css/graficas.css';
export const DataPC = () => {

const [percent,setPercent]= useState("0")
const [percentRam,setPercentRam]= useState("0")  
const [cpuData, setCpuData] = useState([{ name: 'CPU', value: 0 },{ name: 'LIBRE', value: 100 }]);
const [ramData, setRamData] = useState([{ name: 'RAM', value: 0 },{ name: 'LIBRE', value: 100 }]);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];  


useEffect(() => {
    const interval = setInterval(() => {
        (
            async () => {
               /* const req = await fetchAPI("api/getcpu");
                const req2 = await fetchAPI("api/getram");
                //console.log(req.cpu[0])
                setPercent(req.cpu[0].percent);
                setPercentRam(req2.ram[0].percent)
                setCpuData([{ name: 'CPU', value: parseFloat(req.cpu[0].percent) },{ name: 'LIBRE', value:100- parseFloat(req.cpu[0].percent) }]);
                setRamData([{ name: 'RAM', value: parseFloat(req2.ram[0].percent) },{ name: 'LIBRE', value:100- parseFloat(req2.ram[0].percent) }]);*/
            }
        )();
    }, 500);

    return () => clearInterval(interval);
})
  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h2>CPU</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={cpuData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            animationDuration={0}
          >
            {cpuData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <h1>CPU: { percent }%</h1>
      </div>
      <div className="chart-wrapper">
        <h2>RAM</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={ramData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            animationDuration={0}
          >
            {ramData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <h1>RAM: { percentRam }%</h1>
      </div>
    </div>
  )
}
