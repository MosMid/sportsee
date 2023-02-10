import { useRef, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import useFetch from '../hooks/useFetch'
import useExist from "../hooks/useExist";


/**
 * Sample data for the pie chart
 * @constant
 * @type {object[]}
 */
 const datas = [
  { name: "Group A", value: 400 }
];

/**
 * An array of colors for the pie chart
 * @constant
 * @type {string[]}
 */
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * Score component that displays the score in a pie chart
 * @function
 * @param {object} props - The properties of the component
 * @property {string} props.url - The URL to fetch the score data
 * @returns {JSX.Element} - Returns the score component
 */
export default function Score(props) {
  /**
   * A reference to the container element
   * @constant
   * @type {React.MutableRefObject}
   */
  const container = useRef();
  
  /**
   * A state for the score element
   * @constant
   * @type {Array}
   */
  const [elm, setelm] = useState(null);
  
  /**
   * A hook that sets the score element
   */
  useExist('.score').then(resp => {setelm(resp)}); 
  
  /**
   * The dimension of the container
   * @type {number}
   */
  let containerDim = 0;
  
  /**
   * The X position of the pie chart
   * @type {number}
   */
  let xPos = 0;
  
  /**
   * The outer radius of the pie chart
   * @type {number}
   */
  let oRadius = 100;
  
  /**
   * If the score element exists, set the container dimension and X position
   */
  if(elm){
    containerDim = container.current.offsetWidth;
    xPos = (containerDim - 20)/2;
  }
  
  /**
   * The result of the useFetch hook
   * @type {Array}
   */
  let [data,loading] = useFetch(props.url, null);
  
  /**
   * If the data is still loading, return a loading message
   */
  if(loading){
    return <div>Chargement...</div>
  }
  
  /**
   * If the data exists, return the score component
   */
  if(data){
    /**
     * The score value
     * @type {number}
     */
    let score = 0;
    
    /**
     * If today's score exists, use it, otherwise use the total score
     */
    if(data.todayScore){
      score = data.todayScore * 360
    }else{
      score = data.score * 360;
    } 
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
          <p><span className="rate">{score * 100/360}%</span><br/>de votre<br/>objectifs</p>
        </div>
      );
  };
}