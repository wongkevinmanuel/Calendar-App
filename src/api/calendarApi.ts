import axios from "axios";

const { VITE_API_URL } = import.meta.env.VITE_API_URL;

//`https://appcalendar-backend.onrender.com/api` funciona
/* headers: {
        'Content-Type': 'application/json',
        // Opcional: A veces necesario, aunque el backend debe autorizarlo
        'Access-Control-Allow-Origin': '*', 
}*/
const calendarApi = axios.create({
    baseURL: `http://localhost:3000/api`,
})

//TODO: configurar interseptores

export default calendarApi;