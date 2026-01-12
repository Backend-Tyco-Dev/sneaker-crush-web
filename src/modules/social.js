import _ from 'lodash';

let parseQuery = function(url, queryItems, params) {
	let query = [];
	_.each(queryItems, (fn, key) => {
		let value = _.isFunction(fn) ? fn(params) : '';
		if (value) query.push([key, encodeURIComponent(value)].join('='));
	});
	return url + (query.length ? '?' + query.join('&') : '');
};

let TYPES = {
    facebook: p => parseQuery('https://www.facebook.com/dialog/share', {
        app_id: p => 343038499627659,
        display: p => 'popup',
        href: p => p.url,
        quote: p => p.desc,
        redirect_uri: p => p.backurl
    }, p),
    twitter: p => parseQuery('https://twitter.com/intent/tweet', {
        // url: p => p.url,
        text: p => (p.desc || ''),
        related: ''
    }, p)
};

export default function(type, params) {
    return TYPES[type](params);
}