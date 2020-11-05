import Tichhop247 from '../services/tichhop247'
import config from '../config'

const tichhop247 = new Tichhop247(config.tichhop247_key || '')

tichhop247
  .Add('VNM', '173242363290', '2026000002365450', 10000, '123478d1012')
  .then(console.log)

// tichhop247
//   .CheckStatus('123478ds10')
//   .then(console.log)
