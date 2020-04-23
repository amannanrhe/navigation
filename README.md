# Navigation Bar

Simple navigation bar to display list of cities and view current time

# Usage

Run the following command to set the node version. Node 12.13.1 was used during development:
`nvm use`

Run the following command to install dependencies:
`npm install`

Run this command to build client files and start node server on port 1234:
`npm start`

The app displays a navigation bar with cities available, loaded from an array. The current active city is indicated by a marker, and on selection the time for the currently selected city is shown. The navigation bar is responsive and switches to a mobile view at a break point of 870px. The navigation bar has basic accessibility options (ie, use tab and enter to make selections). An assumption was made that the time zone offset, which is used to calculate the time, would be part of the data.
