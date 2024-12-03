/**
 * Dragster core, framework agnostic drag and drop utility
 * Draggable elements
 * Droppable zones
 */

/**
 * breakdown of steps
 *
 * items are in a dropzone
 * each item in the dropzone can be moved around
 * items can move across dropzones (ALSO external components, important)
 * even if the dropping isn't completed it needs to provide a preview
 * on drag end it can do the actual swapping of the arrays
 * IT NEEDS TO BE PERFORMANT!
 */

/**
 * on starting the drag I clone the element to drag it around
 * as I go I may land on other dropzones - these dropzones
 * have elements in them, once I land I need to do two things
 * 1: update the starting item list by removing the dragged element
 * 2: update the ending item list by adding the dragged element
 *
 * the whole dragging part is technically a global event, cause you're
 * not going to do other things as that's happening
 * so maybe a window event?
 *
 * could initialise the drag in the Draggable element, add a window listener
 * for mousemove, mouseup etc
 *
 * then just figure out where I'm landing
 */

const sharedState = {
  count: 0,
}

export class Dragster {
  private isDragging = false
  private dragThreshold = 5
  private startPosition = { x: 0, y: 0 }
  private ghostElement: HTMLElement | null = null

  constructor() {}

  init = (element: HTMLElement) => {
    // set up the mousedown event - this won't need removing
    element.addEventListener('mousedown', (event) =>
      this.startDrag(event, element)
    )
  }

  startDrag = (event: MouseEvent, element: HTMLElement) => {
    this.isDragging = false
    this.startPosition = { x: event.clientX, y: event.clientY }

    // assign the events to variables so they can be removed
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      this.drag(moveEvent, element)

      const distanceX = Math.abs(moveEvent.clientX - this.startPosition.x)
      const distanceY = Math.abs(moveEvent.clientY - this.startPosition.y)

      // check whether we are dragging
      if (
        !this.isDragging &&
        (distanceX > this.dragThreshold || distanceY > this.dragThreshold)
      ) {
        this.isDragging = true
        this.createGhostElement(element)
      }

      if (this.isDragging) {
        this.drag(moveEvent, element)
      }
    }
    const mouseUpHandler = () => {
      this.dragEnd(element, mouseMoveHandler, mouseUpHandler)
    }

    // actually add the listeners
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  drag = (event: MouseEvent, element: HTMLElement) => {
    console.log('going', event, element)

    if (this.ghostElement) {
      // Position the ghost element to follow the cursor
      this.ghostElement.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    }
  }

  dragEnd = (
    element: HTMLElement,
    mouseMoveHandler: (event: MouseEvent) => void,
    mouseUpHandler: () => void
  ) => {
    console.log(this.isDragging ? 'Drag Ended' : 'Click Detected')
    this.isDragging = false

    // remove the listeners on end
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)

    // Remove the ghost element
    if (this.ghostElement) {
      this.ghostElement.remove()
      this.ghostElement = null
    }
  }

  createGhostElement = (element: HTMLElement) => {
    // Create a clone of the original element
    this.ghostElement = element.cloneNode(true) as HTMLElement

    // Style the ghost element
    Object.assign(this.ghostElement.style, {
      position: 'absolute',
      pointerEvents: 'none', // Ensure it doesn't interfere with mouse events
      opacity: '0.8',
      zIndex: '1000',
      top: '0px',
      left: '0px',
      transform: 'translate(-9999px, -9999px)', // Initially hide it off-screen
    })

    document.body.appendChild(this.ghostElement)
  }
}

export const dragster = new Dragster()
