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
import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Profile } from './Profile';
import { NewKey } from './components/NewKey';
import SaplingHeader from './components/SaplingHeader';

function App() {
  const [keys, setKeys] = useState([]);
  return (
    <div className="profile-app">
      <Router>
        <Switch>
          <Route exact path="/profile">
            <SaplingHeader saplingName="Profile" />
            <Profile keys={keys} setKeys={setKeys} />
          </Route>
          <Route path="/profile/new-key">
            <SaplingHeader saplingName="Profile" />
            <NewKey keys={keys} setKeys={setKeys} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
