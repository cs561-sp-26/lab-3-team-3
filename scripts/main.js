/*************************************************************************
 * File: main.js
 * Definitions of variables to maintain app state and provide
 * convenient access to frequently used DOM elements.
 *************************************************************************/
let GlobalHistoryLogging = true;
let GlobalDialogClose = null;

/************************************/
/* MODE TAB VARIABLES               */
/************************************/
//Array of mode names
const GlobalModeNumbersToModes = new Map([
  [0, "ACTIVITY_FEED"],
  [1, "ROUNDS"],
  [2, "COURSES"],
  [3, "BUDDIES"]
]);
const GlobalModeNumbersToRoutes = new Map([
  [0, "/activityfeed"],
  [1, "/rounds"],
  [2, "/courses"],
  [3, "/buddies"]
]);
const GlobalModeDialogNumbersToRoutes = new Map([
  [0, "/activityfeed/newpost"],
  [1, "/rounds/newround"],
  [2, "/courses/addcourse"],
  [3, "/buddies/findbuddy"]
]);
//The current mode (0, 1, 2, or 3)
const GlobalCurrentMode = (() => {
    let _currentMode= 0
    const Store = {
        get: () => _currentMode,
        set: val => (_currentMode = val)
    }
    return Object.freeze(Store)
})()

const GlobalFocusedMode = (() => {
    let _focusedMode= 0
    const Store = {
        get: () => _focusedMode,
        set: val => (_focusedMode = val)
    }
    return Object.freeze(Store)
})()

//Array of mode tab button elements:
const GlobalModeTabButtons = 
  document.querySelectorAll("button[role='tab']");
//Array of mode tab panel elements:
const GlobalModeTabPanels = 
  document.querySelectorAll("div[role='tabpanel']");