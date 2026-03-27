import { PayloadAction }  from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface authState {
    status: string,
    errorMessage?: string,
    user: {
        name: string,
        email: string
    }
}

const initialState: authState = {
    status: 'checking', // 'not-authenticated' // 'authenticated'
    user: {
        name: 'Janes Doe',
        email: 'janesdoes@example.com'
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {
                name: '', 
                email: ''
            }
        },
        onLogin: (state, action:PayloadAction<{ name: string, email: string }>)=>{
            state.status = 'authenticated';
            state.user = action.payload;
            //state.valueCounter += action.payload;
        }
    }
})

export const { onChecking, onLogin } = authSlice.actions;