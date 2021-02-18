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
import './KeyTable.scss';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import KeyTableNav from './KeyTableNav';

const KeyTable = ({ keys, activeKey, rowsPerPage, onAdd, onActivate, onEdit }) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = [];
  const rows = keys.map(key => {
    const isActive = activeKey === key.public_key;
    return (
      <tr key={key.public_key}>
        <td>
          <div>{key.display_name}</div>
        </td>
        <td>
          <div>{key.public_key}</div>
        </td>
        <td />
        <td />
        <td>{isActive && <div className="status-active">Active</div>}</td>
        <td>
          <div className="button-wrapper">
            <button id="action-button">
              <Icon>more_horiz_icon</Icon>
              <span className={`action-options ${isActive ? 'active' : ''}`}>
              {!isActive &&
                <button
                  className="key-action-btn"
                  title="Activate key"
                  onClick={e => {
                    e.preventDefault();
                    onActivate(key);
                  }}
                >
                <Icon>check_circle_icon</Icon>
                </button>}
                <button
                  className="key-action-btn"
                  title="Edit key name"
                  onClick={e => {
                      e.preventDefault();
                      onEdit(key);
                    }}
                  >
                  <Icon>edit_icon</Icon>
                </button>
                <button
                  className="key-action-btn"
                  title="Delete key">
                  <Icon>delete_icon</Icon>
                </button>
              </span>
            </button>
          </div>
        </td>
      </tr>
    )
  })

  const numberEmptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  for (let i=0; i < numberEmptyRows; i+=1) {
    emptyRows.push(<tr className="empty-row"><td colSpan="6" className="keys-empty" /></tr>)
  }

  const start = page * rowsPerPage;
  const end = parseFloat(page * rowsPerPage)+parseFloat(rowsPerPage);

  return (
    <section className="user-keys">
      <div className="table-actions">
        <KeyTableNav
          totalKeys={keys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
        <button
          id="add-key"
          onClick={onAdd}
          title="Click to add new key">
          <div className="icon"><Icon>add_icon</Icon></div>
          New Key
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th id="key-name-col">Key Name</th>
              <th id="key-col">Key</th>
              <th id="created-col">Created</th>
              <th id="updated-col">Updated</th>
              <th id="status-col">Status</th>
              <th id="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(start,end)}
            {numberEmptyRows > 0 && emptyRows}
          </tbody>
        </table>
      </div>
      <div className="table-actions">
      <KeyTableNav
        totalKeys={keys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        position='bottom'
      />
      </div>
    </section>
  );
};

KeyTable.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeKey: PropTypes.string,
  rowsPerPage: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

KeyTable.defaultProps = {
  activeKey: null,
  rowsPerPage: 10
};

export default KeyTable;
