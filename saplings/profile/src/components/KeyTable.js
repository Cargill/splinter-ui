import React from 'react';
import './KeyTable.scss';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import KeyTableNav from './KeyTableNav';

const KeyTable = ({ keys, activeKey, onAdd, onActivate, onEdit }) => {

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
                  onClick={e => {
                    e.preventDefault();
                    onActivate(key);
                  }}
                >
                <Icon>check_circle_icon</Icon>
                </button>}
                <button
                  className="key-action-btn"
                  onClick={e => {
                      e.preventDefault();
                      onEdit(key);
                    }}
                  >
                  <Icon>edit_icon</Icon>
                </button>
                <button className="key-action-btn">
                  <Icon>delete_icon</Icon>
                </button>
              </span>
            </button>
          </div>
        </td>
      </tr>
    )
  })
  if (keys.length < 10) {
    for (let i=0; i < 10-keys.length; i+=1) {
      emptyRows.push(<tr className="empty-row"><td colSpan="6" className="keys-empty" /></tr>)
    }
  }

  return (
    <section className="user-keys">
      <div className="table-actions">
        <KeyTableNav totalKeys={keys.length} />
        <button
          id="add-key"
          onClick={onAdd}>
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
          <tbody>{rows}{emptyRows}</tbody>
        </table>
      </div>
      <div className="table-actions">
        <KeyTableNav totalKeys={keys.length} />
      </div>
    </section>
  );
};

KeyTable.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeKey: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

KeyTable.defaultProps = {
  activeKey: null
};

export default KeyTable;
