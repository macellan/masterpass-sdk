# Macellan - MasterPass SDK

The Masterpass SDK provides a comprehensive set of features to interact with Masterpass services. This module includes utilities for handling various Masterpass-related tasks such as user registration, card management, transaction validation, and making purchases.

## Features

-   🛠️ **Ease of Use** : Simplifies interactions with the MasterPass Web SDK by removing the need to work with iframes and handling complex setups, presenting a straightforward API to accelerate development processes.

-   🌍 **Framework Agnostic**: The SDK is compatible with any JavaScript framework such as React, React Native, Vue, Angular, or Vanilla JavaScript, providing a versatile solution regardless of the technological stack.

-   💅 **Type Safety**: Fully supports TypeScript, offering a type-safe environment that helps in preventing many common bugs that can occur during development, ensuring more stable code.

## Installation

```bash
npm install @macellan/masterpass-sdk
```

```bash
yarn add @macellan/masterpass-sdk
```

## Usage

```ts
MasterPassSDK.setAddress('MASTERPASS_SERVICE_URL')
MasterPassSDK.setClientId('MASTERPASS_CLIENT_ID')

const registerResponse = await MasterPassSDK.register({
    msisdn: '1234567890', // Mobile number
    token: 'SOME_AUTH_TOKEN', // Authentication token received from your backend server
    rtaPan: '4512345678901234', // Real-time PAN (Primary Account Number) of the card
    expiryDate: '1224', // MMYY format
    accountAliasName: 'My Card', // A user-friendly name for the card
    sendSms: 'N', // Whether to send confirmation via SMS
    sendSmsLanguage: 'ENG', // Language of the SMS (often as language codes such as "ENG" for English)
    referenceNo: 'REF123456789', // Unique reference for the transaction
})

const listCardsResponse = await MasterPassSDK.listCards(
    '1234567890', // Mobile number
    'SOME_AUTH_TOKEN' // Authentication token received from your backend server
)
```

## API Reference

-   `setAddress(serviceUrl: string): void`

    -   Sets the address of the MasterPass service endpoint.

-   `setClientId(clientId: string): void`

    -   Sets the client ID for interaction with MasterPass services.

-   `checkMasterPass(data: CheckMasterPassData): Promise<CheckMasterPassResponse>`

    -   Checks the status with MasterPass using provided data.
    -   **Parameters:**
        -   `data: CheckMasterPassData` - Object containing user ID, token, etc.

-   `listCards(msisdn: string, token: string): Promise<ListCardsResponse>`

    -   Lists all linked cards associated with the given mobile number.
    -   **Parameters:**
        -   `msisdn: string` - Mobile number.
        -   `token: string` - Authentication token.

-   `register(data: RegisterData): Promise<RegisterResponse>`

    -   Registers a new card with MasterPass.
    -   **Parameters:**
        -   `data: RegisterData` - Registration data like msisdn, token, etc.

-   `validateTransaction(data: ValidateTransactionData): Promise<ValidateTransactionResponse>`

    -   Validates a transaction with the provided data.
    -   **Parameters:**
        -   `data: ValidateTransactionData` - Data for transaction validation.

-   `deleteCard(data: DeleteCardData): Promise<DeleteCardResponse>`

    -   Deletes a card from the MasterPass database.
    -   **Parameters:**
        -   `data: DeleteCardData` - Information of the card to be deleted.

*   `getLastToken(): string`

    -   Retrieves the last stored token.

-   `resendOtp(sendSmsLanguage: string): Promise<ResendOtpResponse>`

    -   Resends the OTP for user verification.
    -   **Parameters:**
        -   `sendSmsLanguage: string` - Language code for the SMS.

-   `linkCardToClient(data: LinkCardToClientData): Promise<LinkCardToClientResponse>`

    -   Links a card to a MasterPass client.
    -   **Parameters:**
        -   `data: LinkCardToClientData` - Data required for linking a card.

-   `purchase(data: PurchaseData): Promise<PurchaseResponse>`

    -   Processes a purchase transaction.
    -   **Parameters:**
        -   `data: PurchaseData` - Data required for the purchase.

-   `purchaseAndRegister(data: PurchaseAndRegisterData): Promise<PurchaseAndRegisterResponse>`

    -   Combines the actions of purchase and registration in a single step.
    -   **Parameters:**
        -   `data: PurchaseAndRegisterData` - Data for purchase and registration.

-   `directPurchase(data: DirectPurchaseData): Promise<DirectPurchaseResponse>`
    -   Initiates a direct purchase without a pre-linked card.
    -   **Parameters:**
        -   `data: DirectPurchaseData` - Data required for direct purchase.

*   `setAdditionalParameters(data: object): void`

    -   Sets additional parameters for configuration.
    -   **Parameters:**
        -   `data: object` - Parameters to be set.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

This project is licensed under the [MIT License](LICENSE).
