import "./main.css";
import navigation from "./navigation";
import {
  onClick,
  resize,
  keyDown,
  onChangeClick,
  keyDownChange,
  setTimeWithOffset
} from "./utils";

// create the wrapper for the list items
const navItemWrapper = document.createElement("ul");
navItemWrapper.classList.add("nav_item_wrapper");

// loop through the cities to create the nav
navigation.cities.forEach((city, index) => {
  const { label, section } = city;
  // create the list items and buttons for each city
  const navItem = document.createElement("li");
  const navButton = document.createElement("button");
  const navContent = document.createElement("span");
  const classes = index === 0 ? ["nav_item", "active"] : ["nav_item"];

  // add event listeners
  navContent.addEventListener("click", onClick);
  navButton.addEventListener("keypress", keyDown);

  // set the button values
  navButton.classList.add(...classes);
  navButton.value = section;
  navButton.type = "button";

  // set content values and tab index for accessibility
  navContent.textContent = label;
  navContent.classList.add("nav_item_content");
  navContent.tabIndex = -1;

  // append each city to the list
  navButton.appendChild(navContent);
  navItem.appendChild(navButton);
  navItemWrapper.appendChild(navItem);
});

// marker to underline the text
const activeMarker = document.createElement("span");
activeMarker.classList.add("active_marker");

// append nav and marker
const navContainer = document.querySelector("#nav_container");
navContainer.appendChild(navItemWrapper);
navContainer.appendChild(activeMarker);

// event listeners for mobile view
const changeBtn = document.querySelector(".change_btn");
changeBtn.addEventListener("keypress", keyDownChange);

// icon for mobile view
const iconWrapper = document.querySelector(".menu_icon_wrapper");
iconWrapper.addEventListener("click", onChangeClick);

// get current active item
const { label, timezoneOffset } = navigation.cities.find(
  (city) => city.section === document.querySelector(".nav_item.active").value
);

// set the initial selected item, ie first in list
resize();
setTimeWithOffset(timezoneOffset, label);

// listen to window resize to correct the positioning
window.addEventListener("resize", resize);
