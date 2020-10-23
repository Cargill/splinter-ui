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
import { getSharedConfig } from 'splinter-saplingjs';
import { get, post } from './requests';

import { makePayload } from './payload';

const { splinterURL } = getSharedConfig().canopyConfig;

export const listCircuits = async () => {
    const result = await get(`${splinterURL}/admin/circuits`);
  
    if (result.ok) {
      return result.json;
    }
    throw Error(result.data);
  };

export const getCircuit = async circuitId => {
    const result = await get(`${splinterURL}/admin/circuits/${circuitId}`);
  
    if (result.ok) {
      return result.json;
    }
    throw Error(result.data);
};

export const getNodeRegistry = async () => {
  const result = await get(`${splinterURL}/registry/nodes`);

  if (result.ok) {
    const response = new NodeRegistryResponse(result.json);
    return response.data;
  }
  throw Error(result.data);
};

export const createCallPayload = async (fileBuffer) => {

  const payload_result = makePayload(
    "701055fadc7d68014ab9078f357655f3ab412fc1f0f323726c2eef7216423ee9",
    "0287582756592963f0df29f2f4a590830021df5aeaf13dd5d497348f07c05d1277",
    '00ec03',
    'intkey_multiply',
    true,
    true,
    ['00ec03', '1cf126', 'cad11d'],
    ['00ec03', '1cf126', 'cad11d'],
    '1.0',
    fileBuffer, 
    ['0287582756592963f0df29f2f4a590830021df5aeaf13dd5d497348f07c05d1277', '03db5a394a49a984bf96f800200ebaf70a513b0f004baf22aca35387fb68b7f7c7']
  );
  try {
    await postSmartContractPayload(payload_result);
  } catch (e) {
    console.log(e);
  }
  
};

export const postSmartContractPayload = async payload => {
  const result = await post(`${splinterURL}/scabbard/TTmc6-r2ZKR/abcd/batches`, payload);
  if (!result.ok) {
    throw Error(result.json.message);
  }
};
