'use strict';

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var serialize = require(
    '../../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var WorkflowStatisticsList;
var WorkflowStatisticsPage;
var WorkflowStatisticsInstance;
var WorkflowStatisticsContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsList
 * @description Initialize the WorkflowStatisticsList
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {string} workspaceSid - The workspace_sid
 * @param {string} workflowSid - The workflow_sid
 */
/* jshint ignore:end */
WorkflowStatisticsList = function WorkflowStatisticsList(version, workspaceSid,
                                                          workflowSid) {
  /* jshint ignore:start */
  /**
   * @function statistics
   * @memberof Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsContext}
   */
  /* jshint ignore:end */
  function WorkflowStatisticsListInstance(sid) {
    return WorkflowStatisticsListInstance.get(sid);
  }

  WorkflowStatisticsListInstance._version = version;
  // Path Solution
  WorkflowStatisticsListInstance._solution = {
    workspaceSid: workspaceSid,
    workflowSid: workflowSid
  };
  /* jshint ignore:start */
  /**
   * Constructs a workflow_statistics
   *
   * @function get
   * @memberof Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsList
   * @instance
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsContext}
   */
  /* jshint ignore:end */
  WorkflowStatisticsListInstance.get = function get() {
    return new WorkflowStatisticsContext(
      this._version,
      this._solution.workspaceSid,
      this._solution.workflowSid
    );
  };

  return WorkflowStatisticsListInstance;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsPage
 * @augments Page
 * @description Initialize the WorkflowStatisticsPage
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns WorkflowStatisticsPage
 */
/* jshint ignore:end */
WorkflowStatisticsPage = function WorkflowStatisticsPage(version, response,
                                                          solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(WorkflowStatisticsPage.prototype, Page.prototype);
WorkflowStatisticsPage.prototype.constructor = WorkflowStatisticsPage;

/* jshint ignore:start */
/**
 * Build an instance of WorkflowStatisticsInstance
 *
 * @function getInstance
 * @memberof Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns WorkflowStatisticsInstance
 */
/* jshint ignore:end */
WorkflowStatisticsPage.prototype.getInstance = function getInstance(payload) {
  return new WorkflowStatisticsInstance(
    this._version,
    payload,
    this._solution.workspaceSid,
    this._solution.workflowSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsInstance
 * @description Initialize the WorkflowStatisticsContext
 *
 * @property {string} accountSid - The account_sid
 * @property {string} cumulative - The cumulative
 * @property {string} realtime - The realtime
 * @property {string} workflowSid - The workflow_sid
 * @property {string} workspaceSid - The workspace_sid
 * @property {string} url - The url
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} workspaceSid - The workspace_sid
 * @param {sid} workflowSid - The workflow_sid
 */
/* jshint ignore:end */
WorkflowStatisticsInstance = function WorkflowStatisticsInstance(version,
    payload, workspaceSid, workflowSid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.cumulative = payload.cumulative; // jshint ignore:line
  this.realtime = payload.realtime; // jshint ignore:line
  this.workflowSid = payload.workflow_sid; // jshint ignore:line
  this.workspaceSid = payload.workspace_sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    workspaceSid: workspaceSid,
    workflowSid: workflowSid,
  };
};

Object.defineProperty(WorkflowStatisticsInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new WorkflowStatisticsContext(
        this._version,
        this._solution.workspaceSid,
        this._solution.workflowSid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a WorkflowStatisticsInstance
 *
 * @function fetch
 * @memberof Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsInstance
 * @instance
 *
 * @param {object|function} opts - ...
 * @param {number} [opts.minutes] - The minutes
 * @param {Date} [opts.startDate] - The start_date
 * @param {Date} [opts.endDate] - The end_date
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowStatisticsInstance
 */
/* jshint ignore:end */
WorkflowStatisticsInstance.prototype.fetch = function fetch(opts, callback) {
  return this._proxy.fetch(opts, callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsContext
 * @description Initialize the WorkflowStatisticsContext
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {sid} workspaceSid - The workspace_sid
 * @param {sid} workflowSid - The workflow_sid
 */
/* jshint ignore:end */
WorkflowStatisticsContext = function WorkflowStatisticsContext(version,
    workspaceSid, workflowSid) {
  this._version = version;

  // Path Solution
  this._solution = {
    workspaceSid: workspaceSid,
    workflowSid: workflowSid,
  };
  this._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Workflows/<%= workflowSid %>/Statistics' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a WorkflowStatisticsInstance
 *
 * @function fetch
 * @memberof Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsContext
 * @instance
 *
 * @param {object|function} opts - ...
 * @param {number} [opts.minutes] - The minutes
 * @param {Date} [opts.startDate] - The start_date
 * @param {Date} [opts.endDate] - The end_date
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowStatisticsInstance
 */
/* jshint ignore:end */
WorkflowStatisticsContext.prototype.fetch = function fetch(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Minutes': _.get(opts, 'minutes'),
    'StartDate': serialize.iso8601DateTime(_.get(opts, 'startDate')),
    'EndDate': serialize.iso8601DateTime(_.get(opts, 'endDate'))
  });

  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET',
    params: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkflowStatisticsInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
      this._solution.workflowSid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  WorkflowStatisticsList: WorkflowStatisticsList,
  WorkflowStatisticsPage: WorkflowStatisticsPage,
  WorkflowStatisticsInstance: WorkflowStatisticsInstance,
  WorkflowStatisticsContext: WorkflowStatisticsContext
};
