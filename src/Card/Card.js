import React from "react";
import './Card.css'

const Card = (props) => {
    return (
       <div className={props._CardClass} id={props.id}>
        <input id={props.id} type='checkbox'  className={props._CheckClass} onChange={props._Change} checked={props._Checked}/>
        <p id={props.id} className={props._TextClass}>{props._Text}</p>
        <button id={props.id} onClick={props._Delete} className={props._DeleteClass}>Delete</button>
       </div>
    )
}

export default Card