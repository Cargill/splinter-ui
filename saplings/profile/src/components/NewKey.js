/**
 * Copyright 2018-2021 Cargill Incorporated
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
import './NewKey.scss';
import Icon from '@material-ui/core/Icon';

export function NewKey() {
  return (
    <div id="new-key">
      <section className="sapling-header">
        <div className="sapling-name">
          Profile
        </div>
      </section>
        <div className="header" />
        <div className="form-box">
          <div className="form-header">
            <div className="header-icon">
              <Icon>vpn_key_icon</Icon>
            </div>
            Create Key
          </div>
          <div className="line" />
          <div className="key-form">
            <form id="new-key-form" action="/profile">
              <div className="input">
                <label htmlFor="key-name">
                  <div className="field-required">
                    Key Name
                    <div className="required-indicator">*</div>
                  </div>
                  <input type="text" id="key-name" name="key-name" required />
                </label>
              </div>
              <div className="input">
                <label htmlFor="public-key">
                  <div className="field-required">
                    Public Key
                    <div className="required-indicator">*</div>
                  </div> 
                  <input type="text" id="public-key" name="public-key" required />
                  </label>
              </div>
              <div className="input">
                <label htmlFor="private-key">
                  <div className="field-required">
                    Private Key
                    <div className="required-indicator">*</div>
                  </div>
                  <div className="generate-key">
                    <input type="password" id="private-key" name="private-key" required />
                    <button className="generate-button"><Icon>refresh_icon</Icon></button>
                  </div>
                </label>
              </div>
              <div className="input">
                <label htmlFor="password">
                  <div className="field-required">
                    Password
                    <div className="required-indicator">*</div>
                  </div>
                  <input type="password" id="password" name="password" required />
                </label>
              </div>
              <div className="action-buttons">
                <input id="cancel" type="button" onClick="window.location.replace('/profile')" value="Cancel" /> 
                <input id="submit-key" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}