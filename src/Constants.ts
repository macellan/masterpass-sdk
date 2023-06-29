import { DefaultMethodDataConstants } from './Types'

const DefaultMethodData: DefaultMethodDataConstants = {
    register: {
        actionType: 'A',
        eActionType: 'A',
        cardTypeFlag: '05',
        cpinFlag: 'Y',
        defaultAccount: 'Y',
        mmrpConfig: '110010',
        identityVerificationFlag: 'Y',
        mobileAccountConfig: 'MWA',
        timeZone: '+01',
        uiChannelType: '06',
    },
    validateTransaction: {
        pinType: 'otp',
    },
    purchase: {
        macroMerchantId: '',
        orderNo: '',
        paymentType: '',
        installmentCount: '',
        rewardName: '',
        cvc: '',
        sendSms: 'N',
        aav: 'aav',
        clientIp: '',
        encCPin: '0',
        encPassword: '',
        sendSmsMerchant: 'Y',
        password: '',
    },
}

const ResponseCodes = {
    SUCCESS_EMPTY: '',
    SUCCESS: '0000',
    VALIDATE_OTP: '5001',
    VALIDATE_MPIN: '5002',
    VALIDATE_DEVICE: '5008',
    VALIDATE_3D_SECURE: '5010',
    PIN_DETERMINATION: '5015',
}

export default {
    DefaultMethodData: DefaultMethodData,
    ResponseCodes: ResponseCodes,
}
