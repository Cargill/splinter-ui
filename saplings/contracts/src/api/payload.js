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

import protos from '../protobuf';
import { Secp256k1Signer, Secp256k1PrivateKey, BatchBuilder, TransactionBuilder, PublicKey } from "transact-sdk-javascript";

 export const makePayload = (
    private_key, 
    public_key,
    contract_name,
    contract_registry_name,
    inputs,
    outputs, 
    version, 
    contract,
    namespace_registries,
    owners
 ) => {
    let create_contact_registry = {};
    let create_contract = {};
    let transactions = [];
    let registryTransactions = [];
    let batchBytes = null;
    let transaction_contact_registry = null;
    let transaction_create_contract_action = null;
    let publicKeyBytes = PublicKey.fromHex(public_key);

    const secp256PrivateKey = Secp256k1PrivateKey.fromHex(private_key);
    const signer = new Secp256k1Signer(secp256PrivateKey);

    create_contact_registry = protos.CreateContractRegistryAction.encode({
        name: contract_registry_name,
        owners: owners
    }).finish();
    
    transaction_contact_registry = new TransactionBuilder().withBatcherPublicKey(publicKeyBytes).withDependencies([]).withFamilyName('sabre').withFamilyVersion('1.0').withInputs(inputs).withOutputs(outputs).withPayload(create_contact_registry).build(signer);   
    
    create_contract = protos.CreateContractAction.encode({
        name: contract_name,
        version: version,
        inputs: inputs,
        outputs: outputs,
        contract: contract
    }).finish();

    transaction_create_contract_action = new TransactionBuilder().withBatcherPublicKey(publicKeyBytes).withDependencies([]).withFamilyName('sabre').withFamilyVersion('1.0').withInputs(inputs).withOutputs(outputs).withPayload(create_contract).build(signer);

    namespace_registries.forEach((registry) => {
        let create_namespace_registry = {};
        let create_permissions = {};
        let transaction_create_namespace_registry_action = null;
        let transaction_create_namespace_registry_permission_action = null;

        create_namespace_registry = protos.CreateNamespaceRegistryAction.encode({
            namespace: registry.name,
            owners: registry.owners
        }).finish();

        transaction_create_namespace_registry_action = new TransactionBuilder().withBatcherPublicKey(publicKeyBytes).withDependencies([]).withFamilyName('sabre').withFamilyVersion('1.0').withInputs(inputs).withOutputs(outputs).withPayload(create_namespace_registry).build(signer);
    
        create_permissions = protos.CreateNamespaceRegistryPermissionAction.encode({
            namespace: registry.name,
            contractName: contract_name,
            read: registry.read,
            write: registry.write
        }).finish();

        registryTransactions.push([transaction_create_namespace_registry_action, transaction_create_namespace_registry_permission_action]);
    })

    transaction_create_namespace_registry_permission_action = new TransactionBuilder().withBatcherPublicKey(publicKeyBytes).withDependencies([]).withFamilyName('sabre').withFamilyVersion('1.0').withInputs(inputs).withOutputs(outputs).withPayload(create_permissions).build(signer);

    transactions = [transaction_contact_registry, transaction_create_contract_action];
    registryTransactions.forEach((registryTransaction) => {
        transactions.push(registryTransaction);
    });
    
    batchBytes = new BatchBuilder().withTransactions(transactions).withTrace(false).build(signer);
    return batchBytes;
 }