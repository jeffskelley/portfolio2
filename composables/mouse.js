let listening = false

const mouse = reactive({
  x: 0,
  y: 0,
})

function onMousemove({ clientX, clientY }) {
  mouse.x = clientX / window.innerWidth
  mouse.y = clientY / window.innerHeight
}

export function useMouse() {
  if (!listening) {
    window.addEventListener('mousemove', onMousemove)
    listening = true
  }

  return mouse
}
