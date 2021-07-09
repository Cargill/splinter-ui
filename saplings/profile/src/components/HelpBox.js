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
import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import proptypes from 'prop-types';
import './HelpBox.scss';

export const HelpBox = ({ helpText }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="help" title="help">
      <button
        id="help-btn"
        className={`help-button${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
      >
      <Icon>help_outline_icon</Icon>
      </button>
      <div className={`help-text${open ? ' open' : ''}`}>{helpText}</div>
    </div>
  )
}

HelpBox.propTypes = {
  helpText: proptypes.string.isRequired,
};
