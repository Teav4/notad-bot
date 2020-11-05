import Tichhop247 from '../services/tichhop247'
import config from '../config'

const tichhop247 = new Tichhop247(config.tichhop247_key || '')

tichhop247
  .Add('VNP', '31287547201982', '59000013736344', 10000, '123478ds10')
  .then(console.log)

tichhop247
  .CheckStatus('123478ds10')
  .then(console.log)
