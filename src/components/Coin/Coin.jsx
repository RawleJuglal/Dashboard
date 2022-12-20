import React from 'react'
import './Coin.css'
import { UilCrosshair } from '@iconscout/react-unicons'
import { UilAngleDoubleUp } from '@iconscout/react-unicons'
import { UilAngleDoubleDown } from '@iconscout/react-unicons'

export default function Coin(props){
    return( 
        <div id="--coin-coin-container">
            <div id="--coin-crypto-top">
            <img className="--coin-img" src={props.data.image.small}></img><span id="--coin-coin-name">{props.data.name}</span>
            </div>
            <div id="--coin-crypto-data">
                <div id='--coin-crypto-current'>
                    <UilCrosshair size="24" color="#FFF" /> <span id="--coin-crypto-data-current">{'$'+props.data.market_data.current_price.usd}</span>
                </div>
                <div id='--coin-crypto-high'>
                    <UilAngleDoubleUp size="24" color="#08F70C" /> <span id="--coin-crypto-data-high">{'$'+props.data.market_data.high_24h.usd}</span> 
                </div>
                <div id='--coin-crypto-low'>
                    <UilAngleDoubleDown size="24" color="#F70808" /> <span id="--coin-crypto-data-low">{'$'+props.data.market_data.low_24h.usd}</span>  
                </div>
            </div>
        </div>
    )
}