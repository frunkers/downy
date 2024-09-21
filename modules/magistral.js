const magistral = document.querySelector('.magistral');
const timer = document.querySelector('.magistral__timer');
const timerContent = document.querySelector('.timer__content');
for (let i = 0; i < 20; i++) {
	const item = `<img src="../images/road.jpg" class="magistral__road" />`
	magistral.insertAdjacentHTML('beforeend', item);
}
const train = document.querySelector('.magistral__train');
const sities = {
	'DownЯта': 0,
	'Тест1': 500,
	'Тест2': 1000,
	'Гавриловка': 1900,
}
for (const name in sities) {
	let item = document.createElement('div');
	item.innerHTML = name;
	item.classList.add('magistral__sity');
	item.style.left = sities[name] + "px";
	item.setAttribute('attr-name', name);
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
const sityStyles = (x) => {
	const sityName = Object.keys(sities).find((el) => {
		return sities[el] === x;
	});
	const sity = document.querySelector(`.magistral__sity[attr-name=${sityName}]`);
	return sity;
};
const sity = sityStyles(0);
sity.style.color = 'dodgerblue';
export const drawMagistral = async () => {
	let i = 0;
	const timeStop = 3000;
	const coords = Object.values(sities);
	let e = 0;
	sity.style.color = 'black';
	const run = async (directionGo) => {
		const sityX = coords[i];
		await directionGo(sityX);
		const sity = sityStyles(coords[i]);
		sity.style.color = 'dodgerblue';
		timer.style.left = coords[i] + "px";
		timer.style.display = 'block';
		let t = timeStop / 1000;
		timerContent.innerHTML = `через ${t} сек`;
		const q = setInterval(() => {
			t -= 1;
			timerContent.innerHTML = `через ${t} сек`;
		}, 1000);
		await sleep(timeStop);
		clearInterval(q);
		timer.style.display = 'none';
		sity.style.color = 'black';
	};
	while (e < 100) {
		e++;
		while (i < coords.length - 1) {
			if (train.classList.contains('reverse')) {
				train.classList.remove('reverse');
			}
			i += 1;
			await run(go);
		}
		while (i > 0) {
			if (!train.classList.contains('reverse')) {
				train.classList.add('reverse');
			}
			i -= 1;
			await run(gow);
		}
	}
};
