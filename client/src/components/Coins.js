import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Coins = () => {


const [coins, setCoins] = useState( [] )

useEffect( () => {
    console.log("loading...dashboard api data")
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20cardano%2C%20solana%2C%20chainlink%2C%20matic-network&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=7d")
    .then( res => { 
        console.log("the api response Coins looks like this:", res) 
        setCoins( res.data )
    })
    .catch(err=>{
        console.log( err )
} )
},[] ) 

    return (
    <>
            {
            coins.map( (coin, idx ) => {
                return <div className="card token-card small-tok mx-1 my-1" key = { idx }>
                    <div className="card-body">
                        <h6 className="card-title">{ coin.name }</h6>
                        <hr></hr>
                        <dl className="row">
                            <dt className="card-text  col-sm-6">{ coin.symbol } current price</dt>
                            <dd className="card-text  col-sm-6 coin-int-value">${ coin.current_price }</dd>
                        
                            <dt className="card-text  col-sm-6">market cap</dt>
                            <dd className="card-text  col-sm-6 coin-int-value">${ coin.market_cap }</dd>
                            
                            <dt className="card-text  col-sm-6">24 hour high</dt>
                            <dd className="card-text  col-sm-6 coin-int-value">${ coin.high_24h }</dd>

                            <dt className="card-text  col-sm-6">24 hour low</dt>
                            <dd className="card-text  col-sm-6 coin-int-value">${ coin.low_24h }</dd>
                        </dl>
                    </div>
                </div>
                })
            }
    </>
    );
};

export default Coins;