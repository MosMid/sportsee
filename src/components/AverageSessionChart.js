import useFetch from '../hooks/useFetch'
import useExist from '../hooks/useExist'
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useRef, useState } from 'react'

/**
AverageSessionChart is a React functional component that displays a chart for the average session duration.
@function
@param {Object} props - The properties passed to the component.
@param {string} props.url - The URL for fetching the data for the chart.
@returns {JSX.Element} A React component that displays the chart and its related information.
*/
export default function AverageSessionChart(props) {
  // The renderLegend component is a sub-component that displays a legend for the chart.
    function CustomToolTip({ active, payload }) {
        if (active) {
          return (
            <div style={{padding: '3px 5px', borderRadius: '2px', background: '#FFF', margin: 'auto',}}>
              <p style={{ fontSize: '10px' }}>{payload[0].value} min</p>
            </div>
          )
        }
        return null
    }
    // The renderLegend component is a sub-component that displays a legend for the chart.
    const renderLegend = () => {
        return (
          <div
            style={{
              color: '#FFF',
              padding: '0 5%',
              opacity: '0.5',
            }}
          >
            <p style={{ fontSize: '.9rem', fontWeight: 'bolder', textAlign: 'center' }}>
              Durée moyenne des sessions
            </p>
          </div>
        )
    }

// x is a variable used to store the x-coordinate of the mouse cursor.
let x = 0;
// bg is a variable used to store the background gradient of the chart.
let bg = "rgba(175,0,0,1.5)";
// elm is a React reference used to store a reference to the chart element.
const elm = useRef();
// dom is a state variable used to store the chart element when it has been rendered.
const [dom, setDom] = useState(null);
// The useExist hook is used to check if the chart element has been rendered.
useExist('.averageSessionChart').then(resp => {setDom(resp)});
// The getX function is used to calculate the x-coordinate of the mouse cursor and update 
    function getX(){
        if(dom){
          window.addEventListener("mousemove",getcord,false);
            function getcord(ev){
              if (ev.target == document.getElementsByClassName("recharts-surface")[1]) { 
                var bnds = ev.target.getBoundingClientRect();
                x = ev.clientX - bnds.left;
                x = (x+parseInt(elm.current.style.padding))/elm.current.offsetWidth;
                x = parseFloat(x.toPrecision(2))*100;
                bg = `linear-gradient(90deg, rgba(255,0,0,1) ${x}%, rgba(175,0,0,1.5) ${x}%, rgba(175,0,0,1.5) 100%)`
                elm.current.style.background = bg;
              } else { 
                bg = "rgba(175,0,0,1.5)"
                elm.current.style.background = bg;
              }
            }
        }
    }

    let [data,loading]=useFetch(props.url+"/average-sessions", null);
    if(props.data){
      data = props.data
    }
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
        return <div ref={elm} className='averageSessionChart' style={{background: bg, padding:"10px", borderRadius:"5px"}}>
            {getX()}
            <ResponsiveContainer width="100%" aspect={1}>
                <LineChart data={data.sessions} margin={{top: 0, right: 5, left: 5, bottom: 0,}}> 
                    <defs>
                        <linearGradient id="colorLine" x1="0%" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="#FFF" />
                        <stop offset={`${0}%`} stopColor="red" />
                        <stop offset={`${100}%`} stopColor="#FFF" />
                        </linearGradient>
                    </defs>  
                    <XAxis dataKey="day" axisLine={false} tickLine={false} height={30} tick={{ fill: '#FFF', opacity: 0.5 }} tickSize={12} padding={{ left: 10, right: 10 }}
                        tickFormatter={(day) => {
                            const weekday = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
                            return `${weekday[day - 1]}`
                        }}
                        allowDataOverflow={false}
                    />
                    <Tooltip 
                        content={<CustomToolTip active={true} payload={data}/>} 
                        cursor={false}/>
                    <Legend verticalAlign="top" align="center" content={renderLegend}/>
                    <Line type="natural" dataKey="sessionLength" dot={false} activeDot={{ fill: '#FFF' }} strokeWidth={2} stroke="url(#colorLine)" overflow="hidden"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    };
}