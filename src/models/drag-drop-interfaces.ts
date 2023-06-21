export interface Draggable {
  //We need two event listeners therefore we need two handlers.DragEvent is a built in type.
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; //The thing that is being dragged over is a valid target.
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
