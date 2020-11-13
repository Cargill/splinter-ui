import React, { useEffect, useState } from 'react';
import { OverlayModal } from '../OverlayModal';
import { getNodes } from '../../api/splinter';

import { Button, ListBoxSelect, TextField } from './controls';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import './CreateNamespace.scss';

function NamespaceForm({
  setData,
  close
}) {
  const [allNodes, setAllNodes] = useState([]);
  const [name, setName] = useState('');
  const [owners, setOwners] = useState([]);
  const [ownerNames, setOwnerNames] = useState([]);
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [nameSet, setNameSet] = useState(false);
  const [ownersSet, setOwnersSet] = useState(false);

  useEffect(() => {
    const fetchNodes = async () => {
      const res = await getNodes();
      const nodeOptions = [];

      res['data'].forEach((node) => {
        nodeOptions.push({ value: node['keys'][0], content: node['display_name'] });
      });

      setAllNodes(nodeOptions);
    };
    fetchNodes();
  }, []);

  function onNameChange(event) {
    setName(event.target.value);
    setName(event.target.value);
    setNameSet(event.target.value !== '');
  }

  function handleOwners(event) {
    setOwners(event.target.value);
    setOwnerNames(event.target.label);
    setOwnersSet(event.target.value !== []);
  }

  function handleCancel() {
    close();
  }

  function handleSubmit() {
    setData({
      name: name,
      owners: owners,
      names: ownerNames,
      read: read,
      write: write
    });
    close();
  }

  return (
    <div className="create-namespace-form-wrapper">
      <div className="create-namespace-form-header">
        <div className="title">Create Namespace Registry</div>
        <div className="help-text">
          Create a new namespace registry
        </div>
      </div>
      <div>
        <TextField name='Namespace Registry Name' label='Namespace Registry Name' value={name}
          onChange={onNameChange} />
        <span style={{marginTop: '5px'}} />
        <ListBoxSelect label='Select Owners of the Namespace' name='Select Owners of the Namespace' 
          onChange={handleOwners} options={allNodes} isMulti={true} />
        <span className='label' style={{marginLeft: '16px', marginTop: '5px'}}>Set Permissions for the Namespace</span>
        <div style={{flexDirection: 'row', marginTop: '10px' }}>
          <Checkbox onChange={(event) => { setRead(event.target.checked); }} defaultChecked={false}
            style={{margin: '0 15px'}} /> Read
          <Checkbox onChange={(event) => { setWrite(event.target.checked); }} defaultChecked={false}
            style={{margin: '0 0 0 15px'}} /> Write
        </div>
      </div>
      <div className="namespace-form-footer">
        <div className="namespace-btn-wrapper">
          <button
            type="button"
            className="form-button form-btn cancel"
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="button"
            disabled={!nameSet || !ownersSet}
            className="form-button form-btn submit"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function NewlineText({ text }) {

}

function NamespaceTable({ registries }) {
  let rows = null;

  registries.forEach((registry) => {
    if (rows === null) {
      rows = [];
    }

    let permissionText = '';
    if (registry.read) {
      permissionText += 'Read\n';
    }

    if (registry.write) {
      permissionText += 'Write\n';
    }

    if (permissionText === '') {
      permissionText = 'No permissions selected.';
    } else {
      permissionText = permissionText.slice(0,-1);
    }

    let owners = '';
    registry.names.forEach((owner) => {
      owners += owner + '\n';
    });

    if (owners === '') {
      owners = 'No owners selected.'
    } else {
      owners = owners.slice(0,-1);
    }

    rows.push((
      <tr>
        <td>{registry.name}</td>
        <td style={{whiteSpace: 'pre-wrap'}}>{owners}</td>
        <td style={{whiteSpace: 'pre-wrap'}}>{permissionText}</td>
      </tr>
    ));
  });

  return (
    <div className='ns-table-container'>
      <table className='ns-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owners</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function CreateNamespace({
  registries,
  setRegistries
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      if (registries === []) {
        setRegistries([data]);
      } else {
        setRegistries([...registries, data]);
      }
    }
  }, [data]);

  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <Button className='form-button form-btn create-btn' label='Create New Namespace Registry'
        onClick={() => {setModalActive(true);}}>
        Create New Namespace Registry
      </Button>
      <NamespaceTable registries={registries} />
      <OverlayModal open={modalActive}>
        <NamespaceForm close={() => setModalActive(false)} setData={setData} />
      </OverlayModal>
    </div>
  );
}