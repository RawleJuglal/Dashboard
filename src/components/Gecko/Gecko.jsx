import React from 'react'
import './Gecko.css'
import { UilCrosshair } from '@iconscout/react-unicons'
import { UilAngleDoubleUp } from '@iconscout/react-unicons'
import { UilAngleDoubleDown } from '@iconscout/react-unicons'

export default function Gecko(){
    const [gecko, setGecko] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)

    const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/bitcoin`

    React.useEffect(()=>{
        loadCoinData()
  },[])

  function loadCoinData(){
    // console.log(`calling loadCoinData`)
    setIsLoading(true)
    fetch(coinGeckoUrl)
            .then(res=>{
                if(!res.ok){
                    throw Error("Coin data not available")
                }
                return res.json()
            })
            .then(data =>{
                // console.log(data)
                setGecko(data)
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
  }

  if(isLoading){
    return <p>Loading...</p>
  }

    return(
        <div id="--gecko-coin-container">
            <div id="--gecko-crypto-top">
            <img className="--gecko-img" src={gecko.image.small}></img><span id="--gecko-coin-name">{gecko.name}</span>
            </div>
            <div id="--gecko-crypto-data">
                <div id='--gecko-crypto-current'>
                    <UilCrosshair size="24" color="#FFF" /> <span id="--gecko-crypto-data-current">{'$'+gecko.market_data.current_price.usd}</span>
                </div>
                <div id='--gecko-crypto-high'>
                    <UilAngleDoubleUp size="24" color="#08F70C" /> <span id="--gecko-crypto-data-high">{'$'+gecko.market_data.high_24h.usd}</span> 
                </div>
                <div id='--gecko-crypto-low'>
                    <UilAngleDoubleDown size="24" color="#F70808" /> <span id="--gecko-crypto-data-low">{'$'+gecko.market_data.low_24h.usd}</span>  
                </div>
            </div>
        </div>
    )
}