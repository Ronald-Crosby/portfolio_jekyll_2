document.addEventListener('DOMContentLoaded', function () {
  const backgroundTag = document.getElementById('background')
  const colorSections = document.querySelectorAll('[data-bg-color]')

    const myObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.1) {
          const bgColor = entry.target.getAttribute('data-bg-color')
          backgroundTag.className = bgColor
        }
      })
    }, {
      threshold: [0.1, 0.9]
    })
  

  colorSections.forEach(section => {
    myObserver.observe(section)
  })
})
