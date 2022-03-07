import axios from 'axios';

const API = axios.create({ baseURL:'https://mad-dj-app.herokuapp.com/' });

export const createDrive = (drive) => API.post('drive/', drive);

export const donate = (donation) => API.post('drive/1/history/', donation);

