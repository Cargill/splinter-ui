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
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

import { Contract } from '../../data/contracts';
// import { useNodeRegistryState } from '../../state/nodeRegistry';

const TableRow = ({ contract }) => {
  // const history = useHistory();
  const maxCountShow = 3;
  const name = () => {
    return contract.name;
  };

  const version = () => {
    return contract.version;
  }

  const input = (inputs) => {
    return inputs.map((input, index) => {
      if (index < maxCountShow) {
        return `${input} \n`;
      }
      if (index === maxCountShow) {
        return `and ${inputs.length - maxCountShow} more...`;
      }
    });
  }

  return (
    <tr
      className="table-row"
      // onClick={() => {
      //   history.push(`/circuits/${circuit.id}`);
      // }}
    >
      {/* <td className="text-highlight">{circuit.id}</td> */}
      <td>{name()}</td>
      <td>{input(contract.inputs)}</td>
      <td>{version()}</td>
    </tr>
  );
};

TableRow.propTypes = {
  contract: PropTypes.instanceOf(Contract).isRequired
};

export default TableRow;
