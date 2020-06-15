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

import { useState, useEffect } from 'react';
import { getNodeRegistry } from '../api/splinter';

function useNodeRegistryState() {
  const [nodesState, setNodes] = useState({ isSet: false, nodes: [] });

  useEffect(() => {
    const getNodes = async () => {
      if (!nodesState.isSet) {
        try {
          const nodes = await getNodeRegistry();
          setNodes({ isSet: true, nodes });
        } catch (e) {
          throw Error(`Error fetching information from node registry: ${e}`);
        }
      }
    };
    getNodes();
  }, [nodesState]);

  return nodesState.nodes;
}

export { useNodeRegistryState };
