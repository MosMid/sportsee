import React, { useEffect, useState } from 'react';
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

export default function App(){
    const [data,loading]=useFetch("http://localhost:3000/user/18", null);
    if(loading){
        return <div>Chargement...</div>
    }
    if(data){
        return <div className='Accueil'>
            <h1>Bonjour <span className='firstName'>{data.userInfos.firstName}</span></h1>
            <p className='congrats'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className='flex'>
                <div className='charts'>
                    <ActivityChart/>
                    <div className='bottomCharts'>
                        <AverageSessionChart/>
                        <PerformanceChart/>
                        <Score/>
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