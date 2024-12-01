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

export class Dragster {
  private draggedElement: HTMLElement | null = null
}
