import useFetch from '../hooks/useFetch'
import useExist from '../hooks/useExist'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * this function recieves a url and creates the performance chart
 * 
 * @param {string} userUrl user's url 
 * @returns {JSX} performance chart
 */
export default function AverageSessionChart(userUrl) {
    const [elm, setelm] = useState(null);
    useExist('.performanceChart').then(resp => {setelm(resp)}); 
    let array = [];
    let obj = {};
    let max = 0;

    /**
     * this function reorganizes the array of objects to make it compatible with rechart
     * @returns 
     */
    function getObj(){
        if(elm){
            for (let i = 0; i < data.data.length; i++){
                if(max < data.data[i].value){
                    max = data.data[i].value;
                }
                obj = data.data[i];
                obj.kind = data.kind[i+1];
                obj.fullMark = max;
                array.push(obj);
            }
            var firstElement = null;
            for (let i = 0; i < 2; i++){
            firstElement = array.shift();
            array.push(firstElement);
            }
            return
        }
    }
    const [data,loading]=useFetch(userUrl.url+"/performance", []);
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

AverageSessionChart.propTypes = {
    url: PropTypes.string
};