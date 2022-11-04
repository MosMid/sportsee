import { useRef, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import useFetch from '../hooks/useFetch'
import useExist from "../hooks/useExist";
import PropTypes from 'prop-types';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * this function recieves a url and creates the score chart
 * 
 * @param {string} userUrl user's url 
 * @returns {JSX} score chart
 */
export default function Score(userUrl) {
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
  const [data,loading]=useFetch(userUrl.url, null);
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
      let score = data.score * 360;
      let scoreObj = {};
      scoreObj.name = "Group A";
      scoreObj.value = score;
      let Array = [];
      Array.push(scoreObj);
      return (<div ref={container} className="score" style={{backgroundColor: "#FBFBFB",padding:"10px", borderRadius:"5px"}}>
          <PieChart height={containerDim} width={containerDim}>
            <Pie data={Array} cx={xPos} cy={xPos} cornerRadius={10} startAngle={0} endAngle={score} innerRadius={90} outerRadius={oRadius} paddingAngle={5} dataKey="value" color="white">
              {Array.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#E60000" />
              ))}
            </Pie>
            <Pie data={Array} cx={xPos} cy={xPos} startAngle={0} endAngle={360} innerRadius={0} outerRadius={90} dataKey="value" color="white">
              {Array.map((entry, index) => (
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

Score.propTypes = {
  url: PropTypes.string
};