import React from 'react'
import './LuxonTime.css'
import { DateTime } from "luxon";

export default function LuxonTime(){
    const [luxTime, setLuxTime] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(()=>{
        loadingLuxTime()        
    }, [])

    function loadingLuxTime(){
        setIsLoading(true)
        const date = DateTime.now()
        let DateStr = date.toLocaleString(DateTime.TIME_SIMPLE)
        // console.log(typeof DateObj)
        setLuxTime(()=>{
        return{now:DateStr}
        })
        setIsLoading(false)
        setInterval(watchLuxTime, 1000)
    }

    function watchLuxTime(){
        if(getLuxTime() !== luxTime.now){
            setNewLuxTime(getLuxTime())
        }
    }

    function getLuxTime(){
        let newDate = DateTime.now()
        let newDateStr = newDate.toLocaleString(DateTime.TIME_SIMPLE)
        return newDateStr
    }

    function setNewLuxTime(timeUpdate){
        setLuxTime(()=>{
        return {now:timeUpdate}
        })
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <div id="--luxonTime-time-container">
            <p id='--luxonTime-time'>{luxTime.now}</p>
        </div>
    )
}