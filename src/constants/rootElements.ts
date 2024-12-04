let ROOT_ELEMENT: any;
let MODAL_ROOT_ELEMENT: any;

if (typeof document !== "undefined") {
  ROOT_ELEMENT = document.getElementById("root");
  MODAL_ROOT_ELEMENT = document.getElementById("modal-root");
}

export { MODAL_ROOT_ELEMENT, ROOT_ELEMENT };
