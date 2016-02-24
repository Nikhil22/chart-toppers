var syncRequest = require('sync-request');

function httpGet(theUrl) {
  var res = syncRequest('GET', theUrl);
  return res.getBody()
}

function getAllLikes(responseObj, masterLikes) {
	masterLikes = typeof masterLikes !== 'undefined' ? masterLikes : {'data':[]};
	var likes = responseObj['data'];
	masterLikes['data'] = masterLikes['data'].concat(likes);
	if (responseObj.hasOwnProperty('paging') && responseObj['paging'].hasOwnProperty('next')) {
    var r = JSON.parse(httpGet(responseObj['paging']['next']));
    getAllLikes(r, masterLikes);
	}
	return masterLikes;
}

function stringToObj(jsonString) {
	return JSON.parse(jsonString);
}

function keepObjsInArrayBasedOnKey(responseObj, key) {
	var array = responseObj['data'];
	return array.map(function(x) { return x }).filter(function(x) { return x.hasOwnProperty(key) });
}

module.exports = {
	'httpGet' : httpGet,
	'getAllLikes' : getAllLikes,
	'stringToObj' : stringToObj,
	'keepObjsInArrayBasedOnKey' : keepObjsInArrayBasedOnKey
}
