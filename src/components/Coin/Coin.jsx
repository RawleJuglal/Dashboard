import React from 'react'
import './Coin.css'

export default function Coin(props){
    return( 
        <div id="--coin-coin-container">
            <img></img><span id="--coin-coin-name">{props.data.id}</span><span>Market Value</span>
        </div>
    )
}