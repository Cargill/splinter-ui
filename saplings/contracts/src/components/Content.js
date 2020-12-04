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
import ContractsTable from './contractTable/Table';

import './Content.scss';

const dummyJsonData = [
  {
    name: 'int-key-multiply',
    members: ['a71261', 't98012'],
    version: '1.1'
  },
  {
    name: 'contract-234',
    members: ['f41256', 'p90751'],
    version: '2.2'
  }
];

const Content = () => {
  return (
    <div className="main-content">
      <ContractsTable contractsData={dummyJsonData} />
    </div>
  );
};

export default Content;
