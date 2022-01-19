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

import React from 'react';
import proptypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import './PermissionError.scss';

export const PermissionError = ({ contact }) => {
  return (
    <div className="permission-page-block">
      <div className="permission-error-box">
        <div className="permission-error">
          <div className="error-header">
            <div className="error-header-icon">
              <Icon>error_outline_icon</Icon>
            </div>
            <div className="error-header-text">Access Denied</div>
          </div>
          <div className="error-text">
            Account does not have the required permissions to access this page.
            {contact}
          </div>
        </div>
      </div>
    </div>
  );
};

PermissionError.propTypes = {
  contact: proptypes.string
};

PermissionError.defaultProps = {
  contact: ''
};
