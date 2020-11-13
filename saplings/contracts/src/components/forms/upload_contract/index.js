import React, { useState } from 'react';

import { MultiStepForm, Step } from '../MultiStepForm';
import { createCallPayload } from '../../../api/splinter';
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
      cr_name
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
        <CreateNamespace registries={registries} setRegistries={setRegistries} />
      </Step>
    </MultiStepForm>
  );
}
