export type MFSStatus = 200 | 500

export type CallbackFunction<T> = (status: MFSStatus, response: T) => void

export type MasterPassBoolean = 'Y' | 'N'

export interface MFSBaseResponse {
    referenceNo: string
    responseCode: string
    responseDescription: string
    newMsisdn: string
    internalResponseCode: string
    internalResponseDescription: string
    transactionId: string
    cardUniqueId: string
}

export type MFSSetAddressFunction = (serviceUrl: string) => void

export type SetAddressFunction = (serviceUrl: string) => void

export type MFSSetClientIdFunction = (clientId: string) => void

export type SetClientIdFunction = (serviceUrl: string) => void

export interface CheckMasterPassData {
    userId: string
    token: string
    referenceNo: string
    sendSms: MasterPassBoolean
    sendSmsLanguage: string
}

export interface CheckMasterPassResponse extends MFSBaseResponse {
    accountStatus: string
    amount: string
    orderNo: string
    token: string
    url3D: string
    url3DError: string
    url3DSuccess: string
    urlLoan: string
    urlLoanError: string
    urlLoanSuccess: string
}

export type MFSCheckMasterPassFunction = (
    data: CheckMasterPassData,
    callback: CallbackFunction<CheckMasterPassResponse>
) => void

export type CheckMasterPassFunction = (
    data: CheckMasterPassData
) => Promise<CheckMasterPassResponse>

export interface MasterPassCard {
    Name: string
    PromtCpin: MasterPassBoolean
    Value1: string
    Value2: string
    IsMasterPassMember: MasterPassBoolean
    CardStatus: string
    BankIca: string
    LoyaltyCode: string
    ProductName: string
    UniqueId: string
    EftCode: string
}

export interface ListCardsResponse extends MFSBaseResponse {
    cards: MasterPassCard[]
}

export type MFSListCardsFunction = (
    msisdn: string,
    token: string,
    callback: CallbackFunction<any>
) => void

export type ListCardsFunction = (
    msisdn: string,
    token: string
) => Promise<ListCardsResponse>

export interface RegisterData {
    actionType?: string
    clientIp?: string
    delinkReason?: string
    eActionType?: string
    cardTypeFlag?: string
    cpinFlag?: MasterPassBoolean
    defaultAccount?: MasterPassBoolean
    mmrpConfig?: string
    identityVerificationFlag?: MasterPassBoolean
    mobileAccountConfig?: string
    msisdn: string
    referenceNo: string
    sendSms: MasterPassBoolean
    sendSmsLanguage: string
    timeZone?: string
    uiChannelType?: string
    rtaPan: string
    expiryDate: string
    accountAliasName: string
    cvc?: string
    homeAddress?: string
    homeCity?: string
    homeState?: string
    homeCountryCode?: string
    homePostalCode?: string
    firstName?: string
    lastName?: string
    email?: string
    cardHolderName?: string
    token: string
}

export interface RegisterResponse extends MFSBaseResponse {
    url3D: string
    url3DSuccess: string
    url3DError: string
}

export type MFSRegisterFunction = (
    data: RegisterData,
    callback: CallbackFunction<RegisterResponse>
) => void

export type RegisterFunction = (data: RegisterData) => Promise<RegisterResponse>

export interface ValidateTransactionData {
    validationCode: string
    token: string
    referenceNo: string
    sendSms: MasterPassBoolean
    sendSmsLanguage: string
    pinType?: string
}

export interface ValidateTransactionResponse extends MFSBaseResponse {
    url3D: string | undefined
    url3DError: string | undefined
    url3DSuccess: string | undefined
}

export type MFSValidateTransactionFunction = (
    data: ValidateTransactionData,
    callback: CallbackFunction<any>
) => void

export type ValidateTransactionFunction = (
    data: ValidateTransactionData
) => Promise<ValidateTransactionResponse>

export interface DeleteCardData {
    accountAliasName: string
    msisdn: string
    token: string
    referenceNo: string
    sendSmsLanguage: string
    sendSms: MasterPassBoolean
}

export interface DeleteCardResponse extends MFSBaseResponse {}

export type MFSDeleteCardFunction = (
    data: DeleteCardData,
    callback: CallbackFunction<DeleteCardResponse>
) => void

export type DeleteCardFunction = (
    data: DeleteCardData
) => Promise<DeleteCardResponse>

export interface ResendOtpResponse extends MFSBaseResponse {}

export type MFSResendOtpFunction = (
    lastToken: string,
    sendSmsLanguage: string,
    callback: CallbackFunction<ResendOtpResponse>
) => void

export type MFSGetLastTokenFunction = () => string

export type GetLastTokenFunction = () => string

export type ResendOtpFunction = (
    sendSmsLanguage: string
) => Promise<ResendOtpResponse>

export interface LinkCardToClientData {
    msisdn: string
    token: string
    referenceNo: string
    sendSms: MasterPassBoolean
    sendSmsLanguage: string
    cardAliasName?: string
}

export interface LinkCardToClientResponse extends MFSBaseResponse {}

export type MFSLinkCardToClientFunction = (
    data: LinkCardToClientData,
    callback: CallbackFunction<LinkCardToClientResponse>
) => void

export type LinkCardToClientFunction = (
    data: LinkCardToClientData
) => Promise<LinkCardToClientResponse>

export interface PurchaseData {
    aav?: string
    amount: string
    clientIp?: string
    encCPin?: string
    encPassword?: string
    listAccountName: string
    msisdn: string
    password?: string
    referenceNo: string
    sendSms?: MasterPassBoolean
    sendSmsLanguage: string
    sendSmsMerchant?: MasterPassBoolean
    userId?: string
    token: string
    rewardName?: string
    rewardValue?: string
    moneyCardInvoiceAmount?: string
    moneyCardMigrosDiscountAmount?: string
    moneyCardPaymentAmount?: string
    moneyCardExtraDiscountAmount?: string
    moneyCardProductBasedDiscountAmount?: string
    installmentCount?: string
    cvc?: string
    macroMerchantId?: string
    orderNo?: string
    paymentType?: string
}

export interface PurchaseResponse extends MFSBaseResponse {}

export type MFSPurchaseFunction = (
    data: PurchaseData,
    callback: CallbackFunction<PurchaseResponse>
) => void

export type PurchaseFunction = (data: PurchaseData) => Promise<PurchaseResponse>

export type MFSSetAdditionalParameters = (data: object) => void

export type SetAdditionalParameters = (data: object) => void

export interface MasterPassSDKMethods {
    setAddress: MFSSetAddressFunction
    setClientId: MFSSetClientIdFunction
    checkMasterPass: MFSCheckMasterPassFunction
    listCards: MFSListCardsFunction
    register: MFSRegisterFunction
    validateTransaction: MFSValidateTransactionFunction
    deleteCard: MFSDeleteCardFunction
    getLastToken: MFSGetLastTokenFunction
    resendOTP: MFSResendOtpFunction
    linkCardToClient: MFSLinkCardToClientFunction
    purchase: MFSPurchaseFunction
    setAdditionalParameters: MFSSetAdditionalParameters
}

export type AccountType = 'not-user' | 'unliked' | 'registered' | 'unknown'

export type ParseAccountStatusFunction = (accountStatus: string) => AccountType

export type MFSResponseHandlerFunction = (
    status: MFSStatus,
    response: MFSBaseResponse,
    resolve: Function,
    reject: Function
) => Promise<void>

export interface DefaultMethodDataConstants {
    register: Partial<RegisterData>
    validateTransaction: Partial<ValidateTransactionData>
    purchase: Partial<PurchaseData>
}
