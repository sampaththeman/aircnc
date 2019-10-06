import axios from 'axios';

import serverConfig from '../config/serverConfig'

export default axios.create({
  baseURL: serverConfig.URL
})
