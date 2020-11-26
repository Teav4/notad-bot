import config from '../config'
import { isNumberic } from '../helper/number'

interface _validateResult {
  isPassed: boolean,
  message?: string,
}

function network(data: string): _validateResult {
  const networkList = config.tichhop247_network_list

  if (networkList.includes(data) === false) {
    return {
      isPassed: false,
      message: `Mã nhà mạng không phù hợp, chỉ bao gồm Viettel (VTT), Mobifone (VMS), Vinaphone (VNP) và Vietnammobile (VNM).`
    }
  }

  return {
    isPassed: true
  }
}

function privateCode(data: string): _validateResult {
  if (! isNumberic(data) || data.length < 14 || data.length > 18) {
    return {
      isPassed: false,
      message: `Số thẻ không đúng định dạng.`
    }
  }

  return {
    isPassed: true
  }
}

function series(data: string): _validateResult {
  if (! isNumberic(data) || data.length < 14 || data.length > 18) {
    return {
      isPassed: false,
      message: `Số series không đúng định dạng.`
    }
  }

  return {
    isPassed: true
  }
}

function value(data: string): _validateResult {
  const cardType = config.tichhop247_card_type
  
  if (! isNumberic(data) || cardType.includes(parseInt(data, 10)) === false) {
    return {
      isPassed: false,
      message: `Giá trị thẻ không hợp lệ, vui lòng thử lại.`
    }
  }

  return {
    isPassed: true
  }
}

export default { network, privateCode, series, value }
