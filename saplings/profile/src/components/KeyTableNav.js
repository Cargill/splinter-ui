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
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import './KeyTableNav.scss';

const KeyTableNav = ({ totalKeys }) => {
  return (
    <div className="table-nav">
      <div className="total-keys">{totalKeys} Keys</div>
      <div className="row-info">
        <div className="rows-label">Rows per page:</div>
        <div className="rows-per-page">10</div>
      </div>
      <div className="keys-currently-displayed">1-{totalKeys} of {totalKeys}</div>
      <div className="paging">
        <div className="page-nav" title="Click to go to the previous page">
          <Icon>keyboard_arrow_left_icon</Icon>
        </div>
        <div className="page-nav" title="Click to go to the next page">
          <Icon>keyboard_arrow_right_icon</Icon>
        </div>
      </div>
    </div>
  );
};

KeyTableNav.propTypes = {
  totalKeys: PropTypes.number.isRequired,
};

export default KeyTableNav;
