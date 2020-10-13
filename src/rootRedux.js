import {_ADD, _DELETE, _CHANGE, _FILTER_ACTIVE, _FILTER_ALL, _FILTER_COMPLETE,
    _ALL, _ACTIVE, _COMPLETE, _LOCALSTORAGE_KEY} from './ActionConst'
import {_HEAD_FILTER} from "./ClassName";

const reduxReducer = require('redux')
let shortid = require('shortid')
let LOCALSTORAGE = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY))
let ToDoDate = (Date) => { return Date = new Date().toLocaleDateString().slice(0, -5) +'  '+ new Date().toLocaleTimeString().slice(0, -3)}
let initialState = {
    item : (LOCALSTORAGE !== null)? LOCALSTORAGE: []
}

let ButtonDisabler = (id1, id2, id3) => {
    document.getElementById(id1).disabled = true
    document.getElementById(id2).disabled = false
    document.getElementById(id3).disabled = false
}

let SaveToLS = (item) => {
    localStorage.setItem(_LOCALSTORAGE_KEY, JSON.stringify(item))
}

let DisabledStatus = (item) => {
    return document.getElementById(item).disabled
}

let GetElement = (item) => {
    return document.getElementById(item)
}

//Reducer
export default function reducer (state = initialState, action) {
 switch (action.type) {
     case _ADD: {
         const arrayAdd = {
             value: action.value,
             id: shortid.generate(),
             date: ToDoDate(Date),
             check: false,
             visibility: true,
         }
         let items = [...state.item, arrayAdd]
         SaveToLS(items)
         {
             return {item: items}
         }
     }
     case _DELETE: {
         let arrayDelete = state.item
         arrayDelete.splice(action.index, 1)
         SaveToLS(arrayDelete)
      return {
       item: [...arrayDelete]
      }
     }
     case _CHANGE: {
         let arrayOnChange = state.item
         let card = GetElement(action.id)
         if (card.children[0].checked === true)
         {
             if (DisabledStatus(_COMPLETE) || DisabledStatus(_ALL))
                 arrayOnChange[action.index].visibility = true
             if (document.getElementsByClassName(_HEAD_FILTER).disabled === false) arrayOnChange[action.index].visibility = true
             if (DisabledStatus(_ACTIVE)) arrayOnChange[action.index].visibility = false
             arrayOnChange[action.index].check = true
             SaveToLS(arrayOnChange)
         }
          else {
             if (DisabledStatus(_ACTIVE) || DisabledStatus(_ALL))
                 arrayOnChange[action.index].visibility = true
             if (document.getElementsByClassName(_HEAD_FILTER).disabled === false) arrayOnChange[action.index].visibility = true
             if (DisabledStatus(_COMPLETE)) arrayOnChange[action.index].visibility = false
             arrayOnChange[action.index].check = false
             SaveToLS(arrayOnChange)
         }
         return {
             item: [...arrayOnChange]
         }
     }
     case _FILTER_COMPLETE: {
         let filterComplete = state.item
         filterComplete = state.item.map((i) => {
                 i.visibility = true
             return i
         })
         if (action.id === _COMPLETE) {
             ButtonDisabler(_COMPLETE, _ACTIVE, _ALL)
             filterComplete = state.item.map((i) => {
                 if (i.check === false) {
                     i.visibility = false
                 }
                 return i
             })
         }
         return {
             item: [...filterComplete]
         }
     }
     case _FILTER_ACTIVE: {
         let filterActive = state.item
         filterActive = state.item.map((i) => {
             i.visibility = true
             return i
         })
         if (action.id === _ACTIVE) {
             ButtonDisabler(_ACTIVE, _COMPLETE, _ALL)
             filterActive = state.item.map((i) => {
                 if (i.check === true) {
                     i.visibility = false
                 }
                 return i
             })
     }
         return {
             item: [...filterActive]
         }
     }
     case _FILTER_ALL: {
         let filterAll = state.item
         if (action.id === _ALL) {
             ButtonDisabler(_ALL, _ACTIVE, _COMPLETE)
             filterAll = state.item.map((i) => {
                     i.visibility = true
                 return i
             })
             SaveToLS(filterAll)
         }
         return {
             item: [...filterAll]
         }
     }
     default: {
      return {
       item: [...state.item]
      }
    }
  }
}

//Store

const store = reduxReducer.createStore(reducer)
store.subscribe(()=> {
})

//Action

