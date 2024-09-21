const magistral = document.querySelector('.magistral');
for (let i = 0; i < 15; i++) {
	const item = `<img src="../images/road.jpg" class="road" />`
	magistral.insertAdjacentHTML('beforeend', item);
}
const train = document.querySelector('.train');
const sities = {
	'DownЯта': 0,
	'Тест1': 500,
	'Тест2': 1000,
	'Гавриловка': 1500,
}
for (const name in sities) {
	let item = document.createElement('div');
	item.innerHTML = name;
	item.classList.add('magistral__sity');
	item.style.left = sities[name] + "px";
	magistral.insertAdjacentElement('beforeend', item);
}
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
let v0 = 0;
let v = 0;
let vMax = 10;
let x0 = 0;
let x = 0;
let t = 0;
let a = 0;
const goA = 0.5;
const breakA = -0.2;
const go = async (sityX) => {
	const breakX = sityX - (0 - vMax ** 2) / (2 * breakA);
	a = goA;
	v = 0;
	v0 = 0;
	x0 = x;
	t = 0;
	while (x < sityX) {
		if (v < vMax || x >= breakX) {
			v = v0 + a * t;
			x = x0 + v0 * t + a * t ** 2 / 2;
		} else if (v >= vMax) {
			if (a !== 0) {
				t = 0;
				x0 = x;
				v0 = v;
				a = 0;
			} else {
				x = x0 + v * t;
			}
		}
		if (x >= breakX) {
			if (a === 0) {
				t = 0;
				x0 = x;
				a = breakA;
			}
		}
		train.style.left = Math.round(x) + "px";
		t += 0.5;
		await sleep(20);
	}
};
const gow = async (sityX) => {
	v0 = 0;
	v = 0;
	x0 = x;
	t = 0;
	const breakX = sityX + (0 - vMax ** 2) / (2 * breakA);
	a = goA;
	while (x > sityX) {
		// console.log(v);
		if (v > -vMax || x <= breakX) {
			v = v0 - a * t;
			x = x0 + v0 * t - a * t ** 2 / 2;
		} else if (v >= -vMax) {
			if (a !== 0) {
				t = 0;
				x0 = x;
				v0 = v;
				a = 0;
			} else {
				x = x0 + v * t;
			}
		}
		if (x <= breakX) {
			if (a === 0) {
				t = 0;
				x0 = x;
				a = breakA;
			}
			if (v === 0) {
				break;
			}
		}
		train.style.left = Math.round(x) + "px";
		t += 0.5;
		await sleep(20);
	}
};
export const drawMagistral = async () => {
	let i = 1;
	const coords = Object.values(sities);
	while (i <= coords.length - 1) {
		const sityX = coords[i];
		await go(sityX);
		// await sleep(1000);
		i += 1;
	}
	i -= 2;
	while (i >= 0) {
		const sityX = coords[i];
		await gow(sityX);
		// await sleep(1000);
		i -= 1;
	}
};
