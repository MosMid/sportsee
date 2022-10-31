import useFetch from '../hooks/useFetch'
import useExist from '../hooks/useExist'
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useRef, useState } from 'react'

export default function AverageSessionChart() {
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

    let x = 0;
    let bg = "rgba(175,0,0,1.5)";
    const elm = useRef();
    const [dom, setDom] = useState(null);
    useExist('.averageSessionChart').then(resp => {setDom(resp)});
    function getX(){
        if(dom){
          window.addEventListener("mousemove",getcord,false);
            function getcord(ev){
              if (ev.target == document.getElementsByClassName("recharts-surface")[1]) { 
                var bnds = ev.target.getBoundingClientRect();
                x = ev.clientX - bnds.left;
                x = (x+parseInt(elm.current.style.padding))/elm.current.offsetWidth;
                x = parseFloat(x.toPrecision(2))*100;
                //bg = "linear-gradient(90deg, #FF0000 "+x+"%, #E60000 "+x+"%)";
                bg = `linear-gradient(90deg, rgba(255,0,0,1) ${x}%, rgba(175,0,0,1.5) ${x}%, rgba(175,0,0,1.5) 100%)`
                elm.current.style.background = bg;
              } else { 
                bg = "rgba(175,0,0,1.5)"
                elm.current.style.background = bg;
              }
            }
        }
    }

    const [data,loading]=useFetch("http://localhost:3000/user/18/average-sessions", null);
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