import React from 'react'
import './Coin.css'

export default function Coin(props){
    // console.log(props.data)
    return( 
        <div id="--coin-coin-container">
            <img src={props.data.item.image.small}></img><span id="--coin-coin-name">{props.data.item.name}</span><span>{props.data.item.market_data.market_cap_change_24h_in_currency.usd}</span>
        </div>
    )
}