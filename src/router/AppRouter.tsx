import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPages } from '../auth'
import { CalendarPage } from '../calendar'

export const AppRouter = () => {
    const authStatus =  'authenticated';//'authenticated';
    return (
    <Routes>
        {
            (authStatus === 'not-authenticated')
            ? <Route path='/auth/*' element={<LoginPages></LoginPages> } />
            : <Route path='/*' element={<CalendarPage></CalendarPage>} />
        }
        <Route path='/*' element={<Navigate to='/auth/login' />} />

    </Routes>
  )
}
