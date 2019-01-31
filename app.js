const screenWidth = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const screenHeight = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
var body = document.body,
  html = document.documentElement;

var documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
const slugify = (text) => {
  return text.toLowerCase().replace(/[\W_]+/g, '-')
}
const main = document.querySelector('.content')
let headings = [].slice.call(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
headings.reverse()
console.log(headings)
let aside = document.createElement('aside')
let list = document.createElement('div')
aside.insertAdjacentElement('afterbegin', list)
main.insertAdjacentElement('afterbegin', aside)
headings.forEach((heading, index) => {
  let type = heading.tagName.toLowerCase()
  let copy = toTitleCase(heading.innerText)
  let anchorName = slugify(copy)
  let anchor = document.createElement('a')
  let link = document.createElement('a')
  link.setAttribute('href', `#${anchorName}`)
  link.classList.add(type)
  link.innerText = copy
  anchor.setAttribute('id', anchorName)
  heading.insertAdjacentElement('beforebegin', anchor)
  list.insertAdjacentElement('afterbegin', link)
  console.log(index, anchorName)
})


window.onscroll = function () {
  const scroll = window.pageYOffset

  // log for debug
  // console.log(scroll);
  headings.forEach((heading) => {
    let position = (heading.offsetTop - scroll)
    if ((position <= (screenHeight * 0.66))) {
      let currentHeading = document.querySelector(`aside a[href="#${slugify(heading.innerText)}"]`)
      currentHeading.setAttribute('data-state', 'is-active')
    } else {
      let currentHeading = document.querySelector(`aside a[href="#${slugify(heading.innerText)}"]`);
      currentHeading.setAttribute("data-state", "not-active");
    }
  })

  CurrentScroll = scroll // Updates current scroll position
}