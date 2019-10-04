import axios from 'axios'

// set your emulator IP on Genymotion and change 'localhost'
const EMULATOR_IP = 'localhost'

const api = axios.create({
  baseURL: `http://${EMULATOR_IP}:3333`,
})

export default api
