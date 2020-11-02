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

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import TableRow from './TableRow';
import TableHeader from './TableHeader';

import './ContractsTable.scss';

const dummyJsonData = [
  {
    name: "int-key-multiply",
    members: ['a71261', 't98012'],
    version: "1.1"
  },
  {
    name: "contract-234",
    members: ['f41256', 'p90751'],
    version: "2.2"
  }
]

let altered = [];

const ContractsTable = () => {
  // let rows = (
  //   <tr key="empty">
  //     <td colSpan="5" className="no-contracts-msg">
  //       No contracts found
  //     </td>
  //   </tr>
  // );

  // if (contracts.length > 0) {
  //   rows = contracts.map(item => {
  //     return <TableRow key={item.id} contracts={item} />;
  //   });
  // }
  const [ascending, setAscending] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let tempRows = [];
    if (ascending === null) {
     altered = dummyJsonData.sort((a, b) => {
        const res = (a.name > b.name) ? -1 : 1;
        return res;
      })
      setAscending(true);
      return;
    } else {
      altered = altered.reverse();
    }

    altered.forEach((datapoint) => {
      let members = "";
      datapoint.members.forEach((member, index) => {
        if (index == altered.length - 1) {
          members += member;
        } else {
          members += member + "\n";
        }
        
      }
      );
      tempRows.push((
        <tr> 
          <td> {datapoint.name} </td>
          <td style = {{whiteSpace: 'pre-wrap'}}> {members} </td>
          <td> {datapoint.version} </td>
        </tr>
      ))
    });

    setRows(tempRows);
  }, [ascending]);

  return (
    <div className="table-container">
      <table className="contract-table">
        <TableHeader setAscending={setAscending} />
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

// ContractsTable.propTypes = {
//   contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
// };

export default ContractsTable;
