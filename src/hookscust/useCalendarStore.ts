import React from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent , onDeleteEvent} from '../store/ui/calendarSlice';
import { ca } from 'date-fns/locale';

export const useCalendarStore = () => {
    const dispatch = useAppDispatch();

    const { events, activeEvent  } = useAppSelector( state => state.calendar );
    
    //activeEvent as 
    const setActiveEvent = ( calendarEnvent:any ) => {
        dispatch( onSetActiveEvent(calendarEnvent) );
    }

    const startSavingNewEvent = (calendarEvent: any)=>{
      //TODO: LLEGAR AL BACKEND
      
      //TODO BIEN
      if(calendarEvent._id){
        //Actualizar
        dispatch (onUpdateEvent({...calendarEvent}));
      }
      else{
        //Crear
        dispatch(onAddNewEvent({...calendarEvent, _id:new Date().getTime()}));
      }
    }

    const startDeleteEvent = () => {
      //TODO: llegar al backend
      dispatch( onDeleteEvent() );
    }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: (activeEvent._id === '' ? false: true ), //Si activeEvent es null o undefined, devuelve false. Si tiene un valor, devuelve true.
    //* Methods
    setActiveEvent,
    startSavingNewEvent,
    startDeleteEvent,

  }
}
