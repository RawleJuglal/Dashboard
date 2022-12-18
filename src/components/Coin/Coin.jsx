import React from 'react'
import './Coin.css'

export default function Coin(props){
    console.log(props.data)
    return( 
        <div id="--coin-coin-container">
            <img src={props.data.image.small}></img><span id="--coin-coin-name">{props.data.id}</span><span>{props.data.market_data.market_cap_change_24h_in_currency.usd}</span>
        </div>
    )
}