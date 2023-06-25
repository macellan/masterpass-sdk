import MFS from './MFS'
import Constants from './Constants'
import Utils from './Utils'
import {
  CheckMasterPassFunction,
  DeleteCardFunction,
  GetLastTokenFunction,
  LinkCardToClientFunction,
  ListCardsFunction,
  PurchaseFunction,
  RegisterFunction,
  ResendOTPFunction,
  SetAddressFunction,
  SetClientIdFunction,
  ValidateTransactionFunction,
} from './Types'

export default class MasterPass {
  // MasterPass Utils Methods
  public static Utils = Utils

  // MasterPass Constants
  public static Constants = Constants

  // Set Adress Method
  public static setAddress: SetAddressFunction = MFS.setAddress

  // Set Client Id Method
  public static setClientId: SetClientIdFunction = MFS.setClientId

  // Get Last Token Method
  public static getLastToken: GetLastTokenFunction = MFS.getLastToken

  // Check MasterPass Method
  public static checkMasterPass: CheckMasterPassFunction = async data =>
    new Promise((resolve, reject) => {
      MFS.checkMasterPass(data, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // List Cards Method
  public static listCards: ListCardsFunction = async (msisdn, token) =>
    new Promise((resolve, reject) => {
      MFS.listCards(msisdn, token, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Register Method
  public static register: RegisterFunction = async data =>
    new Promise((resolve, reject) => {
      const combined = { ...Constants.DefaultMethodData.register, ...data }

      MFS.register(combined, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Validate Transaction Method
  public static validateTransaction: ValidateTransactionFunction = async data =>
    new Promise((resolve, reject) => {
      const combined = {
        ...Constants.DefaultMethodData.validateTransaction,
        ...data,
      }

      MFS.validateTransaction(combined, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Delete Card Method
  public static deleteCard: DeleteCardFunction = async data =>
    new Promise((resolve, reject) => {
      MFS.deleteCard(data, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Resend OTP Method
  public static resendOTP: ResendOTPFunction = async sendSMsLanguage =>
    new Promise((resolve, reject) => {
      const lastToken = MFS.getLastToken()

      MFS.resendOTP(lastToken, sendSMsLanguage, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Link Card To Client Method
  public static linkCardToClient: LinkCardToClientFunction = async data =>
    new Promise((resolve, reject) => {
      MFS.linkCardToClient(data, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // Purchase Method
  public static purchase: PurchaseFunction = async data =>
    new Promise((resolve, reject) => {
      const combined = { ...Constants.DefaultMethodData.purchase, ...data }

      MFS.purchase(combined, (status, response) => {
        return Utils.mfsResponseHandler(status, response, resolve, reject)
      })
    })

  // SetAdditionalParameters Method
  public static setAdditionalParameters = MFS.setAdditionalParameters
}
