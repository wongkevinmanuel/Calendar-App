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
        name: '',//'Janes Doe',
        email: '',//'janesdoes@example.com'
    },
    errorMessage: undefined
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
            };
            state.errorMessage = undefined;
        },
        onLogin: (state, action:PayloadAction<{ name: string, email: string }>)=>{
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action: PayloadAction<{error: string}>) => {
            state.status = 'not-authenticated';
            state.user = {
                name: '',
                email: ''
            }
            state.errorMessage = action.payload.error;
        },
        clearErrorMessage: (state) =>{
            state.errorMessage = undefined;
        }

    }
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;