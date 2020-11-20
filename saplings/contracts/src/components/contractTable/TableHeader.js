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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeader = ({ setAscending }) => {
  const [sortedBy, setSortedBy] = useState({
    ascendingOrder: false,
    field: ''
  });

  const sortContractsBy = (sortBy, order) => {
    setSortedBy({ ascendingOrder: order, field: sortBy });
  };

  useEffect(() => {
    setAscending(sortedBy.ascendingOrder);
  }, [sortedBy]);

  const caretDown = (
    <span className="caret">
      <FontAwesomeIcon icon="caret-down" />
    </span>
  );

  const caretUp = (
    <span className="caret">
      <FontAwesomeIcon icon="caret-up" />
    </span>
  );

  const sortableSymbol = (
    <span className="caret">
      <FontAwesomeIcon icon="sort" />
    </span>
  );

  const sortSymbol = fieldType => {
    if (sortedBy.field !== fieldType) {
      return sortableSymbol;
    }
    if (sortedBy.ascendingOrder) {
      return caretUp;
    }
    return caretDown;
  };

  return (
    <thead>
      <tr className="table-header">
        <th
          onClick={() =>
            sortContractsBy('contractname', !sortedBy.ascendingOrder)
          }
        >
          Contract Name
          {sortSymbol('contractname')}
        </th>
        <th>Members</th>
        <th>Version</th>
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  setAscending: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    .isRequired
};

export default TableHeader;
