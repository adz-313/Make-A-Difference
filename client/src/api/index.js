import axios from 'axios';

const API = axios.create({ baseURL:'https://mad-dj-app.herokuapp.com/' });

export const createDrive = (drive) => API.post('drive/', drive);

export const recordTransaction = (address, donation) => API.post(`drive/${address}/history`, donation);

