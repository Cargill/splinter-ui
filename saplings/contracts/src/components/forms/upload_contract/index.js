import React, { useState, useEffect } from 'react';

import { useLocalNodeState } from '../../../state/localNode';
import { MultiStepForm, Step } from '../MultiStepForm';
import { Circuit } from '../../../data/circuits';
import { createCallPayload, getCircuit, getNodes } from '../../../api/splinter';
import { SelectCircuit } from '../SelectCircuit';
import { UploadFile } from '../UploadFile';
import { CreateNamespace } from '../CreateNamespace';
import { useHistory } from 'react-router-dom';

import 'rc-checkbox/assets/index.css';
import './index.scss';

export function UploadContractForm() {
  const history = useHistory();
  const [selectedCircuit, setSelectedCircuit] = useState('');
  const [buffer, setBuffer] = useState(null);
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [inputs, setInputs] = useState('');
  const [outputs, setOutputs] = useState('');
  const [registries, setRegistries] = useState([]);
  const [contractRegistryName, setContractRegistryName] = useState('');
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [serviceID, setServiceID] = useState('');
  const localNodeID = useLocalNodeState();

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const apiCircuit = await getCircuit(selectedCircuit);
        const circuit = new Circuit(apiCircuit);

        const localNodeRoster = circuit['roster'].find(node => node['allowedNodes'][0] === localNodeID);
        setServiceID(localNodeRoster['serviceId']);

        const apiNodes = await getNodes();
        const apiFilteredNodes = apiNodes['data'].filter(
          node => !!circuit.members.find(id => id === node.identity)
        );
        setFilteredNodes(apiFilteredNodes);
      } catch (e) {
        throw Error(`Unable to fetch nodes from the node registry: ${e}`);
      }
    };

    if (selectedCircuit) {
      fetchNodes();
    }
  }, [selectedCircuit]);

  function handleCircuitSelection(circuit) {
    setSelectedCircuit(circuit);
  }

  function handleBufferChange(newBuffer) {
    setBuffer(newBuffer);
  }

  function handleManifestData(data) {
    setName(data['name']);
    setVersion(data['version']);
    setInputs(data['inputs']);
    setOutputs(data['outputs']);
  }

  function makeBatchCall() {
    history.push(`/contracts`);

    let crName = contractRegistryName;
    if (contractRegistryName === '') {
      crName = name;
    }

    let ownerKeys = []
    filteredNodes.forEach((node) => {
      ownerKeys.push(node['keys'][0])
    });

    createCallPayload(
      selectedCircuit,
      buffer,
      name,
      version,
      inputs,
      outputs,
      registries,
      crName,
      ownerKeys,
      serviceID
    );
  }

  function validateCircuit() {
    if (selectedCircuit === '') {
      return false;
    }
    return true;
  }

  function validateUploads() {
    if (!buffer) {
      return false;
    }

    if (name === '') {
      return false;
    }

    return true;
  }

  function validateNamespaces() {
    if (registries === []) {
      return false;
    }

    return true;
  }

  const stepValidationFn = (stepNumber) => {
    switch(stepNumber) {
      case 1:
        return validateCircuit();
      case 2:
        return validateUploads();
      case 3:
        return validateNamespaces();
      default:
        return true;
    }
  }

  return (
    <MultiStepForm
      formName="Upload Contract"
      handleSubmit={makeBatchCall}
      handleCancel={() => history.push(`/contracts`)}
      isStepValidFn={stepNumber => stepValidationFn(stepNumber)} >
      <Step step={1} label="Select Circuit">
        <div className="step-header">
          <div className="step-title">Select Circuit</div>
          <div className="help-text">
            Select the circuit to deploy the smart contract to.
          </div>
        </div>
        <SelectCircuit handleCircuitSelection={handleCircuitSelection} />
      </Step>
      <Step step={2} label="Upload contract">
        <div className="step-header">
          <div className="step-title">Upload Contract</div>
          <div className="help-text">
            Upload the packaged smart contract in the form of a .scar file.
          </div>
        </div>
        <UploadFile handleBufferChange={handleBufferChange}
          handleContractRegistryChange={setContractRegistryName} 
          handleManifestData={handleManifestData} />
      </Step>
      <Step step={3} label="Create Namespace Registry">
        <div className="step-header">
          <div className="step-title">Create Namespace Registry</div>
          <div className="help-text">
            Create the namespace registry for the uploaded contract.
          </div>
        </div>
        <CreateNamespace registries={registries} setRegistries={setRegistries} filteredNodes={filteredNodes} />
      </Step>
    </MultiStepForm>
  );
}
