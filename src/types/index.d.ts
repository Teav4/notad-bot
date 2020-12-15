declare type ISenderPSID = string 

declare interface IWebhookMessage {
  mid: string,
  is_echo: true,
  text: string,
  attachments: [
    {
      payload: {
        url: string
      }
    }
  ]
}

declare interface IWebhookMessageEvent {
  object : string,
  entry: [
    {
      id: string,
      time: number,
      messaging: [
        {
          sender: {
            id: IsenderPSID
          },
          recipient:{
            id: string
          },
          timestamp: number,
          message: IWebhookMessage,
          postback: any
        }
      ]
    }
  ]
}

declare interface IResponseMessage {
  text?: string,
  quick_replies?: any,
  attachment?: any
}

declare type IRole = 'admin' | 'user'
// MODELS
declare interface IUser {
  id?: number,
  user_id: number,
  facebook_psid: string,
  name: string,
  avatar: string,
  role: IRole,
}
interface ITransaction {
  id?: number,
  user_id: number,
  amount: number,
  fee: number,
  time: Date,
  description: string,
  method: 'momo' | 'thecao247' | 'cardvipvn',
  trans_id: string,
}
interface IWallet {
  user_id: number,
  balance: number,
  currency: string,
}

interface IUserAction {
  ID?: number,
  user_id: number,
  action_name: string,
  data: any,
  last_update?: number
}

declare namespace Models {
  interface Transaction {
    addNew(transaction: ITransaction): Promise<any>
    findByID(method: string, transactionID: string): Promise<ITransaction|null>
  }
  interface User {
    addUser(user: IUser): Promise<any>
    createNew(facebookPSID): Promise<IUser|null>
    findByID(userID: number): Promise<IUser|null>
    findByFacebookPSID(facebookPSID: string): Promise<IUser|null>
    removeUser(): void
  }
  interface Wallet {
    create(wallet: IWallet): Promise<any>
    update(wallet: IWallet): Promise<any>
    delete(userID: number): Promise<any>
    getWallet(userID: number): Promise<IWallet|null>
    addMoney(userID: number, value: number): promise<boolean>
  }

  interface UserAction {
    addNew(action: IUserAction): Promise<any>
    findByID(actionID: number): Promise<IUserAction[]|null>
    findByUserID(userID: number): Promise<IUserAction[]|null>
    findByDataString(data: string): Promise<IUserAction[]|null>
    updateDataByUserID(userID: number, data: any): Promise<any>
    deleteByID(actionID: number): Promise<any>
    deleteByUserID(userID: number): Promise<any>
  }
}

// TICH HOP 247

declare type ICardNetWorkType = 'VTT' | 'VMS' | 'VNP' | 'VNM'
declare interface ICardCheckStatus {
  Code: '1. Thành công' | '0. Thất bại' | '99. Lỗi hệ thống',
  Message: string,
  Reason: string,
  CardValue: number,
  StageName: string,
  Stage: 1 | 2 | 3 | 5 | 99,
}

declare interface ITichhop247 {
  /**
   * Gui yeu cau nap the
   */
  Add(network: ICardNetWorkType, privateCode: string, series: string, value: number, transactionID: string): Promise<boolean>;
  
  /**
   * Kiem tra tinh trang the da nap
   */
  CheckStatus: (transactionID: string) => Promise<ICardCheckStatus>
}

declare interface ICardVipVNAPI {
  /**
   * Tao yeu cau nap the
   * @param network ten nha mang
   * @param price menh gia the
   * @param privateCode ma the
   * @param cardSeries series
   * @param isFast true
   * @param requestID requestID
   */
  Add(cardData: ICardVipVN.CardInfo): Promise<any>
  
}

// MoMo API

interface IMomoTransaction {
  transactionID: number,
  phone: number,
  name: string,
  amount: number,
  comment: string,
  time: number,
}

declare interface IMomoTransferResponse {
  momoMsg: {
    bankInReply: {
      tranHisMsg: {
        otpType: string,
        ipAddress: string,
        _class: string
      },
      _class: string
    },
    replyMsgs: [
      {
        ID: string,
        transId: number,
        tranHisMsg: {
          ID: string,
          user: string,
          commandInd: string,
          tranId: number,
          clientTime: number,
          ackTime: number,
          finishTime: number,
          tranType: number,
          io: number,
          partnerId: string,
          partnerCode: string,
          partnerName: string,
          amount: number,
          status: number,
          ownerNumber: string,
          ownerName: string,
          moneySource: number,
          desc: string,
          serviceMode: string,
          originalAmount: number,
          serviceId: string,
          quantity: number,
          lastUpdate: number,
          share: string,
          receiverType: number,
          extras: string,
          channel: string,
          otpType: string,
          ipAddress: string,
          _class: string
        },
        id: string,
        _class: string
      }
    ],
    _class: string
  },
  time: number,
  user: string,
  pass: string,
  cmdId: string,
  lang: string,
  msgType: string,
  result: boolean,
  errorDesc: string,
  appCode: string,
  appVer: number,
  channel: string,
  deviceOS: string,
  ip: string,
  localAddress: string,
  session: string,
  extra: {
    CASHBACK: string,
    originalClass: string,
    originalPhone: string,
    validateOtpSuccess: string,
    FIELD_REMOVE: string,
    GOLDENPIG: string,
    BALANCE: string,
    otpVal: string,
    checkSum: string,
    details: string,
    POINT: string,
    otpCmdId: string
  }
}

declare interface IMomoAPI {
  transferToMomo(phone: string, value: number, name: string, desc: string): Promise<boolean>
  withdrawal(value: number, desc: string, phone: number, name?: string): Promise<boolean>
  listAll(): void
  checkTransaction(transactionID: number): Promise<IMomoTransaction | null>
}

interface IPersonProfile {
  firstName: string,
  lastName: string,
  avatarUrl: string
  locale: string,
  timezone: number,
  gender: "male"|"female",
}

declare interface IMessengerAPI {
  getPersonProfile(userPSID: string): Promise<IPersonProfile|null>
}
