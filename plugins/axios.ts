import axios from 'axios'
import { apiBaseUrl } from '~/contants/endpoints'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl, 
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})