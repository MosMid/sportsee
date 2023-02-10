import useFetch from '../hooks/useFetch'
import useExist from '../hooks/useExist'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react';

/**
 * Returns a line chart component that displays average session data.
 * @param {object} props - Props for the component.
 * @param {string} props.url - URL for fetching the data.
 * @returns {React.Element} Returns a react component to render the line chart.
 */
 export default function AverageSessionChart(props) {
    const [elm, setelm] = useState(null);
  
    /**
     * Get the element by class name and update the state with the found element.
     */
    useExist(".performanceChart").then((resp) => {
      setelm(resp);
    });
  
    let array = [];
    let obj = {};
    let max = 0;
  
    /**
     * Get the `obj` object with the data and the maximum value of the data, 
     * and add it to the `array` of objects.
     */
    function getObj() {
      if (elm) {
        for (let i = 0; i < data.data.length; i++) {
          if (max < data.data[i].value) {
            max = data.data[i].value;
          }
          obj = data.data[i];
          obj.kind = data.kind[i + 1];
          obj.fullMark = max;
          array.push(obj);
        }
  
        /**
         * Shift the first element to the end of the `array` 2 times.
         */
        var firstElement = null;
        for (let i = 0; i < 2; i++) {
          firstElement = array.shift();
          array.push(firstElement);
        }
      }
    }
  
    /**
     * Get the data from the given `props.url` and loading state.
     */
    let [data, loading] = useFetch(props.url + "/performance", []);
    
    if(props.data){
        data = props.data
    }
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
        return <div className='performanceChart' style={{backgroundColor: "#282D30", padding:"5px", paddingTop:"20px", borderRadius:"5px"}}>
            {getObj()}
            <ResponsiveContainer width="100%" aspect={1}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={array}>
                    <PolarGrid outerRadius="50%"/>
                    <PolarAngleAxis dataKey="kind" stroke="white" tickSize={15} fontSize={12} tickLine={false}/>
                    <Radar dataKey="value" fill="#FF0101B2"/>
                    <Tooltip/>
                </RadarChart>
            </ResponsiveContainer>
        </div>
    };
}