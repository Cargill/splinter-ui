import React from 'react';

import { MultiStepForm, Step } from 'App/components/forms/MultiStepForm';

import './index.scss';

export function UploadContractForm() {
  return (
    <MultiStepForm
      formName="Upload Contract"
      handleSubmit={() => { console.log('Next step'); }}
      handleCancel={() => { console.log('Cancel') }}>
      <Step step={1} label="Select circuit">
        <div className="step-header">
          <div className="step-title">Select Circuit</div>
          <div className="help-text">
            Select the circuit to deploy the smart contract to.
          </div>
        </div>
      </Step>
      <Step step={2} label="Upload contract">
        <div className="step-header">
          <div className="step-title">Upload Contract</div>
          <div className="help-text">
            Upload the packaged smart contract in the form of a .scar file.
          </div>
        </div>
      </Step>
      <Step step={3} label="Create Namespace Registry">
        <div className="step-header">
          <div className="step-title">Create Namespace Registry</div>
          <div className="help-text">
            Create the namespace registry for the uploaded contract.
          </div>
        </div>
      </Step>
      <Step step={4} label="Set contract permissions">
        <div className="step-header">
          <div className="step-title">Set Contract Permissions</div>
          <div className="help-text">
            Set the relevant permissions for the contract.
          </div>
        </div>
      </Step>
    </MultiStepForm>
  );
}
