document.addEventListener('DOMContentLoaded', function () {
	const loader = document.querySelector('.loading-background')

	setTimeout(() => {
		loader.classList.add('loader-hidden')
	}, 3000)
})