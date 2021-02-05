import React from 'react';
import './KeyTable.scss';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

export function KeyTable() {
  return (
      <section className="user-keys">
        <div className='keys-header'>
          <h3 id="keys-label">Keys</h3>
        </div>
        <div className="table-actions">
          <div className="table-nav">
            <div className="total-keys">2 Keys</div>
            <div className="row-info">
              <div className="rows-label">Rows per page:</div>
              <div className="rows-per-page">10</div>
            </div>
            <div className="keys-currently-displayed">1-2 of 2</div>
            <div className="paging">
              <div className="page-nav"><Icon>keyboard_arrow_left_icon</Icon></div>
              <div className="page-nav"><Icon>keyboard_arrow_right_icon</Icon></div>
            </div>
          </div>
          <Link className="add-key" to="/profile/new-key">
            <div className="icon"><Icon>add_icon</Icon></div>
            New Key
          </Link>
        </div>
        <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Key Name</th>
              <th>Key</th>
              <th>Created</th>
              <th>Updated</th>
              <th id="status-header">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>My Key</td>
              <td>02be582336357225363b081b9954bf0b0d6539d1def72f09aeaedbda045b9z3c33</td>
              <td>02/01/2021</td>
              <td>02/02/2021</td>
              <td><div className="status-active">Active</div></td>
              <td><div className="button-wrapper">
                <button id="action-button">
                  <Icon>more_horiz_icon</Icon>
                  <span className="action-options active">
                    <Icon>edit_icon</Icon>
                    <Icon>delete_icon</Icon>
                  </span>
                </button>
              </div></td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>02be582336357225363b081b9954bf0b0d6539d1def72f09aeaedbda045b9z3c33</td>
              <td>02/01/2021</td>
              <td>02/02/2021</td>
              <td />
              <td><div className="button-wrapper">
                <button id="action-button">
                  <Icon>more_horiz_icon</Icon>
                  <span className="action-options">
                    <Icon>check_circle_icon</Icon>
                    <Icon>edit_icon</Icon>
                    <Icon>delete_icon</Icon>
                  </span>
                </button>
              </div></td>
            </tr>
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
            <tr className="empty-row" />
          </tbody>
        </table>
        </div>
        <div className="table-actions bottom">
          <div className="table-nav">
            <div className="total-keys">2 Keys</div>
            <div className="row-info">
              <div className="rows-label">Rows per page:</div>
              <div className="rows-per-page">10</div>
            </div>
            <div className="keys-currently-displayed">1-2 of 2</div>
            <div className="paging">
              <div className="page-nav"><Icon>keyboard_arrow_left_icon</Icon></div>
              <div className="page-nav"><Icon>keyboard_arrow_right_icon</Icon></div>
            </div>
          </div>
        </div>
      </section>
  );
}
