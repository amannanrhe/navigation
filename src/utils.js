import navigation from "./navigation";

// enter key code
const ENTER_KEY_CODE = 13;
// timer for time display
let intervalTimer;

/**
 * Returns element position
 *
 * @param {node} element - Element to get the position of
 *
 * @return {object} - Returns the relative position of the node in realtion to view port
 */
const relativePosition = (element) => element.getBoundingClientRect();

/**
 * Set position passed marker
 *
 * @param {node} marker - The element for the active marker, which needs to be positioned
 * @param {object} positionOffsets - The relative positions to apply. Should include the width, height, left, and top
 */
const setMarkerPosition = (marker, positionOffsets) => {
  marker.style.width = `${positionOffsets.width}px`;
  marker.style.height = `${positionOffsets.height}px`;
  marker.style.left = `${positionOffsets.left}px`;
  marker.style.top = `${positionOffsets.top}px`;
};

/**
 * Set time of current selection
 *
 * @param {number} offset - The offset to apply to utc time
 * @param {string} label - The name of the city
 */
export const setTimeWithOffset = (offset, label) => {
  clearInterval(intervalTimer);

  const time = new Date();
  time.setHours(time.getUTCHours() + offset);

  const meridian = time.getHours() >= 12 ? "pm" : "am";
  const baseHours =
    time.getHours() - 12 > 0 ? time.getHours() - 12 : time.getHours();
  const hours = baseHours < 10 ? `0${baseHours}` : baseHours;
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

  const timeLabel = document.querySelector(".time_label");
  const timeDisplay = document.querySelector(".time_display");
  timeLabel.textContent = `The time in ${label} is`;
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}${meridian}`;

  intervalTimer = setInterval(setTimeWithOffset, 1000, offset, label);
};

/**
 * Click handler for menu button on mobile. Toggles button open state.
 */
export const onChangeClick = () => {
  const nav = document.querySelector(".nav_item_wrapper");
  nav.classList.toggle("active");
};

/**
 * Click handler for the navigation items. Gets active marker and set position
 *
 * @param {event} e - Event which triggers click
 */
export const onClick = (e) => {
  const item = e.target;

  if (
    !item.classList.contains("nav_item_content") &&
    !item.classList.contains("nav_item")
  )
    return;

  const clickTarget = item.classList.contains("nav_item")
    ? item
    : item.parentNode;

  const value = clickTarget.value;
  const city = navigation.cities.find((city) => city.section === value);

  const { label, timezoneOffset } = city;

  document
    .querySelectorAll(".nav_item")
    .forEach((el) => el.classList.remove("active"));

  clickTarget.classList.add("active");
  const itemRelativePosition = relativePosition(clickTarget);
  setMarkerPosition(
    document.querySelector(".active_marker"),
    itemRelativePosition
  );
  setTimeWithOffset(timezoneOffset, label);

  // hide menu after selection on mobile
  if (window.innerWidth <= 870) {
    setTimeout(onChangeClick, 350);
  }
};

/**
 * Window resize event handler to correct marker positin on resize
 */
export const resize = () => {
  const itemRelativePosition = relativePosition(
    document.querySelector(".nav_item.active")
  );
  setMarkerPosition(
    document.querySelector(".active_marker"),
    itemRelativePosition
  );
};

/**
 * Handler for key press on nav items for accessibility. Sets the position only if enter is hit on the current selected nav item.
 *
 * @param {event} e  - Event which triggered key press
 */
export const keyDown = (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    onClick(e);
  }
};

/**
 *  Key handler for menu button on mobile. Toggles button open state.
 *
 * @param {event} e - Evenet which triggered key press
 */
export const keyDownChange = (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    onChangeClick(e);
  }
};
