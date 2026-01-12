import Vue from 'vue';
import _ from 'lodash';

const SIZES = [
	['xs', 0],
	['sm', 576],
	['md', 768],
	['lg', 992],
	['xl', 1200]
];
const DEFAULT = 'md';

let lastW;
let w;
let vars = [];

let handler = () => {
	let width = window.innerWidth;
	lastW = w;
	w = typeof width === 'number' ? _.get(SIZES.filter((item, index, arr) => item[1] < width && width <= _.get(arr, `[${index + 1}][1]`, 99999))[0], '[0]', DEFAULT) : DEFAULT;
	// console.log(w, width);
	if (lastW !== w) {
		_.each(vars, item => item.getValue());
	}
};

window.addEventListener('resize', handler);

handler();

class ResizedVar {
	constructor(options) {
		this.value = null;
		this.options = options;
		this.values = _.fromPairs(_.cloneDeep(SIZES)
			.map((item, index, arr) => {
				let prev = arr[index - 1];
				item[1] = options[item[0]];
				if (!item[1]) item[1] = prev ? prev[1] : 0;
				return item;
			}));
		this.getValue();
		vars.push(this);
	}

	getValue() {
		Vue.set(this, 'value', this.values[w]);
	}

	destroy() {
		let index = vars.indexOf(this);
		if (~index) {
			vars.splice(index, 1);
		}
	}
}

export default ResizedVar;