import { Train } from "./Train.js";
import { sleep } from "../common.js";

export class Line {
	constructor(roadImage, sities) {
		this.roadImage = roadImage;
		this.sities = sities;
		this.activeSity = Object.keys(sities)[0];
		const train = document.querySelector('.magistral__train');
		const timer = document.querySelector('.magistral__timer');
		this.timer = timer;
		const timerContent = document.querySelector('.timer__content');
		this.timerContent = timerContent;
		this.train = new Train(train);
		this.stopingTime = 3000; // ms
	}

	async run(directionGo, sityX, i) {
		await directionGo(sityX);
		this.activeSity = Object.keys(this.sities)[i];
		const sity = document.querySelector(`.magistral__sity[attr-name=${this.activeSity}]`);
		sity.style.color = 'dodgerblue';
		this.timer.style.left = sityX + "px";
		this.timer.style.display = 'block';
		let timerTime = this.stopingTime / 1000;
		this.timerContent.innerHTML = `через ${timerTime} сек`;
		const timerInterval = setInterval(() => {
			timerTime--;
			this.timerContent.innerHTML = `через ${timerTime} сек`;
		}, 1000);
		await sleep(this.stopingTime);
		clearInterval(timerInterval);
		this.timer.style.display = 'none';
		sity.style.color = 'midnightblue';
	}

	async render() {
		const coords = Object.values(this.sities);
		let e = 0;
		let i = 0;
		while (e < 100) {
			while (i < coords.length - 1) {
				i += 1;
				this.train.reverse_off();
				await this.run(this.train.forward, coords[i], i);
			}
			while (i > 0) {
				i -= 1;
				this.train.reverse_on();
				await this.run(this.train.backward, coords[i], i);
			}
			e++;
		}
	}

	draw() {
		const magistral = document.querySelector('.magistral');

		for (let i = 0; i < 20; i++) {
			const item = `<img src=${this.roadImage.src} class="magistral__road" />`
			magistral.insertAdjacentHTML('beforeend', item);
		}

		for (const name in this.sities) {
			let item = document.createElement('div');
			item.innerHTML = name;
			item.classList.add('magistral__sity');
			item.style.left = this.sities[name] + "px";
			item.setAttribute('attr-name', name);
			magistral.insertAdjacentElement('beforeend', item);
		}

		const sity = document.querySelector(`.magistral__sity[attr-name=${this.activeSity}]`);
		sity.style.color = 'dodgerblue';
		this.render();
	}
}