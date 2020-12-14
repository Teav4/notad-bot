declare namespace ICardVipVN {
  
  export interface CardInfo {
    network: string, 
    price: number, 
    privateCode: string, 
    cardSeries: string, 
    isFast: boolean, 
    requestID: string,
  }

}