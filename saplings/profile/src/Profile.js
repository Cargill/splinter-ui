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

import React from 'react';
import './Profile.scss';
import Icon from '@material-ui/core/Icon';
import { getUser } from 'splinter-saplingjs';
import { KeyTable } from './components/KeyTable';

export function Profile() {
  const user = getUser();

  return (
    <div id="profile">
      <section className="profile-info">
        <div className="profile-photo">
          <div className="icon">
            <Icon>person_icon</Icon>
          </div>
        </div>
        <div className="user-details">
          <div className="name">{user && user.displayName}</div>
          <div className="email">email@email.com</div>
        </div>
      </section>
      <KeyTable />
    </div>
  );
}
