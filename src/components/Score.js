import { useRef, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import useFetch from '../hooks/useFetch'
import useExist from "../hooks/useExist";

const datas = [
  { name: "Group A", value: 400 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Score() {
  const container = useRef();
  const [elm, setelm] = useState(null);
  useExist('.score').then(resp => {setelm(resp)}); 
  let containerDim = 0;
  let xPos = 0;
  let oRadius = 100;
  if(elm){
    containerDim = container.current.offsetWidth;
    xPos = (containerDim - 20)/2;
  }
  const [data,loading]=useFetch("http://localhost:3000/user/18", null);
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
      let score = data.score * 360; 
      return (<div ref={container} className="score" style={{backgroundColor: "#FBFBFB",padding:"10px", borderRadius:"5px"}}>
          <PieChart height={containerDim} width={containerDim}>
            <Pie data={datas} cx={xPos} cy={xPos} cornerRadius={10} startAngle={0} endAngle={score} innerRadius={90} outerRadius={oRadius} paddingAngle={5} dataKey="value" color="white">
              {datas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#E60000" />
              ))}
            </Pie>
            <Pie data={datas} cx={xPos} cy={xPos} startAngle={0} endAngle={360} innerRadius={0} outerRadius={90} dataKey="value" color="white">
              {datas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="white" />
              ))}
            </Pie>
          </PieChart>
          <p className="legende" style={{position: "absolute", top: "3%", left: "10%", fontSize: "18px", fontWeight: "500", color: "#20253A"}}>Score</p>
          <p><span className="rate">{data.score*100}%</span><br/>de votre<br/>objectifs</p>
        </div>
      );
  };
}