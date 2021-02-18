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
import TablePagination from '@material-ui/core/TablePagination';
import './KeyTableNav.scss';

const KeyTableNav = ({ totalKeys, rowsPerPage, page, onChangePage }) => {
  return (
    <div className="table-nav">
      <div className="total-keys">{totalKeys} Keys</div>
      <div className="row-info">
        <div className="rows-label">Rows per page:</div>
        <div className="rows-per-page">{rowsPerPage}</div>
      </div>
      <TablePagination
          component="div"
          count={totalKeys}
          rowsPerPageOptions={[rowsPerPage]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
      />
    </div>
  );
};

KeyTableNav.propTypes = {
  totalKeys: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default KeyTableNav;
