import React, { Component } from 'react'
import './Card/Card.css'
import Card from './Card/Card'
import {connect} from 'react-redux'
import Head from "./Head/Head";
import {_ALL, _ACTIVE, _COMPLETE, _ADD, _DELETE, _CHANGE, _FILTER_ACTIVE,
_FILTER_ALL, _FILTER_COMPLETE} from './ActionConst'

import {_CLASS_CARD, _CLASS_CHECK, _CLASS_DELETE, _CLASS_TEXT, _CLASS_INPUT,
_ID_INPUT, _KEY_VALUE, _CLASS_CONTAINER, _PLACE_HOLDER_TEXT } from './ClassName'


class App extends Component {

    inputValue (id) {
        return (document.getElementById(id).value = '')
    }

   ToDo = (item) => item.map((i, index) => {
       let KeyString = i.id.split().reverse().join()
       if (i.visibility === true)
    return (
       <Card
       key = {KeyString}
       id = {i.id}
       _CardClass = {_CLASS_CARD+i.check}
       _CheckClass = {_CLASS_CHECK+i.check}
       _Checked = {i.check}
       _Change = {this.props.OnChange.bind(this, index, i.id)}
       _DeleteClass ={_CLASS_DELETE+i.check}
       _TextClass = {_CLASS_TEXT+i.check}
       _Text = {i.value+' '+ i.date}
       _Delete = {this.props.onDelete.bind(this, index)}
       />
       )
    })

    render() {

        return (
            <div className={_CLASS_CONTAINER}>
                <Head
                    ShowCompleteFilter = {this.props.onFilterComplete.bind(this, _COMPLETE)}
                    ShowActiveFilter = {this.props.onFilterNoComplete.bind(this, _ACTIVE)}
                    ShowAllFilter = {this.props.onFilterAll.bind(this, _ALL)}
                />
                {(this.props.item.length>0)?this.ToDo(this.props.item):null}
                <input placeholder={_PLACE_HOLDER_TEXT}
                       className= {_CLASS_INPUT} autoComplete={'off'} onKeyUp = {(event) => { if (event.key === _KEY_VALUE)
                {this.props.onAdd(document.getElementById(_ID_INPUT))
                    this.inputValue(_ID_INPUT)
                }
                }}
                 id={_ID_INPUT} type="text"/>
            </div>

            )

    }
}

function mapStateToProps (state) {
     return {
         item: [...state.item]
     }
}

function mapDispatchToProps (dispatch) {
  return {
      onAdd: (item)=> (item.value.length > 3)? dispatch({type: _ADD, value: item.value}): null,
      onDelete: (index)=> dispatch({type: _DELETE, index : index}),
      OnChange: (index, id)=> dispatch({type: _CHANGE, index : index, id: id}),
      onFilterComplete: (id)=> dispatch({type: _FILTER_COMPLETE, id: id}),
      onFilterNoComplete: (id)=> dispatch({type: _FILTER_ACTIVE, id: id}),
      onFilterAll: (id)=> dispatch({type: _FILTER_ALL , id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
