/*****************************************************************************
 * Open MCT, Copyright (c) 2009-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define(
    [],
    function () {

        /**
         * Exposes costs associated with a subsystem mode.
         * @constructor
         */
        function ActivityValueCapability(domainObject) {
            var model = domainObject.getModel();

            return {
                /**
                 * Get a list of resource types which have associated
                 * costs for this object. Returned values are machine-readable
                 * keys, and should be paired with external metadata for
                 * presentation (see category of extension `resources`).
                 * @returns {string[]} resource types
                 */
                resources: function () {
                    return Object.keys(model.resources || {}).sort();
                },
                /**
                 * Get the cost associated with a resource of an identified
                 * type (typically, one of the types reported from a
                 * `resources` call.)
                 * @param {string} key the resource type
                 * @returns {number} the associated cost
                 */
                cost: function (key) {
                    return (model.resources || {})[key] || 0;
                },
                /**
                 * Get an object containing key-value pairs describing
                 * resource utilization as described by this object.
                 * Keys are resource types; values are levels of associated
                 * resource utilization.
                 * @returns {object} resource utilizations
                 */
                invoke: function () {
                    return model.resources || {};
                }
            };
        }

        // Only applies to subsystem modes.
        ActivityValueCapability.appliesTo = function (model) {
            return (model || {}).type === 'activity';
        };

        return ActivityValueCapability;
    }
);