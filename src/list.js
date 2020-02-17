import _ from 'loadsh'
import avatar from './assets/images/avatar.jpg'
import './assets/css/index.css'
import 'jquery'

const img = new Image()
img.src = avatar
img.id = 'img'

const root = document.querySelector('#app')
root.append(img)

// eslint-disable-next-line no-undef
console.log($('#img'))

import { add } from './common'
add(5, 6)

console.log(_.join([1, 2, 3], ','))

// import fn from './fn'
// if (module.hot) {
//   module.hor.accept('./fn', () => {
//     fn()
//   })
// }
