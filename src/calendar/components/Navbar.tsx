import React from 'react'

export const Navbar = () => {
    const divStyle = {
        display: 'inline-block',
        fontFamily: 'Arial, sans-serif',
        fontSize: '19px',
    }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'>
                &nbsp;
                <div className='hover-underline' 
                style={divStyle}>
                 Fernando
                </div>
            </i>
        </span>
        <button className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
