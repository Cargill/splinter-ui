import React, { useState, useEffect } from 'react';

import { useLocalNodeState } from '../../../state/localNode';
import { useNodeRegistryState } from '../../../state/nodeRegistry';
import { useCircuitState } from '../../../state/circuits';
import { MultiStepForm, Step } from '../MultiStepForm';
import { createCallPayload, getNodeRegistry } from '../../../api/splinter';
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
  const [localNode, setLocalNode] = useState(null);
  const localNodeID = useLocalNodeState();

  useEffect(() => {
    const fetchNodes = async (circuitData) => {
      try {
        const apiNodes = await getNodeRegistry();

        const currNode = apiNodes.find(node => node.identity === localNodeID);
        setLocalNode(currNode);

        const apiFilteredNodes = apiNodes.filter(
          node => !!circuitData.members.find(id => id === node.identity)
        );
        setFilteredNodes(apiFilteredNodes);
      } catch (e) {
        throw Error(`Unable to fetch nodes from the node registry: ${e}`);
      }
    };

    if (selectedCircuit) {
      const [circuit] = useCircuitState(selectedCircuit);
      fetchNodes(circuit);
    }
  }, [selectedCircuit]);

  console.log('local node');
  console.log(localNode);

  console.log('filtered nodes');
  console.log(filteredNodes);

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

    let cr_name = contractRegistryName;
    if (contractRegistryName === '') {
      cr_name = name;
    }

    createCallPayload(
      selectedCircuit,
      buffer,
      name,
      version,
      inputs,
      outputs,
      registries,
      cr_name,
      filteredNodes
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
      handleCancel={() => history.push(`/contracts`)} >
      {/* // isStepValidFn={stepNumber => stepValidationFn(stepNumber)} > */}
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
