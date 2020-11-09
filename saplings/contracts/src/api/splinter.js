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

export const createCallPayload = async () => {
  var fs = require('browserify-fs');
  let fileBuffer = null;
  fs.readFile('../../contract_wasm/intkey-multiply.wasm', 'utf-8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    fileBuffer = data;
    }
  );

  const payload_result = makePayload(
    "0a99cab0c5c26e96aad52cfa3dbbf947b16fa010fbf0ed7bcad4b73352c0779a",
    "0219a3f066fb244c1f7d4953882ca6a8641f91ace5baa1ce6b5b605c470b5e505e",
    '00ec03',
    'intkey_multiply',
    true,
    true,
    ['00ec03', '1cf126', 'cad11d'],
    ['00ec03', '1cf126', 'cad11d'],
    '1.0',
    fileBuffer, 
    ['0a99cab0c5c26e96aad52cfa3dbbf947b16fa010fbf0ed7bcad4b73352c0779a', '0219a3f066fb244c1f7d4953882ca6a8641f91ace5baa1ce6b5b605c470b5e505e']
  );
  try {
    await postSmartContractPayload(payload_result);
  } catch (e) {
    console.log(e);
  }
  
};

export const postSmartContractPayload = async payload => {
  const result = await post(`${splinterURL}/scabbard/aA3st-MV0eh/abcd/batches`, payload);

  if (!result.ok) {
    throw Error(result.json.message);
  }
};
