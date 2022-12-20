import React from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import { DateTime } from "luxon";
import Access from '../../../private'
import Gecko from '../Gecko/Gecko'
import LuxonTime from '../LuxonTime/LuxonTime';
import Weather from '../Weather/Weather';

function App() {
  const [unsplash, setUnsplash] = React.useState({urls:{full:'', regular:''},user:{name:'',portfolio_url:''}})

  /*Global Variables*/
  let unsplashController;
  // let geoController;

  /*Unsplash Variables */
  const unsplashAccess = Access.unsplash
  const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashAccess}&orientation=landscape&query=nature`
  const scrimbaUrl = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`

  const styles = {
    container:{
      backgroundImage:`url(${unsplash.urls.full})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat'
    }
  }


  /*UNSPLASH USEEFFECT*/
  React.useEffect(()=>{
        retrieveLocalStorage('unsplash')
        // console.log(controller)
        if(unsplashController === null){
          // console.log(`calling unsplash fetch`)
          fetch(scrimbaUrl)
            .then(res=>res.json())
            .then(data=>setPreviousState('unsplash', data))
            .catch(err=>{
              // console.log('in unsplash catch')
              let defaultBackground = 'https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzExNTg5MTE&ixlib=rb-4.0.3&q=80'
              let defaultName = 'Aperture Vintage'
              let defaultPortfolio = 'https://creativemarket.com/PedroCS?u=PedroCS'
              let defaultUnsplash = {urls:{full:defaultBackground}, user:{name:defaultName, portfolio_url:defaultPortfolio}}
              setPreviousState('unsplash', defaultUnsplash)
            })
        } else {
          setPreviousState('unsplash', unsplashController)
        }
  },[])


  function saveToLocalStorage(name, info){
    // console.log(`calling save to localStorage`)
    // console.log(`N:${name}`)
    // console.log(info)
    localStorage.setItem(name, JSON.stringify(info))
  }

  function retrieveLocalStorage(name){
    console.log('retrieving local Storage')
    switch(name) {
      case 'unsplash':
        unsplashController = JSON.parse(localStorage.getItem(name))
        break;
      case 'gecko':
        geckoController = JSON.parse(localStorage.getItem(name))
        break;
      default:
        console.log('bad switch statement')
    }
    
  }

  function setPreviousState(state, fetchData){
    console.log(`calling setPrevState ${state}`)
    console.log(fetchData)
    let hadData;
    if(fetchData === undefined && retrieveLocalStorage(state) !== undefined){
      let prevData = retrieveLocalStorage(state);
      // console.log(`P:`)
      // console.log(prevData)
      switch(state) {
        case 'unsplash':
            hadData = true;
            setUnsplash(()=>{
              return {...prevData}
            })
          break;
        case 'gecko':
            hadData = true;
            setGecko(()=>{
              return {...prevData}
            })
          break;
        case 'weather':
            hadData = true;
            setWeather(()=>{
              return {...prevData}
            })
          break;
        default:
          hadData = false;
          console.log('bad switch statement')
      }
    } else if(fetchData !== undefined){
      // console.log(`we had fetchData`)
      switch(state) {   
        case 'unsplash':
            hadData = true;
            saveToLocalStorage(state, fetchData)
            setUnsplash(()=>{
              return {...fetchData}
            })
          break;
        case 'gecko':
            hadData = true;
            setGecko(()=>{
              return {...fetchData}
            })
          break;
        case 'weather':
            hadData = true;
            setWeather(()=>{
              return {...fetchData}
            })
          break;
        default:
          hadData = false;
          console.log('bad switch statement')
      }
    } else {
      hadData = false;
    }
    return hadData;
  }

  return (
    <div id="--app-app-container">
      <div id='--app-dashboard-container' className='container' style={styles.container} >
        <div id='--app-top-container'>
          <div className='--app-left-container'>
              {/* <Coin key={nanoid()} data={gecko} /> */}
              <Gecko />
          </div>
          <div className='--app-right-container'>
            <h1>Right Container</h1>
            <Weather />
          </div>
        </div>
        <div id='--app-middle-container'>
        <div className='--app-centerpeice-container'>
          <h1>Centerpeice</h1>
          <LuxonTime />
        </div>
        </div>
        <div id="--app-bottom-container">
          <div id="--app-unsplash-attribution">
            <p>Photo by <a href={unsplash.user.portfolio_url}>{unsplash.user.name}</a> on <a href="">Unsplash</a></p>
          </div>
          <div className='--app-bottom-centerpeice-container'>
            <h1>Bottom Centerpeice</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className='--app-bottom-right-container'>
            <h1>Bottom Right</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
