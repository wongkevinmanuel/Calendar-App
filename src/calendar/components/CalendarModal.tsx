
import DatePicker, {registerLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from 'date-fns';
import { use, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import {es} from 'date-fns/locale/es';

import Swal from 'sweetalert2';
//import 'sweetalert2/src/sweetalert2.scss'

import "react-datepicker/dist/react-datepicker.css";

import { useUiStore } from "../../hookscust";
import { useCalendarStore } from "../../hookscust/useCalendarStore";

registerLocale('es', es );

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen ,closeDateModal} = useUiStore();
    const [formSubmitted, setformSubmitted] = useState(false);
    const { activeEvent, startSavingNewEvent } = useCalendarStore();

    const [formValues, setformValues] = useState({
        title: 'Fernando',
        notes: 'Algun lugar dlel mundo',
        start: new Date(),
        end: addHours( new Date(), 2 )
    });

    const titleClass = useMemo ( () => {
        if( !formSubmitted) return '';

        return (formValues.title.length > 0)
            ? '': 'is-invalid'
        }
    , [formValues.title, formSubmitted] );

    useEffect (()=>{
        if( activeEvent !== null)
            console.log(activeEvent);
            //activeEvent!.title   
            setformValues({...activeEvent});

    },[activeEvent])

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setformValues({
            ...formValues,
            [ target.name ]: target.value
        });
    }
    
    const onDateChange = (event: Date, changing: 'start' | 'end') =>{
        setformValues({
            ...formValues,
            [ changing ]: event});
    }
  
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const difference = differenceInSeconds(formValues.end,formValues.start );
        if( isNaN(difference) || difference <= 0){
            Swal.fire(
                {
                    title:'Fechas incorrectas',
                    text:'Revisar las fechas ingresadas',
                    icon:'error',
                    confirmButtonText:'Ok',
                })
            return; 
        }
        if(formValues.title.length <= 0){
            Swal.fire(
                {
                    title:'Error',
                    text:'El titulo es obligatorio',
                    icon:'error',
                    confirmButtonText:'Ok',
                })
            return;
        }

        //TODO
        await startSavingNewEvent(formValues);
        closeDateModal();
        setformSubmitted(false);
    }
    
  return (
    <div>
       <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}>
                <h2> Nuevo Evento </h2>
                <hr />
                <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker selected={formValues.start} 
                    onChange={event => onDateChange( event as Date, 'start' )}
                    className="form-control"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    locale={es}
                    timeCaption="Hora"/>
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker selected={formValues.end} 
                    onChange={event => onDateChange(event as Date, 'end')}
                    className="form-control"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    locale={es}
                    timeCaption="Hora"/>
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        className="form-control"
                        placeholder="Notas"
                        rows = {5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
            
        </Modal>
    </div>
  )
}
