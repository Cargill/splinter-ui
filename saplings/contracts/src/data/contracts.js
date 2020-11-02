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

function Circuit(data) {
    if (!(this instanceof Contract)) {
      return new Circuit(data);
    }
    if (data.proposal_type) {
      this.id = data.circuit_id;
      this.status = 'Pending';
      this.members = data.circuit.members.map(member => {
        return member.node_id;
      });
      this.roster = data.circuit.roster.map(s => new Service(s));
      this.managementType = data.circuit.management_type;
      this.applicationMetadata = metadataFromJson(
        data.circuit.application_metadata
      );
      this.encodedApplicationData = data.circuit.application_metadata;
      this.comments = data.circuit.comments;
      this.proposal = {
        votes: data.votes,
        requester: data.requester,
        requesterNodeID: data.requester_node_id,
        proposalType: data.proposal_type,
        circuitHash: data.circuit_hash
      };
    } else {
      this.id = data.id;
      this.status = 'Active';
      this.members = data.members;
      this.roster = data.roster.map(s => new Service(s));
      this.managementType = data.management_type;
      this.applicationMetadata = metadataFromJson(data.application_metadata);
      this.encodedApplicationData = data.application_metadata;
      this.comments = 'N/A';
      this.proposal = {
        votes: [],
        requester: '',
        requesterNodeID: '',
        proposalType: '',
        circuitHash: ''
      };
    }
  }