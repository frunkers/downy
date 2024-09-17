"use strict";

const bvBtn = document.querySelector('.bvBtn');
const chvBtn = document.querySelector('.chvBtn');
const nameBV = document.querySelector('.nameBV');
const nameCHV = document.querySelector('.nameCHV');
const bv = document.querySelector('.bv');
const chv = document.querySelector('.chv');
const ice = document.querySelector('.ice');
const сая = document.querySelector('.сая');
const cMag = document.querySelector('.c-mag');
const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');
const r = () => {
	ctx.strokeStyle = 'red';
	ctx.moveTo(0, 10);
	ctx.lineTo(1500, 10);
	ctx.stroke();
	ctx.moveTo(0, 50);
	ctx.lineTo(1500, 50);
	ctx.stroke();
	ctx.fillText('[БВ]', 0, 10);
	ctx.fillText('[ЧВ]', 0, 50);
};
r();
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
		r();
		el.innerHTML = '👁';
		const a = () => new Promise((res) => res(setTimeout(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillText('👁', i * 10, 10);
			for (let j = 0; j < 10; j++) {
				const sol = Math.random() * 21 - 10; // (10 - (-10) + 1) - 10 = 21 - 10
				ctx.fillRect(i * 10 + sol, 10 + sol, 1, 1);
			}
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
