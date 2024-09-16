"use strict";

const bvBtn = document.querySelector('.bvBtn');
const chvBtn = document.querySelector('.chvBtn');
const nameBV = document.querySelector('.nameBV');
const nameCHV = document.querySelector('.nameCHV');
const bv = document.querySelector('.bv');
const chv = document.querySelector('.chv');
const ice = document.querySelector('.ice');
const сая = document.querySelector('.сая');
setInterval(() => {
	сая.style.filter = 'invert(1000%)';
	const a = () => new Promise((res) => res(setTimeout(() => {
		сая.style.filter = 'invert(0%)';
	}, 50)));
	a();
}, 100);
for (let i = 0; i < 100; i++) {
	bv.insertAdjacentHTML('beforeend', `<span class="bv pizda-${i}">=</span>`);
	chv.insertAdjacentHTML('beforeend', `<span class="chv pizda-${i}">=</span>`);

}
for (let i = 0; i < 42; i++) {
	ice.insertAdjacentHTML('beforeend', `<span class="ice pizda-${i}">👁‍🗨</span>`);
}
const v = (v) => {
	nameBV.style.color = 'red';
	setTimeout(() => {
		nameBV.style.color = 'white';
	}, 10000);
	let i = 0;
	const f = () => {
		const el = document.querySelector(`.${v}.pizda-${i}`)
		el.style.color = '#FC0';
		el.style.textShadow = '#FC0 1px 0 10px';
		el.innerHTML = '?';
		const a = () => new Promise((res) => res(setTimeout(() => {
			el.style.color = 'white';
			el.style.textShadow = '';
			el.innerHTML = '=';
			i++;
			if (i < 100) {
				f();
			}
		}, 40)));
		a();
	};
	f();
};

bvBtn.addEventListener('click', () => {
	v('bv');
});

chvBtn.addEventListener('click', () => {
	v('chv');
});
