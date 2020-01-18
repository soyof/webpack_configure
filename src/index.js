import avatar from './assets/images/avatar.jpg'

const img = new Image()
img.src = avatar

const root = document.querySelector('#app')
root.append(img)

import { add } from './common'

add(5, 6)

// import fn from './fn'
// if (module.hot) {
//   module.hor.accept('./fn', () => {
//     fn()
//   })
// }
