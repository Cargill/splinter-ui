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
import { makeTransaction } from 'transaction.js'
import protos from '../protobuf';

export const makeBatch = (
    payloads, 
    actionTypes,
    private_key,
    public_key
) => {
    let transactions = [];
    let transactionIds = [];

    const secp256PrivateKey = Secp256k1PrivateKey.fromHex(privateKey);
    const signer = new Secp256k1Signer(secp256PrivateKey);

    for(var i = 0; payloads.length; i++) {
        transactions.push(makeTransaction(public_key, private_key, payloads[i], actionTypes[i]));
    }
    for(var i = 0; transactions.length; i++) {
        transactionIds.push(transactions[i].header_signature);
    }

    batchHeaderBytes = protos.BatchHeader.encode({
        signer_public_key: public_key, 
        transaction_ids: transactionIds
    }).finish();

    const signature = signer.sign(batchHeaderBytes);
    batchBytes = protos.Batch.encode({
        header: batchHeaderBytes,
        header_signature: signature,
        transactions: transactions
    }).finish();
    
    return batchBytes;
};
