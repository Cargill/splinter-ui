import React, { useState } from 'react';
import yaml from 'js-yaml';

import { FileSelect, TextField } from './controls';

// use server to extract tar (?)
// https://stackoverflow.com/questions/59169497/un-tar-and-un-gzip-file-stored-as-javascript-buffer
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

export function UploadFile({ 
  handleBufferChange,
  handleContractRegistryChange,
  handleManifestData
}) {
  // TODO: Use names to mark successful file uploads
  const [selectedWasmName, setSelectedWasmName] = useState("");
  const [selectedManifestName, setSelectedManifestName] = useState(""); 
  const [contractRegistryName, setContractRegistryName] = useState("");

  function onWasmFileChange(event) {
    if (event.target.files[0]) {
      setSelectedWasmName(event.target.files[0].name);

      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      
      reader.onload = () => {
        if (reader.result) {
          handleBufferChange(new Uint8Array(reader.result));
        }
      }
    }
  }

  function parseYaml(text) {
    const res = yaml.load(text);
    handleManifestData(res);
  }

  function onManifestFileChange(event) {
    if (event.target.files[0]) {
      setSelectedManifestName(event.target.files[0].name);

      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);

      reader.onload = () => {
        if (reader.result) {
          parseYaml(reader.result);
        }
      }
    }
  }

  function onContractRegistryNameChange(event) {
    setContractRegistryName(event.target.value);
    handleContractRegistryChange(event.target.value);
  }

  return (
    <div>
      <FileSelect name='Upload Contract WASM' label='Upload Contract WASM'
       onChange={onWasmFileChange} />
      <span style={{marginTop: '5px'}} />
      <FileSelect name='Upload Contract Manifest' label='Upload Contract Manifest'
        onChange={onManifestFileChange} />
      <span style={{marginTop: '5px'}} />
      <TextField name='Contract Registry Name' label='Contract Registry Name (Optional)' value={contractRegistryName}
        onChange={onContractRegistryNameChange} />
    </div>
  );
}
