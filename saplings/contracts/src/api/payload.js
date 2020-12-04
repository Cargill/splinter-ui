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

import {
  Secp256k1Signer,
  Secp256k1PrivateKey,
  BatchBuilder,
  TransactionBuilder,
  PublicKey
} from 'transact-sdk-javascript';
import protos from '../protobuf';

export const makePayload = (
  privateKey,
  publicKey,
  contractName,
  contractRegistryName,
  inputs,
  outputs,
  version,
  contract,
  namespaceRegistries,
  owners
) => {
  let createContractRegistry = {};
  let createContract = {};
  let transactions = [];
  const registryTransactions = [];
  let batchBytes = null;
  let transactionContractRegistry = null;
  let transactionCreateContractAction = null;
  const publicKeyBytes = PublicKey.fromHex(publicKey);

  const secp256PrivateKey = Secp256k1PrivateKey.fromHex(privateKey);
  const signer = new Secp256k1Signer(secp256PrivateKey);

  createContractRegistry = protos.CreateContractRegistryAction.encode({
    name: contractRegistryName,
    owners
  }).finish();

  transactionContractRegistry = new TransactionBuilder()
    .withBatcherPublicKey(publicKeyBytes)
    .withDependencies([])
    .withFamilyName('sabre')
    .withFamilyVersion('1.0')
    .withInputs(inputs)
    .withOutputs(outputs)
    .withPayload(createContractRegistry)
    .build(signer);

  createContract = protos.CreateContractAction.encode({
    name: contractName,
    version,
    inputs,
    outputs,
    contract
  }).finish();

  transactionCreateContractAction = new TransactionBuilder()
    .withBatcherPublicKey(publicKeyBytes)
    .withDependencies([])
    .withFamilyName('sabre')
    .withFamilyVersion('1.0')
    .withInputs(inputs)
    .withOutputs(outputs)
    .withPayload(createContract)
    .build(signer);

  namespaceRegistries.forEach(registry => {
    let createNamespaceRegistry = {};
    let createPermissions = {};
    let transactionCreateNamespaceRegistryAction = null;
    let transactionCreateNamespaceRegistryPermissionAction = null;

    createNamespaceRegistry = protos.CreateNamespaceRegistryAction.encode({
      namespace: registry.name,
      owners: registry.owners
    }).finish();

    transactionCreateNamespaceRegistryAction = new TransactionBuilder()
      .withBatcherPublicKey(publicKeyBytes)
      .withDependencies([])
      .withFamilyName('sabre')
      .withFamilyVersion('1.0')
      .withInputs(inputs)
      .withOutputs(outputs)
      .withPayload(createNamespaceRegistry)
      .build(signer);

    createPermissions = protos.CreateNamespaceRegistryPermissionAction.encode({
      namespace: registry.name,
      contractName,
      read: registry.read,
      write: registry.write
    }).finish();

    transactionCreateNamespaceRegistryPermissionAction = new TransactionBuilder()
      .withBatcherPublicKey(publicKeyBytes)
      .withDependencies([])
      .withFamilyName('sabre')
      .withFamilyVersion('1.0')
      .withInputs(inputs)
      .withOutputs(outputs)
      .withPayload(createPermissions)
      .build(signer);

    registryTransactions.push([
      transactionCreateNamespaceRegistryAction,
      transactionCreateNamespaceRegistryPermissionAction
    ]);
  });

  transactions = [transactionContractRegistry, transactionCreateContractAction];
  registryTransactions.forEach(registryTransaction => {
    transactions.push(registryTransaction[0]);
    transactions.push(registryTransaction[1]);
  });

  batchBytes = new BatchBuilder()
    .withTransactions(transactions)
    .withTrace(false)
    .build(signer);

  return batchBytes;
};
