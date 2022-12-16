import React from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Coin from '../Coin/Coin'

function App() {
  const [unsplash, setUnsplash] = React.useState({data:{urls:{full:'', regular:''},user:{name:'',portfolio_url:''}}})
  const [gecko, setGecko] = React.useState({data:[]})
  const [count, setCount] = React.useState(0);

  /*Global Variables*/
  let controller;

  /*Unsplash Variables */
  const access = 'PwT5nDzZkavawPr46dT16uPs6Ig6jey58bPRzZIxyPY'
  const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${access}&orientation=landscape&query=nature`
  const scrimbaUrl = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`

  /*Coin Gecko Variables*/
  const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/`
  const coinArr = [{name:'bitcoin', image:{small:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'}},{name:'dogecoin', image:{small:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256"}},{name:'ethereum', image:{small:"https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"}}, {name:'litecoin', image:{small:"https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580"}}]
  let coinList = gecko.data.map((ele)=>{
    return <Coin key={nanoid()} data={ele} />
  })

  const styles = {
    container:{
      backgroundImage:`url(${unsplash.data.urls.full})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat'
    }
  }

  React.useEffect(()=>{
    if(count === 0){
      fetch(scrimbaUrl)
      .then(res=>res.json())
      .then(data=>{
        // console.log('called fetch')
        setUnsplash((prevState)=>{
          return {...prevState, data:data}
        })
      })
      .catch((err)=>{
        console.log(`ScrimbaE:${err}`)
        let defaultBackground = 'https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzExNTg5MTE&ixlib=rb-4.0.3&q=80'
        let defaultName = 'Aperture Vintage'
        let defaultPortfolio = 'https://creativemarket.com/PedroCS?u=PedroCS'
        let defaultUnsplash = {urls:{full:defaultBackground}, user:{name:defaultName, portfolio_url:defaultPortfolio}}
        setUnsplash((prevState)=>{
          return {...prevState, data:defaultUnsplash}
        })
      })
    }
    
      return ()=>{
        setCount((prevCount)=>prevCount+1)
      }
  },[])

  React.useEffect(()=>{
    if(count === 0){
      let finalCoinArr = coinArr.map((ele)=>{
       return fetch(`${coinGeckoUrl}${ele.name}`)
          .then(res=>res.json())
          .then(data=>{
            return data
          })
      })
      setGecko(()=>{
        return {data:finalCoinArr}
      })
    }
    
    return ()=>{
      setGecko(()=>{
        return {data:[]}
      })
    }
  },[])
  console.log(gecko)

  /*Returned */
// {data: Array(4)}
// data: Array(4)
// 0: Promise {<fulfilled>: {…}}
// 1: Promise {<fulfilled>: {…}}
// 2: Promise {<fulfilled>: {…}}
// 3: Promise {<fulfilled>: {…}}
// length: 4

  return (
    <div id="--app-app-container">
      <div id='--app-dashboard-container' className='container' style={styles.container}>
        <div id='--app-top-container'>
          <div className='--app-left-container'>
            <h1>Left Container</h1>
            {coinList}
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
            <p>Photo by <a href={unsplash.data.user.portfolio_url}>{unsplash.data.user.name}</a> on <a href="">Unsplash</a></p>
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
