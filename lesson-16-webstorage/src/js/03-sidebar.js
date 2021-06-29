import '../css/common.css';
import '../css/sidebar.css';

const DEFAULT_OPENED_CLASS = 'is-open';
const DEFAULT_LOCALSTORAGE_KEY = 'sidebar-status';

class SidebarWidget {
  constructor({
    selector,
    opednedClass = DEFAULT_OPENED_CLASS,
    localStoageKey = DEFAULT_LOCALSTORAGE_KEY,
  }) {
    this._sidebarRef = document.querySelector(selector);
    this._opednedClass = opednedClass;
    this._localStorageKey = localStoageKey;
    this._init();
  }

  _init() {
    const persistedSidebarState = localStorage.getItem(this._localStorageKey);
    if (persistedSidebarState !== null) {
      const shouldOpenSidebar = JSON.parse(persistedSidebarState);
      if (shouldOpenSidebar) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open() {
    this._sidebarRef.classList.add(this._opednedClass);
    this._saveOpenedStateToLS(true);
  }

  close() {
    this._sidebarRef.classList.remove(this._opednedClass);
    this._saveOpenedStateToLS(false);
  }

  toggle() {
    this._sidebarRef.classList.toggle(this._opednedClass);
  }

  _saveOpenedStateToLS(state) {
    localStorage.setItem(this._localStorageKey, state);
  }
}

// Правый
const rightSidebar = new SidebarWidget({
  selector: '#my-sidebar',
  localStoageKey: 'right-sidebar-status',
});

document
  .querySelector('[data-open-right-sidebar]')
  .addEventListener('click', () => rightSidebar.open());

document
  .querySelector('[data-close-right-sidebar]')
  .addEventListener('click', () => rightSidebar.close());

// document
//     .querySelector('[data-toggle-sidebar]')
//     .addEventListener('click', () => rightSidebar.toggle());

// Левый
const leftSidebar = new SidebarWidget({
  selector: '#left-sidebar',
  localStoageKey: 'left-sidebar-status',
});

document
  .querySelector('[data-open-left-sidebar]')
  .addEventListener('click', () => leftSidebar.open());

document
  .querySelector('[data-close-left-sidebar]')
  .addEventListener('click', () => leftSidebar.close());
