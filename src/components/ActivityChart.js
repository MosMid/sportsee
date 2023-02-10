import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import useExist from '../hooks/useExist'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * ActivityChart is a functional component that displays a chart to show the activity data.
 * It fetches the data from the API and also supports receiving data as props.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.url - The API url to fetch the activity data.
 * @param {Array} [props.data] - The activity data passed as props.
 *
 * @returns {ReactElement} A React component that displays the activity chart.
 */
export default function ActivityChart(props) {
      /**
   * CustomToolTip is a function that displays the custom tooltip when a data point is hovered.
   *
   * @param {Object} props - The props passed to the function.
   * @param {boolean} props.active - Indicates whether the data point is being hovered or not.
   * @param {Array} props.payload - The data payload for the data point being hovered.
   *
   * @returns {ReactElement} A React component that displays the custom tooltip.
   */
    function CustomToolTip({ active, payload }) {
        if (active) {
          return (
            <div style={{padding: '3px 5px', backgroundColor: '#E60000', color:'white', textAlign:'center',}}>
              <p style={{ fontSize: '10px' }}>{payload[0].value} kg</p>
              <p style={{ fontSize: '10px' }}>{parseInt((payload[1].value-minWeight)/resolution)} kCal</p>
            </div>
          )
        }
        return null
    }

    /**
   * renderLegend is a function that displays the chart legend.
   *
   * @returns {ReactElement} A React component that displays the chart legend.
   */
    const renderLegend = () => {
        return (
          <div style={{display: 'flex', color: 'black', position: 'absolute', top: "-55px", right: "3%", color: "#20253A"}}>
            <div style={{disppaly: 'inline-block', marginRight:"10px", marginTop: "23px", width: "10px", height: "10px", borderRadius: "5px", backgroundColor: 'black'}}></div>
            <p style={{disppaly: 'inline-block', marginRight:"10px",}}>Poids (kg)</p>
            <div style={{disppaly: 'inline-block', marginRight:"10px", marginTop: "23px", width: "10px", height: "10px", borderRadius: "5px", backgroundColor: 'red'}}></div>
            <p style={{disppaly: 'inline-block', marginRight:"10px",}}>Calories brulées (kCal)</p>
          </div>
        )
    }
    let [data,loading]=useFetch(props.url+"/activity", []);
    if(props.data){
        data = props.data
    }
    const [dom, setDom] = useState(null);
    useExist('.activityChart').then(resp => {setDom(resp)});
    let array = []
    let obj = {}
    let minWeight = 0
    let maxWeight = 0
    let maxCal = 0
    let calInterval = 0
    let resolution = 0

    /**
   * getArray is a function that retrieves and calculates the data array for the chart.
   * It sets the `minWeight`, `maxWeight`, `maxCal`, `calInterval`, `resolution` and `array` variables.
   *
   * @returns {void}
   */
    function getArray(){
        if(dom){
            minWeight = data.sessions[0].kilogram
            maxWeight = minWeight
            maxCal = data.sessions[0].calories
            for(let i = 0; i < data.sessions.length; i++){
                obj = data.sessions[i]
                obj.day = obj.day.slice(-1)
                array.push(obj)
                if(minWeight > obj.kilogram){
                    minWeight = obj.kilogram
                }
                if(maxWeight < obj.kilogram){
                    maxWeight = obj.kilogram
                }
                if(maxCal < obj.calories){
                    maxCal = obj.calories
                }
            }
            calInterval = maxWeight - minWeight
            resolution = calInterval / maxCal
            for(let i = 0; i < array.length; i++){
                array[i].chartCal = array[i].calories*resolution+minWeight
            }
        }
    }
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
        return <div className='activityChart' style={{ position: 'relative', backgroundColor: "#FBFBFB", width: "100%", borderRadius:"5px"}}>
            {getArray()}
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart barSize={10} data={array} margin={{top: 50, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#9B9EAC"/>
                    <YAxis dataKey="kilogram" axisLine={false} tickLine={false} stroke="#9B9EAC" orientation='right' type="number" domain={[minWeight-1, maxWeight+1]} allowDecimals={false}/>
                    <Tooltip content={<CustomToolTip active={true} payload={array}/>}/>
                    <Legend verticalAlign="top" align="center" content={renderLegend}/>
                    <Bar dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]}/>
                    <Bar dataKey="chartCal" fill="#E60000" radius={[10, 10, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
            <p style={{fontSize: "15px", fontWeight: "500", color: "#20253A", position: "absolute", top: "-2%", left: "3%"}}>Activité quotidienne</p>
        </div>
    };
}