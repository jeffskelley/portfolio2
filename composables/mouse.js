import { gsap } from 'gsap'
let listening = false

const mouse = reactive({
  x: 0,
  y: 0,

  last: {
    x: 0,
    y: 0,
  },

  velocity: {
    x: 0,
    y: 0,
  },

  velocityTweened: {
    x: 0,
    y: 0,
  },
})

let lastTime = 0
let lastTween
function update(time) {
  requestAnimationFrame(update)
  const timeDelta = time - lastTime
  lastTime = time
  mouse.velocity.x = (mouse.x - mouse.last.x) / timeDelta
  mouse.velocity.y = (mouse.y - mouse.last.y) / timeDelta

  lastTween?.kill()
  lastTween = gsap.to(mouse.velocityTweened, {
    x: mouse.velocity.x,
    y: mouse.velocity.y,
    duration: 0.1,
  })

  mouse.last.x = mouse.x
  mouse.last.y = mouse.y
}

function onMousemove({ clientX, clientY }) {
  mouse.last.x = mouse.x
  mouse.last.y = mouse.y
  mouse.x = clientX / window.innerWidth
  mouse.y = clientY / window.innerHeight
}

export function useMouse() {
  if (!listening) {
    listening = true
    window.addEventListener('mousemove', onMousemove)
    requestAnimationFrame(update)
  }

  return mouse
}
