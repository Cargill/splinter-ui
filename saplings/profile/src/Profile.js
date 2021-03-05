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

import React, { useEffect, useState } from 'react';
import './Profile.scss';
import proptypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import {
  decryptKey,
  getKeys,
  getSharedConfig,
  getUser,
  setKeys as setSigningKeys
} from 'splinter-saplingjs';
import KeyTable from './components/KeyTable';
import { ChangePasswordForm } from './forms/ChangePasswordForm';
import { AddKeyForm } from './forms/AddKeyForm';
import { UpdateKeyForm } from './forms/UpdateKeyForm';
import { EnterPasswordForm } from './forms/EnterPasswordForm';
import { OverlayModal } from './OverlayModal';
import { http } from './http';

export function Profile() {
  const [modalActive, setModalActive] = useState(false);
  const [form, setForm] = useState({
    formName: '',
    params: {}
  });
  const [keys, setKeys] = useState([]);
  const [stateKeys, setStateKeys] = useState(getKeys);
  const user = getUser();

  useEffect(() => {
    async function fetchUserKeys() {
      if (user) {
        try {
          const { splinterURL } = getSharedConfig().canopyConfig;
          const userKeys = await http(
            'GET',
            `${splinterURL}/biome/keys`,
            {},
            request => {
              request.setRequestHeader('Authorization', `Bearer ${user.token}`);
            }
          );
          setKeys(JSON.parse(userKeys).data);
        } catch (err) {
          switch (err.status) {
            case 401:
              window.location.href = `${window.location.origin}/login`;
              break;
            default:
              break;
          }
        }
      } else {
        window.location.href = `${window.location.origin}/login`;
      }
    }
    fetchUserKeys();
  }, [user]);

  const openModalForm = (formName, params) => {
    const name = formName || '';
    const adata = { ...params } || {};
    setForm({
      formName: name,
      params: adata
    });
    setModalActive(true);
  };

  const sortKeysActive = (allKeys, publicKey) => {
    const keyIndex = allKeys.findIndex(key => key.public_key === publicKey);
    const activeKey = allKeys[keyIndex];
    allKeys.splice(keyIndex, 1);
    setKeys([activeKey,...allKeys]);
  };

  sortKeysActive.propTypes = {
    allKeys: proptypes.arrayOf(proptypes.object).isRequired,
    publicKey: proptypes.string.isRequired,
  };

  const updateKeyCallback = async () => {
    let allKeys = [];
    setModalActive(false);
    try {
      const { splinterURL } = getSharedConfig().canopyConfig;
      const userKeys = await http(
        'GET',
        `${splinterURL}/biome/keys`,
        {},
        request => {
          request.setRequestHeader('Authorization', `Bearer ${user.token}`);
        }
      );
      allKeys = JSON.parse(userKeys).data;
      if (stateKeys) {
        sortKeysActive(allKeys, stateKeys.publicKey);
      } else {
        setKeys(allKeys);
      }
    } catch (err) {
      switch (err.status) {
        case 401:
          window.location.href = `${window.location.origin}/login`;
          break;
        default:
          break;
      }
    }
  };

  const formView = ({ formName, params }) => {
    switch (formName) {
      case 'add-key':
        return <AddKeyForm successFn={params.successFn} />;
      case 'update-key':
        return (
          <UpdateKeyForm userKey={params.key} closeFn={updateKeyCallback} />
        );
      case 'update-password':
        return <ChangePasswordForm keys={keys} />;
      case 'enter-password':
        return (
          <EnterPasswordForm
            callbackFn={params.callbackFn}
            errorMessage={params.errorMessage}
          />
        );
      default:
        return null;
    }
  };

  formView.propTypes = {
    formName: proptypes.string,
    params: proptypes.object
  };

  formView.defaultProps = {
    formName: '',
    params: undefined
  };

  const activateKey = key => {
    const { public_key, encrypted_private_key } = key;
    const keySecret = sessionStorage.getItem('KEY_SECRET');
    if (keySecret) {
      try {
        const privateKey = decryptKey(encrypted_private_key, keySecret);
        setStateKeys({
          publicKey: public_key,
          privateKey
        });
        setSigningKeys({
          publicKey: public_key,
          privateKey
        });
        sortKeysActive(keys, public_key);
        setModalActive(false);
      } catch (err) {
        openModalForm('enter-password', {
          callbackFn: () => activateKey(key),
          errorMessage: `Unable to decrypt key. Error: ${err.message}`
        });
        throw new Error(err.message);
      }
    } else {
      openModalForm('enter-password', { callbackFn: () => activateKey(key) });
    }
  };

  const addKeyCallback = key => {
    setKeys([...keys, key]);
    setModalActive(false);
  };

  return (
    <div id="profile">
      <section className="profile-info">
        <div className="profile-photo">
          <div className="icon">
            <Icon>person_icon</Icon>
          </div>
        </div>
        <div className="user-details">
          <div className="name">{user && user.displayName}</div>
          <div className="email">email@email.com</div>
        </div>
      </section>
      <section id="user-key-table">
        <div className='keys-header'>
          <h3 id="keys-label">Keys</h3>
        </div>
        <KeyTable
          keys={keys}
          activeKey={stateKeys && stateKeys.publicKey}
          rowsPerPage='10'
          onAdd={() => openModalForm('add-key', {
            successFn: value => addKeyCallback(value)
          })}
          onActivate={key => activateKey(key)}
          onEdit={key => openModalForm('update-key', { key })}
        />
      </section>
      <OverlayModal open={modalActive} closeFn={() => setModalActive(false)}>
        {formView(form)}
      </OverlayModal>
    </div>
  );
}
