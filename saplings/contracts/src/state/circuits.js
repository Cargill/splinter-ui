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

import { useEffect, useState } from 'react';
import {
  getProposal,
  getCircuit
} from '../api/splinter';

import { Circuit } from '../data/circuits';

const REFREST_INTERVAL = 10000; // ten seconds;

function useCircuitState(circuitId) {
  const [stateCircuitId, setCircuitId] = useState(circuitId);
  const [circuit, setCircuit] = useState(null);

  useEffect(() => {
    const loadCircuit = async () => {
      if (stateCircuitId) {
        let apiCircuit = null;
        try {
          apiCircuit = await getCircuit(stateCircuitId);
        } catch (circuitError) {
          try {
            apiCircuit = await getProposal(stateCircuitId);
          } catch (proposalError) {
            throw Error(
              `Unable to fetch ${stateCircuitId} from the splinter daemon`
            );
          }
        }

        setCircuit(new Circuit(apiCircuit));
      }
    };
    const intervalId = setInterval(() => loadCircuit(), REFREST_INTERVAL);

    // call it initially.
    loadCircuit();

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [stateCircuitId]);

  return [circuit, setCircuitId];
}

export { useCircuitState };
