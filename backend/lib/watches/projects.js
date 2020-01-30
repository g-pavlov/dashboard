//
// Copyright (c) 2019 by SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the LICENSE file
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict'

const { getProjectsCache } = require('../cache')
const { get, set, unset, remove } = require('lodash')
const {
  dashboardClient // privileged client for the garden cluster
} = require('../kubernetes-client')
const { registerHandler } = require('./common')

module.exports = io => {
  const emitter = dashboardClient['core.gardener.cloud'].projects.watchList()
  cacheResource(emitter, getProjectsCache(), 'metadata.name')
}

function cacheResource (resourceEmitter, cache, keyPath) {
  resourceEmitter.on('connect', () => {
    remove(cache, () => true)
  })
  registerHandler(resourceEmitter, event => {
    const key = get(event.object, keyPath)
    if (event.type === 'ADDED' || event.type === 'MODIFIED') {
      set(cache, key, event.object)
    } else if (event.type === 'DELETED') {
      unset(cache, key)
    }
  })
}
