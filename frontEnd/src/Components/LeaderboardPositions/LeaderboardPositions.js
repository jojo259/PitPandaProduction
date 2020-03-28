import React, { useState, useEffect } from 'react';
import MinecraftText from '../Minecraft/MinecraftText';
import boards from '../../scripts/leaderboards';

const formatPosition = (n)=>{
    if(typeof n === 'undefined') return 'Loading';
    let color;
    if(n===1) color = 'b';
    else if(n===2) color = 'f';
    else if(n===3) color = 'd';
    else if(n<=10) color = '5';
    else if(n<=25) color = 'c';
    else if(n<=50) color = '6';
    else if(n<=100) color = 'e';
    else if(n<=250) color = '9';
    else color = '7';
    return `§${color}#${n}`;
}

const Positions = (props) => {
    const [positions, setPositions] = useState({});
    useEffect(()=>{
        let alive = true;
        (async()=>{
            try{
                const request = await fetch(`/api/position/${props.uuid}`);
                const json = await request.json();
                console.log(json);
                if(alive){
                    if(!json.success) setPositions({error:(json.error||'An error has occured')});
                    else setPositions(json.rankings);
                }
            }catch(e){
                if(alive) setPositions({error:e});
            }
        })();
        return () => alive = false;
    }, [props.uuid]);
    return Reflect.ownKeys(boards).map(key=>(
        <div key={key}>
            <MinecraftText raw={`${boards[key].short}: ${formatPosition(positions[key])}`} /><br/>
        </div>
    ));
}

export default (props) => {
    const [loaded, setLoaded] = useState(false);
    if(loaded){
        return (<Positions uuid={props.uuid}/>);
    }else{
        return (
            <div style={{textAlign:'center'}}>
                <input type="button" className="srchBtn" value="Load" style={{margin:0}} onClick={()=>setLoaded(true)}/>
            </div>
        )
    }
}