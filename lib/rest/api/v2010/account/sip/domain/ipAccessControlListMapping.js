'use strict';

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../../../base/values');  /* jshint ignore:line */

var IpAccessControlListMappingList;
var IpAccessControlListMappingPage;
var IpAccessControlListMappingInstance;
var IpAccessControlListMappingContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
 * @description Initialize the IpAccessControlListMappingList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The account_sid
 * @param {string} domainSid - A string that uniquely identifies the SIP Domain
 */
/* jshint ignore:end */
IpAccessControlListMappingList = function
    IpAccessControlListMappingList(version, accountSid, domainSid) {
  /* jshint ignore:start */
  /**
   * @function ipAccessControlListMappings
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingContext}
   */
  /* jshint ignore:end */
  function IpAccessControlListMappingListInstance(sid) {
    return IpAccessControlListMappingListInstance.get(sid);
  }

  IpAccessControlListMappingListInstance._version = version;
  // Path Solution
  IpAccessControlListMappingListInstance._solution = {
    accountSid: accountSid,
    domainSid: domainSid
  };
  IpAccessControlListMappingListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/SIP/Domains/<%= domainSid %>/IpAccessControlListMappings.json' // jshint ignore:line
  )(IpAccessControlListMappingListInstance._solution);
  /* jshint ignore:start */
  /**
   * create a IpAccessControlListMappingInstance
   *
   * @function create
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {object} opts - ...
   * @param {string} opts.ipAccessControlListSid - The ip_access_control_list_sid
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed IpAccessControlListMappingInstance
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.create = function create(opts, callback)
      {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.ipAccessControlListSid)) {
      throw new Error('Required parameter "opts.ipAccessControlListSid" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'IpAccessControlListSid': _.get(opts, 'ipAccessControlListSid')
    });

    var promise = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new IpAccessControlListMappingInstance(
        this._version,
        payload,
        this._solution.accountSid,
        this._solution.domainSid,
        this._solution.sid
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

  /* jshint ignore:start */
  /**
   * Streams IpAccessControlListMappingInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * @description Lists IpAccessControlListMappingInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of IpAccessControlListMappingInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.page = function page(opts, callback) {
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new IpAccessControlListMappingPage(
        this._version,
        payload,
        this._solution
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

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of IpAccessControlListMappingInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function getPage
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.getPage = function getPage(targetUrl,
      callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({
      method: 'GET',
      uri: targetUrl
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new IpAccessControlListMappingPage(
        this._version,
        payload,
        this._solution
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

  /* jshint ignore:start */
  /**
   * Constructs a ip_access_control_list_mapping
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingList
   * @instance
   *
   * @param {string} sid - The sid
   *
   * @returns {Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingContext}
   */
  /* jshint ignore:end */
  IpAccessControlListMappingListInstance.get = function get(sid) {
    return new IpAccessControlListMappingContext(
      this._version,
      this._solution.accountSid,
      this._solution.domainSid,
      sid
    );
  };

  return IpAccessControlListMappingListInstance;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingPage
 * @augments Page
 * @description Initialize the IpAccessControlListMappingPage
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns IpAccessControlListMappingPage
 */
/* jshint ignore:end */
IpAccessControlListMappingPage = function
    IpAccessControlListMappingPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(IpAccessControlListMappingPage.prototype, Page.prototype);
IpAccessControlListMappingPage.prototype.constructor = IpAccessControlListMappingPage;

/* jshint ignore:start */
/**
 * Build an instance of IpAccessControlListMappingInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns IpAccessControlListMappingInstance
 */
/* jshint ignore:end */
IpAccessControlListMappingPage.prototype.getInstance = function
    getInstance(payload) {
  return new IpAccessControlListMappingInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.domainSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingInstance
 * @description Initialize the IpAccessControlListMappingContext
 *
 * @property {string} accountSid - The account_sid
 * @property {Date} dateCreated - The date_created
 * @property {Date} dateUpdated - The date_updated
 * @property {string} friendlyName - The friendly_name
 * @property {string} sid - The sid
 * @property {string} uri - The uri
 * @property {string} subresourceUris - The subresource_uris
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} domainSid - The domain_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
IpAccessControlListMappingInstance = function
    IpAccessControlListMappingInstance(version, payload, accountSid, domainSid,
    sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.uri = payload.uri; // jshint ignore:line
  this.subresourceUris = payload.subresource_uris; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    domainSid: domainSid,
    sid: sid || this.sid,
  };
};

Object.defineProperty(IpAccessControlListMappingInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new IpAccessControlListMappingContext(
        this._version,
        this._solution.accountSid,
        this._solution.domainSid,
        this._solution.sid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a IpAccessControlListMappingInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed IpAccessControlListMappingInstance
 */
/* jshint ignore:end */
IpAccessControlListMappingInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a IpAccessControlListMappingInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed IpAccessControlListMappingInstance
 */
/* jshint ignore:end */
IpAccessControlListMappingInstance.prototype.remove = function remove(callback)
    {
  return this._proxy.remove(callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingContext
 * @description Initialize the IpAccessControlListMappingContext
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} domainSid - The domain_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
IpAccessControlListMappingContext = function
    IpAccessControlListMappingContext(version, accountSid, domainSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    domainSid: domainSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/SIP/Domains/<%= domainSid %>/IpAccessControlListMappings/<%= sid %>.json' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a IpAccessControlListMappingInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed IpAccessControlListMappingInstance
 */
/* jshint ignore:end */
IpAccessControlListMappingContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new IpAccessControlListMappingInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.domainSid,
      this._solution.sid
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

/* jshint ignore:start */
/**
 * remove a IpAccessControlListMappingInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.SipContext.DomainContext.IpAccessControlListMappingContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed IpAccessControlListMappingInstance
 */
/* jshint ignore:end */
IpAccessControlListMappingContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
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
  IpAccessControlListMappingList: IpAccessControlListMappingList,
  IpAccessControlListMappingPage: IpAccessControlListMappingPage,
  IpAccessControlListMappingInstance: IpAccessControlListMappingInstance,
  IpAccessControlListMappingContext: IpAccessControlListMappingContext
};
