document.addEventListener('DOMContentLoaded', function () {

	const headerEl = document.querySelector('.globalHeader')
	const colEl = headerEl.querySelector('.headerCol')
	const headerBtns = headerEl.querySelectorAll('.button')
	const sections = document.querySelectorAll('.section')
	const halfScreenHeight = window.innerHeight / 2
	const navActiveClass = 'nav-link-highlight'

	function headerScrolling() {
		// reduce Y padding
		colEl.classList.add('scrolling-padding')

		// change buttons to not use underline effect
		headerBtns.forEach(btn => {
			btn.classList.remove('button-hoverEffect')
		})
	}

	function headerTop() {
		// reduce Y padding
		colEl.classList.remove('scrolling-padding')

		// change buttons to not use underline effect
		headerBtns.forEach(btn => {
			btn.classList.add('button-hoverEffect')
		})
	}

	// highlight the link based on the current section
	function highlightLinks(scrollPosition) {
		let currentSection
		// for each section...
		sections.forEach(section => {
			// ...get the relevant 
			const sectionTop = parseInt(section.getBoundingClientRect().top + document.documentElement.scrollTop)
			const sectionBottom = parseInt(section.getBoundingClientRect().bottom + document.documentElement.scrollTop)

			// ...find out whether its in view
			if (scrollPosition > (sectionTop - halfScreenHeight) && scrollPosition < (sectionBottom - halfScreenHeight)) {
				// get the nav link that has the same id as the section that is currently in view
				currentSection = section.id
			}
		})

		headerBtns.forEach(btn => {
			if (btn.dataset.id === currentSection && !btn.classList.contains(navActiveClass)) {
				btn.classList.add(navActiveClass)
			} else if (btn.dataset.id !== currentSection) {
				btn.classList.remove(navActiveClass)
			}
		})

	}

	document.addEventListener('scroll', () => {
		let scrollPosition = window.pageYOffset
		highlightLinks(scrollPosition)
		if (scrollPosition > 0) {
			headerScrolling()
		} else {
			headerTop()
		}
	})
})