import React from 'react'
import './Weather.css'
import Access from '../../../private'

export default function Weather(){
    // const [weather, setWeather] = React.useState({name:'Unavailable',main:{temp:'Not available'}, weather:[{icon:''}]})
    const [weather, setWeather] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)

    const weatherAccess = Access.weather
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`
    let scrimbaWeatherUrl = `https://apis.scrimba.com/openweathermap/data/2.5/weather?`

    React.useEffect(()=>{
        loadingWeatherData()
    },[])

    function loadingWeatherData(){
        // console.log('calling loading weather')
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(position=>{
            fetch(`${weatherUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${weatherAccess}`)
                .then(res=>{
                    if(!res.ok){
                        throw Error('Weather data not available')
                    }
                    return res.json()
                })
                .then(data=>{
                    // console.log(data)
                    setWeather(()=>{
                        return {...data}
                    })
                    setIsLoading(false)
                })
                .catch(err=>{
                    let defaultWeather = {
                        name:'Not Available',
                        weather:[
                            {icon:''}
                        ]
                    }
                    setWeather(()=>{
                        return {...defaultWeather}
                    })
                })
        })
    }

    if(isLoading){
        return <p>Loading...</p>
      }

    return(
        <div id="--weather-weather-container">
        <img id="--weather-condition-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <span id="--weather-temperature">{Math.round(weather.main.temp)+'\u00b0'}</span>
        <p id="--weather-city-name">{weather.name}</p>
    </div>
    )
}