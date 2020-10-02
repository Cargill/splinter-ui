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

import { makeBatch } from "./batch";

 export const makePayload = (
    private_key, 
    public_key,
    namespace, 
    contract_name,
    permission_read, 
    permission_write, 
    inputs,
    outputs, 
    version, 
    contract, 
    owners
 ) => {
    let create_contact_registry = {};
    let create_contract = {};
    let create_namespace_registry = {};
    let create_permissions = {};
    let payloads = [];
    let actionTypes = [];
    let batchBytes = null;

    create_contact_registry = protos.CreateContractRegistryAction.create({
        name: contract_name,
        owners: owners
    });

    create_contract = protos.CreateContractAction.create({
        name: contract_name,
        version: version,
        inputs: inputs,
        outputs: outputs,
        contract: contract
    });

    create_namespace_registry = protos.CreateNamespaceRegistryAction.create({
        namespace: namespace,
        owners: owners
    });

    create_permissions = protos.CreateNamespaceRegistryPermissionAction.create({
        namespace: namespace,
        contract_name: contract_name,
        read: permission_read,
        write: permission_write
    });

    payloads.push(create_contact_registry);
    payloads.push(create_contract);
    payloads.push(create_namespace_registry);
    payloads.push(create_permissions);

    actionTypes.push("createContractRegistry");
    actionTypes.push("createContract");
    actionTypes.push("createNamespaceRegistry");
    actionTypes.push("createNamespaceRegistryPermissionAction");

    batchBytes = makeBatch(payloads, actionTypes, private_key, public_key);
    return batchBytes;
 }