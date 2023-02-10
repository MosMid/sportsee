import React from 'react';
import useFetch from '../hooks/useFetch'
import './Home.css'
import calories from '../img/calories-icon.png'
import protein from '../img/protein-icon.png'
import carbs from '../img/carbs-icon.png'
import fat from '../img/fat-icon.png'
import ActivityChart from '../components/ActivityChart';
import AverageSessionChart from '../components/AverageSessionChart';
import PerformanceChart from '../components/PerformanceChart';
import Score from '../components/Score'

/**
 * Home component that displays the user's activity data
 * 
 * @param {object} props - The component's properties
 * @param {object} props.mockData - Optional mock data for testing purposes
 * @param {string} props.backendUser - The user's id used to fetch data from the backend
 * @returns {JSX.Element} - The component's JSX element
 */
export default function App(props){
    const user = props.mockData
    const url = "http://localhost:3000/user/"+props.backendUser
    // destructuring the hook's returned values
    let [data,loading]=useFetch(url, null);
    if(props.mockData){
        data = user.main.data
    }
    // handling the loading state
    if(loading){
        return <div>Chargement...</div>
    }
    // handling the error cases
    if(data == "can not get user") return <div className='error'>Cannot find user</div>
    if(data == "server error") return <div className='error'>Server error</div>
    if(data){
        return <div className='Accueil'>
            <h1>Bonjour <span className='firstName'>{data.userInfos.firstName}</span></h1>
            <p className='congrats'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className='flex'>
                <div className='charts'>
                    <ActivityChart data={props.mockData? user.activity.data : null} url={url}/>
                    <div className='bottomCharts'>
                        <AverageSessionChart data={props.mockData? user.averageSessions.data : null} url={url}/>
                        <PerformanceChart data={props.mockData? user.performance.data : null} url={url}/>
                        <Score data={props.mockData? user.main.data : null} url={url}/>
                    </div>
                </div>
                <div className='status'>
                    <div className='stats'>
                        <img src={calories} alt='calorie count'/>
                        <p><span>{data.keyData.calorieCount}</span><br/>calorie</p>
                    </div>
                    <div className='stats'>
                        <img src={protein} alt='protein count'/>
                        <p><span>{data.keyData.proteinCount}</span><br/>proteines</p>
                    </div>
                    <div className='stats'>
                        <img src={carbs} alt='carb count'/>
                        <p><span>{data.keyData.carbohydrateCount}</span><br/>glucides</p>
                    </div>
                    <div className='stats'>
                        <img src={fat} alt='fat count'/>
                        <p><span>{data.keyData.lipidCount}</span><br/>lipiddes</p>
                    </div>
                </div>
            </div>
    </div>
    };
}