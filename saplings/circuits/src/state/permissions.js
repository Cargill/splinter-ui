/**
 * Copyright 2018-2022 Cargill Incorporated
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

import { getUser } from 'splinter-saplingjs';
import { useEffect, useState } from 'react';
import { listCircuits } from '../api/splinter';

function checkUserCircuitPermission() {
  const user = getUser();

  const [userCircuitPermission, setUserCircuitPermission] = useState({
    circuitPermission: null
  });
  useEffect(() => {
    const getPermission = async () => {
      if (user) {
        try {
          await listCircuits(user.token);
          setUserCircuitPermission({ circuitPermission: true });
        } catch (error) {
          if (error.code === '401') {
            setUserCircuitPermission({ circuitPermission: false });
          } else {
            throw Error(
              `Error checking user circuit permission: ${error.json.message}`
            );
          }
        }
      }
    };
    getPermission();
  }, [user]);
  return userCircuitPermission;
}

export { checkUserCircuitPermission };
