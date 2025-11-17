function sendContact() {
	try {
		const name = document.getElementById('name').value.trim();
		const email = document.getElementById('email').value.trim();
		const message = document.getElementById('message').value.trim();
		const status = document.getElementById('status');
		if (!name || !email || !message) {
			status.textContent = 'Please fill out all fields.';
			return;
		}
		const subject = encodeURIComponent('Portfolio contact from ' + name);
		const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
		window.location.href = `mailto:Kenean@email.com?subject=${subject}&body=${body}`;
		status.textContent = 'Thank you for your message!';
	} catch (e) {
		console.error('Contact form error:', e);
		const status = document.getElementById('status');
		if (status) {
			status.textContent = 'An error occurred. Please email me directly.';
		}
	}
}
document.addEventListener('DOMContentLoaded', () => {
	function setYear() {
		try {
			document.getElementById('year').textContent = new Date().getFullYear();
		} catch (e) {
			console.warn("Could not find 'year' element.");
		}
	}
	function setupHeaderScroll() {
		const header = document.querySelector('header');
		if (!header) return;
		function checkHeader() {
			if (window.scrollY > 20) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}
		}
		checkHeader();
		window.addEventListener('scroll', checkHeader, { passive: true });
	}
	function setupScrollReveal() {
		const reveals = document.querySelectorAll('.reveal');
		if (reveals.length === 0) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting) {
					e.target.classList.add('in-view');
				}
			});
		}, { threshold: 0.12 });
		reveals.forEach(r => io.observe(r));
	}
	function initMap() {
		if (!document.getElementById('map')) {
			return;
		}
		try {
			const coords = [9.0192, 38.7525];
			const map = L.map('map', {
				zoomControl: true,
				attributionControl: false
			}).setView(coords, 12);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
			}).addTo(map);
			L.marker(coords).addTo(map)
				.bindPopup('Akaki City — placeholder')
				.openPopup();
			setTimeout(() => {
				map.invalidateSize();
			}, 100);

		} catch (e) {
			console.warn('Map failed to initialize. Is Leaflet JS loaded?', e);
			const mapDiv = document.getElementById('map');
			if (mapDiv) {
				mapDiv.innerHTML = '<p style="color:var(--muted); padding: 10px;">Map could not be loaded.</p>';
			}
		}
	}
	function setupScrollspy() {
		const sections = document.querySelectorAll('section[id]');
		const navLinks = document.querySelectorAll('nav a');
		if (sections.length === 0 || navLinks.length === 0) return;
		const headerOffset = document.querySelector('header')?.offsetHeight || 80;
		function onScroll() {
			let current = '';
			sections.forEach(section => {
				const sectionTop = section.offsetTop;
				if (window.scrollY >= sectionTop - headerOffset - 40) {
					current = section.getAttribute('id');
				}
			});
			if (window.scrollY < sections[0].offsetTop - headerOffset - 40) {
				current = 'home';
			}
			navLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === '#' + current) {
					link.classList.add('active');
				}
			});
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}
	function setupAdjusters() {
		const overlaySlider = document.getElementById('overlay-slider');
		const overlayValue = document.getElementById('overlay-value');
		const blurSlider = document.getElementById('blur-slider');
		const blurValue = document.getElementById('blur-value');
		if (overlaySlider && overlayValue) {
			overlaySlider.addEventListener('input', (e) => {
				const value = e.target.value;
				document.documentElement.style.setProperty('--overlay-opacity', value);
				overlayValue.textContent = `${Math.round(value * 100)}%`;
			});
		}
		if (blurSlider && blurValue) {
			blurSlider.addEventListener('input', (e) => {
				const value = e.target.value;
				document.documentElement.style.setProperty('--blur-amount', value + 'px');
				blurValue.textContent = `${value}px`;
			});
		}
	}
	setYear();
	setupHeaderScroll();
	setupScrollReveal();
	initMap();
	setupScrollspy();
	setupAdjusters();
});