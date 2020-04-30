document.addEventListener('DOMContentLoaded', function () {
	const animatedTags = document.querySelectorAll('.js-fadeIn')

	animatedTags.forEach(tag => {
		tag.style.opacity = 0
		tag.style.transform = 'translateY(20px)';
	})

	const fadeIn = function () {
		let delay = 0.1

		animatedTags.forEach(tag => {
			const tagTop = tag.getBoundingClientRect().top
			const tagBottom = tag.getBoundingClientRect().bottom

			if (tagTop < (window.innerHeight + 150) && tagBottom > -300) {
				tag.style.animation = `fadeIn 0.5s ${delay}s both`
			} else {
				tag.style.opacity = 0
				tag.style.animation = ''
			}

			delay = delay + 0.1
			if (delay > 0.5) { delay = 0 }
		})
	}

	setTimeout(() => {
		fadeIn()
	}, 3000);

	document.addEventListener('scroll', () => {
		fadeIn()
		console.log('scrolled')
	})
	window.addEventListener('resize', () => {
		fadeIn()
		console.log('resize')
	})
})