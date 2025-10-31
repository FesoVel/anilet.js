/*!
 * AniLet.js v1.1.0
 * Class-driven animated letters (vanilla JS)
 */

(function() {
	function splitText(el) {
		if (el.dataset.aniLetSplit) return;

		const text = el.textContent.trim();
		el.textContent = '';

		for (const char of text) {
			const span = document.createElement('span');
			span.textContent = char === ' ' ? '\u00A0' : char;
			span.style.cssText = 'display:inline-block;opacity:0;';
			el.appendChild(span);
		}

		el.dataset.aniLetSplit = 'true';
	}

	function inView(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top < window.innerHeight * 0.9 &&
			rect.bottom > 0
		);
	}

	function animateLetter(span, type, delay, duration, index, totalLetters) {
		const letterDuration = duration / totalLetters;
		const start = performance.now() + delay + letterDuration * index;

		function frame(time) {
			const progress = Math.min((time - start) / letterDuration, 1);

			if (progress >= 0) {

				const easing = 1 - Math.pow(1 - progress, 3);

				span.style.opacity = easing;

				switch (type) {
					case 'fadeIn':
						span.style.transform = `scale(${0.95 + 0.05 * easing})`;
						break;

					case 'slideUp':
					case 'slideDown': {
						const h = span.offsetHeight || 40,
							dir = type === 'slideUp' ? 1 : -1;
						span.style.transform = `translateY(${dir * h * (1 - easing)}px)`;
						break;
					}

					case 'zoomIn': {
						const e = 1 - Math.pow(1 - progress, 3),
							s = 0.3 + 0.7 * e;
						span.style.transform = `scale3d(${s},${s},${s})`;
						span.style.opacity = e;
						break;
					}

					case 'fadeInLeft':
					case 'fadeInRight': {
						const w = span.offsetWidth || 20,
							e = 1 - Math.pow(1 - progress, 3),
							dir = type === 'fadeInLeft' ? -1 : 1;
						span.style.transform = `translate3d(${dir * w * (1 - e)}px,0,0)`;
						span.style.opacity = e;
						break;
					}

					case 'fadeInDown': {
						const h = span.offsetHeight || 20,
							e = 1 - Math.pow(1 - progress, 3);
						span.style.transform = `translate3d(0,${-h * (1 - e)}px,0)`;
						span.style.opacity = e;
						break;
					}

					case 'fadeInTopLeft':
					case 'fadeInTopRight': {
						const w = span.offsetWidth || 40,
							h = span.offsetHeight || 40,
							dir = type === 'fadeInTopLeft' ? -1 : 1;
						span.style.transform = `translate3d(${dir * w * (1 - easing)}px,${-h * (1 - easing)}px,0)`;
						break;
					}

					case 'bounceIn':
						let s, o = 1,
							p = progress;
						if (p < .2) s = 0.3 + (1.1 - 0.3) * (p / .2), o = 0;
						else if (p < .4) s = 1.1 + (0.9 - 1.1) * ((p - .2) / .2), o = 0;
						else if (p < .6) s = 0.9 + (1.03 - 0.9) * ((p - .4) / .2), o = (p - .4) / .2;
						else if (p < .8) s = 1.03 + (0.97 - 1.03) * ((p - .6) / .2);
						else s = 0.97 + (1 - 0.97) * ((p - .8) / .2);
						span.style.transform = `scale3d(${s},${s},${s})`;
						span.style.opacity = o;
						break;
					case 'fallDown': {
						const t = progress < 0.8 ? progress / 0.8 : (progress - 0.8) / 0.2;
						const isEarly = progress < 0.8;
						const translateY = isEarly ? -1200 * (1 - t) : 0;
						const scale = isEarly ? 0.7 : 0.7 + 0.3 * t;
						const opacity = isEarly ? 0.7 : 0.7 + 0.3 * t;
						span.style.transform = `translateY(${translateY}px) scale(${scale})`;
						span.style.opacity = opacity;
						break;
					}
				}
			}

			if (progress < 1) requestAnimationFrame(frame);
		}

		requestAnimationFrame(frame);
	}

	function initAniLet() {
		document.querySelectorAll('.aniLet').forEach(el => {
			splitText(el);
			const spans = el.querySelectorAll('span'),
				c = el.classList;
			const map = {
				aniLet__fadeIn: 'fadeIn',
				aniLet__slideUp: 'slideUp',
				aniLet__slideDown: 'slideDown',
				aniLet__zoomIn: 'zoomIn',
				aniLet__fadeInLeft: 'fadeInLeft',
				aniLet__fadeInRight: 'fadeInRight',
				aniLet__fadeInDown: 'fadeInDown',
				aniLet__fadeInTopLeft: 'fadeInTopLeft',
				aniLet__fadeInTopRight: 'fadeInTopRight',
				aniLet__bounceIn: 'bounceIn',
				aniLet__fallDown: 'fallDown'
			};
			const type = Object.keys(map).find(k => c.contains(k)) ? map[Object.keys(map).find(k => c.contains(k))] : 'fadeIn';
			const delay = +el.dataset.delay || 50,
				dur = +el.dataset.duration || 600;
			let done = 0;
			const check = () => !done && inView(el) && (done = 1, spans.forEach((s, i) => animateLetter(s, type, delay, dur, i, spans.length)), window.removeEventListener('scroll', scrollHandler));
			const scrollHandler = check.bind(el);
			window.addEventListener('scroll', scrollHandler);
			check();
		});
	}

	document.readyState !== 'loading' ? initAniLet() : document.addEventListener('DOMContentLoaded', initAniLet);

})();