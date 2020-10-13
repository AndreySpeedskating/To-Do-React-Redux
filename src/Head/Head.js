import React from "react";
import './Head.css'
import {_ALL} from '../ActionConst'
import {_ACTIVE} from '../ActionConst'
import {_COMPLETE} from '../ActionConst'
import {_HEAD_FILTER} from '../ClassName'
import {_BUTTON} from '../ClassName'
import {_CLASS_HEAD} from '../ClassName'

const Head = (props) => {

    return (
        <div className={_CLASS_HEAD} id={props.id}>
            <button id={_COMPLETE}  type={_BUTTON} className={_HEAD_FILTER} onClick={props.ShowCompleteFilter}>Complete</button>
            <button id={_ACTIVE} type={_BUTTON} className={_HEAD_FILTER} onClick={props.ShowActiveFilter}>Active</button>
            <button id={_ALL} type={_BUTTON} className={_HEAD_FILTER} onClick={props.ShowAllFilter}>All</button>
        </div>
    )
}

export default Head