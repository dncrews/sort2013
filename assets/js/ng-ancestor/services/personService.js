ancestorApp.factory('personService', ['$http', function($http) {
	function makeParams(newParams) {
		var params = {
			locale: FS.simpleLocale(),
			'_': +new Date,
			tz: new Date().getTimezoneOffset()
		};

		if(newParams) {
			for(var p in newParams) {
				params[p] = newParams[p];
			}
		}

		return params;
	}

	function handleResponse(promise, cb) {
		promise.success(function(data) {
			if(data.status === 'OK' || data.statusMessage === 'OK' || data.status === undefined) {
				cb(null, data.data || data);
			} else {
				cb(data.status || data.statusMessage);
			}
		}).error(function(data, status) {
			cb((data && (data.status || data.statusMessage)) || status);
		});
	}

	return {
		getPerson: function(id, cb) {
			var promise = $http.get('/tree-data/person/' + id + '/all', {
				params: makeParams()
			});

			handleResponse(promise, function(err, person) {
				var lastConclusionType, item;

				if(person) {
					// Hide the same tiles on other conclusions
					for(var i = 0; i < person.otherConclusions.length; i++) {
						item = person.otherConclusions[i];

						item.hideTitle = item.type === lastConclusionType;
						lastConclusionType = item.type;
					}
				}

				cb(err, person);
			});
		},

		getFamilyMembers: function(id, cb) {
			var promise = $http.get('/tree-data/family-members/person/' + id, {
				params: makeParams()
			});

			handleResponse(promise, function(err, families) {
				for(var i = 0; i < families.parents.length; i++) {
					families.parents[i].showChildren = families.parents[i].current;
				}
				for(var i = 0; i < families.spouses.length; i++) {
					families.spouses[i].showChildren = families.spouses[i].current;
				}
				cb(err, families);
			});
		},

		getNotes: function(id, cb) {
			var promise = $http.get('/tree-data/person/' + id + '/notes', {
				params: makeParams()
			});

			function getNoteData(personid, noteId, idx, notes) {
				var promise = $http.get('/tree-data/person/' + personid + '/notes/' + noteId, {
					params: makeParams()
				});

				handleResponse(promise, function(err, data) {
					if(data) {
						notes[idx] = data;
					}
				});
			}

			handleResponse(promise, function(err, data) {
				var notes = (data && data.notes) || [];

				for(var i = 0; i < notes.length; i++) {
					getNoteData(id, notes[i].id, i, notes);
				}

				cb(err, notes);
			});
		},

		getLifeSketch: function(id, cb) {
			var promise = $http.get('/tree-data/person/' + id + '/conclusions/life-sketch', {
				params: makeParams()
			});

			handleResponse(promise, cb);
		},

		getDiscussions: function(id, cb) {
			var promise = $http.get('/familytree/v2/person/' + id + '/discussion', {
				params: {
					dataFormat: 'application/json'
				}
			});

			function getDiscussionData(uriList, discussions, cb) {
				var promise = $http({
					method: 'POST',
					url: '/discussions/discussions?mediaType=json',
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					data: $.param({ discussion: uriList }, true)
				});

				handleResponse(promise, function(err, data) {
					cb(err, data && data.discussions);
				});
			}

			handleResponse(promise, function(err, data) {
				var discussions = (data && data.persons && data.persons[0] && data.persons[0].discussions) || [],
					urlList = [];

				for(var i = 0; i < discussions.length; i++) {
					urlList.push(discussions[i].uri);
				}

				if(urlList.length) {
					getDiscussionData(urlList, discussions, cb);
				} else {
					cb(err, discussions);
				}
			});
		},

		getSources: function(id, cb) {
			var promise = $http.get('ct/persons/' + id + '/references', {
				params: {
					mediaType: 'application/json'
				}
			});

			function getSourceData(sourceId, idx, sources) {
				var promise = $http.get('links/source/' + sourceId, {
					params: {
						mediaType: 'application/json',
						returnRefs: false
					}
				});

				handleResponse(promise, function(err, data) {
					if(data) {
						sources[idx] = data;
					}
				});
			}

			handleResponse(promise, function(err, data) {
				var sources = (data && data.reference) || [];

				for(var i = 0; i < sources.length; i++) {
					getSourceData(sources[i].referencedResourceUri, i, sources);
				}

				cb(err, sources);
			});
		},

		getOrdinances: function(id, ownerId, cb) {
			var promise = $http.get('/tree-data/reservations/person/' + id + '/ordinances', {
				params: makeParams({
					owner: ownerId
				})
			});

			handleResponse(promise, function(err, data) {
				if(data) {
					data.available = 0;
				}

				cb(err, data);
			});
		}
	}
}]);