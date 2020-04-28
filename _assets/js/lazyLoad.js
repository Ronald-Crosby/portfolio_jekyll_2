document.addEventListener('DOMContentLoaded', function () {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				var image = entry.target;
				image.src = image.dataset.src;
				observer.unobserve(image);
			}
		})
	})

	const lazyLoadImgs = document.querySelectorAll('.lazyImg')
	lazyLoadImgs.forEach(image => {
		observer.observe(image)
	})
})