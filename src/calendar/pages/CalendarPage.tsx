import { Calendar, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar,CalendarEventBox, CalendarModal } from '../components'
import { getMessagesES, localizer } from '../../helpers'
import { useState } from 'react' 
import { useUiStore  } from '../../hookscust'
import { useCalendarStore } from '../../hookscust/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'

interface MyEventK {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    desc?: string;
    //isSelected: boolean;
}

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = () => {
  
    return {
      style: {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '1px solid gray'
        },
      className: 'high' 
      }; 
  }
  
  //Definir el componente configurado para 
  // mostrar el evento en el calendario
  const components = {
    event: CalendarEventBox
  }

  const onSelect = (event: MyEventK) =>{
    setActiveEvent(event);
  }

  const onViewChange = (view: View) =>{
    localStorage.setItem('lastView', view);
    setLastView(view);
  }
  
  const onDoubleClick = (event: MyEventK) =>{
    openDateModal();
  }

  return (
    <> 
      <Navbar/>
      <div style={{height: '500px'}}>
        <Calendar  
        defaultView={ lastView as View }
        culture='es'
        localizer={ localizer }
        events ={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80 px)' }}
        messages={getMessagesES}
        eventPropGetter ={ eventStyleGetter }
        
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={onSelect}
        onView={ onViewChange}
        components={components}
        ></Calendar>
          <CalendarModal></CalendarModal>
          <FabAddNew></FabAddNew>
          <FabDelete></FabDelete>
      </div>
    </>
  )
}
