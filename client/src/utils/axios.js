import axios from 'axios';


export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://server-survey-hackaton.apps.cluster-lmzsk.lmzsk.sandbox209.opentlc.com/api'
    : 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});