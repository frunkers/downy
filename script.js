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
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const r = () => {
	ctx.strokeStyle = 'gray';
	ctx.moveTo(0, 10);
	ctx.lineTo(1500, 10);
	ctx.stroke();
	ctx.moveTo(0, 50);
	ctx.lineTo(1500, 50);
	ctx.stroke();
	ctx.fillStyle = 'orange';
	ctx.fillText('[БВ]', 0, 10);
	ctx.fillText('[ЧВ]', 0, 50);
};
r();
const v = async () => {
	nameBV.style.color = 'red';
	setTimeout(() => {
		nameBV.style.color = 'white';
	}, 10000);
	for (let i = 0; i < 100; i++) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		r();
		ctx.fillText('👽', i * 10, 10);
		for (let j = 0; j < 10; j++) {
			const solX = Math.random() * 11 - 5; // (10 - (-10) + 1) - 10 = 21 - 10
			const solY = Math.random() * 11 - 5;
			ctx.fillStyle = 'red';
			ctx.fillRect((i * 10 - 5) + solX, 10 + solY, 1, 1);
		}
		await sleep(40);
	}
	// const f = () => {
	// 	const el = document.querySelector(`.${v}.pizda-${i}`)
	// 	el.style.color = '#FC0';
	// 	el.style.textShadow = '#FC0 1px 0 10px';
	// 	r();
	// 	el.innerHTML = '👽';
	// 	const a = () => new Promise((res) => res(setTimeout(() => {
	// 		el.style.color = 'white';
	// 		el.style.textShadow = '';
	// 		el.innerHTML = '=';
	// 		i++;
	// 		if (i < 100) {
	// 			f();
	// 		}
	// 	}, 40)));
	// 	a();
	// };
	// f();
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
{
	const elevator = document.querySelector('.elevator');
	const ctxE = elevator.getContext('2d');
	const tt = () => {
		ctxE.fillStyle = 'red';
		ctxE.beginPath();
		ctxE.rect(10, y, 60, 80);
		ctxE.fill();
	};
	let t = 0;
	let v0 = 0;
	let y0 = 10;
	let vmax = 6;
	let a = 0.3;
	let v = 0;
	let y = y0;
	const downBtn = document.querySelector('.downBtn');
	tt();
	let y_prev = 0;
	downBtn.addEventListener('click', async () => {
		for (let i = 0; i < 500; i++) {
			if (i >= 50) {
				a -= 0.001;
			}
			v = v0 + a * t;
			y = y0 + v * t + a * t ** 2 / 2;
			if (y_prev > y) {
				break;
			}
			y_prev = y;
			t += 0.25;
			ctxE.fillStyle = 'black';
			ctxE.clearRect(0, 0, elevator.width, elevator.height);
			tt();
			await sleep(10);
		}
	});
}