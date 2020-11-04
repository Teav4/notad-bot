import Tichhop247 from '../services/tichhop247'
import config from 'config'

const tichhop247 = new Tichhop247(config.tichhop247_key || '')

tichhop247.Add()