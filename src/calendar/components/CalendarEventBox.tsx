import React from 'react'
import { EventProps } from 'react-big-calendar';
//Interface de las props
interface CalendarEventBoxProps {
    id: string;
    title: string;
    start: Date;
    end: Date;
    user: { _id: string,name:string};
} 
export const CalendarEventBox :React.FC< EventProps<CalendarEventBoxProps> > = ({event}) => {
    //console.log(props);
    
    return (
    <>
        <strong> { event.title }  </strong>
        <span> - { event.user.name} </span>
    </>
  )
}
