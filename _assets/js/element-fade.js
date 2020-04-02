document.addEventListener('DOMContentLoaded', function () {
	const animatedTags = document.querySelectorAll('.js-fadeIn')

	animatedTags.forEach(tag => {
		tag.style.opacity = 0
		tag.style.transform = 'translateY(20px)';
	})

	const fadeIn = function () {
		let delay = 0

		animatedTags.forEach(tag => {
			const tagTop = tag.getBoundingClientRect().top
			const tagBottom = tag.getBoundingClientRect().bottom

			if (tagTop < window.innerHeight) {
				tag.style.animation = `fadeIn 1s ${delay}s both`
			}
			delay = delay + 0.3
		})
	}

	fadeIn()
	document.addEventListener('scroll', () => {
		fadeIn()
	})
	window.addEventListener('resize', () => {
		fadeIn()
	})
})