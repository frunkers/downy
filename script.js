"use strict";
import { drawMagistral, init } from "./modules/magistral.js";
const bvBtn = document.querySelector('.bvBtn');
const сая = document.querySelector('.сая');
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
init();
bvBtn.addEventListener('click', () => {
	drawMagistral();
});
setInterval(() => {
	сая.style.filter = 'invert(1000%)';
	const a = () => new Promise((res) => res(setTimeout(() => {
		сая.style.filter = 'invert(0%)';
	}, 50)));
	a();
}, 100);
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