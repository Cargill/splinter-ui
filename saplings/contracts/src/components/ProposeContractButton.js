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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProposeContractButton.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProposeContractButton = () => {
  const plusSign = (
    <span className="add-sign" >
      <FontAwesomeIcon icon={faPlus}/>
    </span>
  );

  // const userHasKeys = window.$CANOPY.getKeys();

  return (
    <Link
      className={'propose-contract-btn'}
      to={'/contracts/propose'}
    >
      {plusSign}
      <span className="btn-text">Propose New Contract</span>
      
    
    </Link>
  );
};

export default ProposeContractButton;
