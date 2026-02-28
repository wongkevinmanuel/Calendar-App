import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';
import React from 'react'

interface MyEventK {
    _id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgcolor: string;
    user: {
        _id: string;
        name: string;
    }
}

const eventActive: MyEventK = {
    _id: '',//new Date().getTime().toString(),
  title:'',
  notes: '',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgcolor: '#fafafa',
  user: {
    _id: '',
    name: '',
    }  
};

const myEventsList:MyEventK[] = [{
    _id: new Date().getTime().toString(),
  title:'Cumpleaños del jefe',
  notes: 'Hay que comprar cafe',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgcolor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando',
    },
}, 
  {
    _id: new Date().getTime().toString()+1,//+1 para evitar que el id sea igual al del evento anterior
    title:'Cumpleaños de Clavel',
    notes: 'Hay que comprar pastel de tres leches',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgcolor: '#1de2b4',
    user: {
        _id: '123',
        name: 'Fernando',
  },
}]

export const calendarSlice = createSlice ({
    name:'calendar',
    initialState: {
        events : myEventsList,
        activeEvent: eventActive
    }, reducers:{
        onSetActiveEvent: ( state, action ) =>{
            state.activeEvent = action.payload
        },
        onAddNewEvent: (state, action ) =>{
            state.events.push( action.payload );
            state.activeEvent = {
                _id: '',
                title:'',
                notes: '',
                start: new Date(),
                end: addHours( new Date(), 2),
                bgcolor: '#fafafa',
                user: {
                    _id: '',
                    name: '',
                }
            };
        },
        onUpdateEvent: ( state, action ) =>{
            state.events = state.events.map( event => {
                if( event._id === action.payload._id){
                    return action.payload;
                }

                return event;
            })
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter(event => {
                    if (event._id !== state.activeEvent._id){
                        return event;
                    }
                    return null;
                })

                state.activeEvent = {
                    _id: '',
                    title:'',
                    notes: '',
                    start: new Date(),
                    end: addHours( new Date(), 2),
                    bgcolor: '#fafafa',
                    user: {
                        _id: '',
                        name: '',
                    }
                }
        }
    }
}) 

//Action creators are generated for each case reducer function
export const { onAddNewEvent,onSetActiveEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;

