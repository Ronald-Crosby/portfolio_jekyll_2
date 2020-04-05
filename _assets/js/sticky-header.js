document.addEventListener('DOMContentLoaded', function () {

	const headerEl = document.querySelector('.globalHeader')
	const colEl = headerEl.querySelector('.headerCol')
	const headerBtns = headerEl.querySelectorAll('.button')


	function headerScrolling() {
		// reduce Y padding
		colEl.classList.add('scrolling-padding')

		// change buttons to not use underline effect
		headerBtns.forEach(btn => {
			btn.classList.remove('button-hoverEffect')
		})

		// highlight current section
	}

	function headerTop() {
		// reduce Y padding
		colEl.classList.remove('scrolling-padding')

		// change buttons to not use underline effect
		headerBtns.forEach(btn => {
			btn.classList.add('button-hoverEffect')
		})
	}

	document.addEventListener('scroll', () => {
		let scrollPosition = window.pageYOffset
		if (scrollPosition > 0) {
			headerScrolling()
		} else {
			headerTop()
		}
	})
})