/**
 * Copyright 2018-2020 Cargill Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Secp256k1Signer, Secp256k1PrivateKey } from 'transact-sdk-javascript';

import crypto from 'crypto';
import protos from '../protobuf';

export const makeTransaction = (
    public_key,
    private_key,
    action,
    actionType
) => {
    let transactionHeaderBytes = null;
    let transaction = null;
    let hashPayload = null;
    let payloadbytes = null;
    const secp256PrivateKey = Secp256k1PrivateKey.fromHex(private_key);
    const signer = new Secp256k1Signer(secp256PrivateKey);
    const generateRandomNonceValue = (+new Date).toString(36);

    switch (actionType) {
        case 'createContractRegistry': {          
            payloadbytes = protos.CreateContractRegistryAction.encode(action).finish();
            hashPayload = crypto.createHash('sha512').update(payloadbytes);
            break;
        }
        case 'createContract': {
            payloadbytes = protos.CreateContractAction.encode(action).finish();
            hashPayload = crypto.createHash('sha512').update(payloadbytes);
            break;
        }
        case 'createNamespaceRegistry': {
            payloadbytes = protos.CreateNamespaceRegistryAction.encode(action).finish();
            hashPayload = crypto.createHash('sha512').update(payloadbytes);
            break;
        }
        case 'createNamespaceRegistryPermissionAction': {
            payloadbytes = protos.CreateNamespaceRegistryPermissionAction.encode(action).finish();
            hashPayload = crypto.createHash('sha512').update(payloadbytes);
            break;
        }
        default:
            throw new Error(`unhandled action type: ${action.type}`);
    }

    transactionHeaderBytes = protos.TransactionHeader.encode({
        batcher_public_key: public_key,
        family_name: "sabre",
        family_version: "1.0",
        nonce: generateRandomNonceValue,
        payload_sha512: hashPayload,
        signer_public_key: public_key
    }).finish();

    const signature = signer.sign(transactionHeaderBytes);

    transaction = protos.Transaction.create({
        header: transactionHeaderBytes,
        header_signature: signature,
        payload: payloadbytes
    });
    
    return transaction;
};
