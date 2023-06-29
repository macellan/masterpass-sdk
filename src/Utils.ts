import Constants from './Constants'
import { ParseAccountStatusFunction, MFSResponseHandlerFunction } from './Types'

const mfsResponseHandler: MFSResponseHandlerFunction = (
    status,
    response,
    resolve,
    reject
) => {
    if (status !== 200) {
        return reject({
            status: 'unknown',
            message: 'Connection Error',
            response: {},
        })
    }

    if (
        response.responseCode === Constants.ResponseCodes.SUCCESS_EMPTY ||
        response.responseCode === Constants.ResponseCodes.SUCCESS ||
        response.responseCode === Constants.ResponseCodes.VALIDATE_OTP ||
        response.responseCode === Constants.ResponseCodes.VALIDATE_MPIN ||
        response.responseCode === Constants.ResponseCodes.VALIDATE_DEVICE ||
        response.responseCode === Constants.ResponseCodes.VALIDATE_3D_SECURE ||
        response.responseCode === Constants.ResponseCodes.PIN_DETERMINATION
    ) {
        return resolve(response)
    }

    reject({
        status: response.responseCode,
        message: response.responseDescription,
        response: response,
    })
}

const parseAccountStatus: ParseAccountStatusFunction = accountStatus => {
    if (accountStatus.substring(0, 6) === '000000') return 'not-user'
    if (accountStatus.substring(1, 6) === '11000') return 'unliked'
    if (accountStatus.substring(1, 6) === '11100') return 'registered'
    return 'unknown'
}

export default {
    mfsResponseHandler: mfsResponseHandler,
    parseAccountStatus: parseAccountStatus,
}
