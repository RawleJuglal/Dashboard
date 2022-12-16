import React from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Coin from '../Coin/Coin'

function App() {
  const [state, setState] = React.useState({unsplash:{urls:{full:'', regular:''},user:{name:'',portfolio_url:''}}, gecko:[]})
  const [count, setCount] = React.useState(0);
  const access = 'PwT5nDzZkavawPr46dT16uPs6Ig6jey58bPRzZIxyPY'
  const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${access}&orientation=landscape&query=nature`
  const scrimbaUrl = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
  const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/`
  const coinArr = [{name:'bitcoin', image:{small:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'}},{name:'dogecoin', image:{small:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256"}},{name:'ethereum', image:{small:"https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"}}, {name:'litecoin', image:{small:"https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580"}}]
  // let coinList = state.gecko.map((ele)=>{
  //   return <Coin key={nanoid()} data={ele} />
  // })

  const styles = {
    container:{
      backgroundImage:`url(${state.unsplash.urls.full})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat'
    }
  }

  React.useEffect(()=>{
    callScrimbaApi()
  },[])
  
  React.useEffect(()=>{  
    let ignore = false;

     const getData = async()=> {
      try{
        let results = await coinArr.map(async(ele)=>{
          let res =  await fetch(coinGeckoUrl + ele.name)
          let data = await res.json()
          return data
        })
        return results
      } catch(err) {
        console.log(err)
      }
    }
    
      if(!ignore){
        getData().then((res)=>{
          console.log(res)
          setState((prevState)=>{
            return {...prevState, gecko:res}
          })
        })
        
      }
      
    

    return()=> {
      ignore = true
    }
    

  }, [])

  function callScrimbaApi(){
    fetch(scrimbaUrl)
      .then(res=>res.json())
      .then(data=>{
        // console.log(data)
        setState((prevState)=>{
          return {...prevState, unsplash:data}
        })
      })
      .catch((err)=>{
        console.log(`ScrimbaE:${err}`)
        let defaultBackground = 'https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzExNTg5MTE&ixlib=rb-4.0.3&q=80'
        let defaultName = 'Aperture Vintage'
        let defaultPortfolio = 'https://creativemarket.com/PedroCS?u=PedroCS'
        let defaultUnsplash = {urls:{full:defaultBackground}, user:{name:defaultName, portfolio_url:defaultPortfolio}}
        setState((prevState)=>{
          return {...prevState, unsplash:defaultUnsplash}
        })
      })
  }

  

 

  
  

  

  
  return (
    <div id="--app-app-container">
      <div id='--app-dashboard-container' className='container' style={styles.container}>
        <div id='--app-top-container'>
          <div className='--app-left-container'>
            <h1>Left Container</h1>
            {/* {coinList} */}
          </div>
          <div className='--app-right-container'>
            <h1>Right Container</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <div id='--app-middle-container'>
        <div className='--app-centerpeice-container'>
          <h1>Centerpeice</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        </div>
        <div id="--app-bottom-container">
          <div id="--app-unsplash-attribution">
            <p>Photo by <a href={state.unsplash.user.portfolio_url}>{state.unsplash.user.name}</a> on <a href="">Unsplash</a></p>
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
