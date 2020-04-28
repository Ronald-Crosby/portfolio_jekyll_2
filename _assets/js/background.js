document.addEventListener('DOMContentLoaded', function () {
  const backgroundTag = document.getElementById('background')
  const colorSections = document.querySelectorAll('[data-bg-color]')

  let colorSectionData = []

  colorSections.forEach(section => {
    colorSectionData.push({
      offset: parseInt(section.getBoundingClientRect().top + window.pageYOffset),
      classes: section.getAttribute('data-bg-color'),
    })
  })

  const updateBackground = () => {
    const windowScroll = window.pageYOffset
    colorSectionData.forEach(({ offset, classes }) => {
      if (windowScroll + 300 >= offset) {
        backgroundTag.className = classes
      }
    })
  }

  document.addEventListener('scroll', updateBackground)
  updateBackground()
})
