# CVAA
**Collegeboard Video Assignment Automator
V1.0.0**

## About
CVAA (collegeboard Video Assignment Automator) is a free open source software 
developed by Swordax, the software is written using JavaScript and is hosted on 
github.

**Repo: https://github.com/SwordaxDev/CVAA**
*Software code valid as of Jan 2022, collegeboard site (collegeboard.org)*

CVAA when ran in the console automates running the video assignments on 
collegeboard AP courses, and makes sure all the assigned videos are completed.

## Mechanism

 - Finds the oldest un-completed video assignment in the assignments list
 - Selects the assignment and sets the video speed to x2
 - Runs the video when loaded
 - As video ends, selects the next un-completed video assignment and triggers it
 - As videos complete, CVAA keeps logging updates in the page devtools console
 - When all assigned videos are automatically triggered and completed on max speed, CVAA ends task

## Features

 - Assignments completion automation
 - Max speed performance
 - Simplicity of use
 - Instant action logger
 - Free to use & open source

## How to use

 1. Open collegeboard AP classroom assignments page
 2. Open the devtools by `right click` > `inspect` or by pressing the `f12` key
 3. Select the console tab in the devtools
 4. Paste the following code in the console
```js
	fetch("https://raw.githubusercontent.com/SwordaxDev/CVAA/main/index.js")
	.then(res => res.text())
	.then(data => eval(data));
```
 5. Press Enter
 6. Have fun till all assignments are completed :)<br><br>
![implementation example](/docs/implementation-example.png)

## Handle Errors
You might occasionally face some errors and unexpected actions, such as the 
software not running properly or the videos not running. Something you could do 
that might sometimes fix such issues is refreshing the page and trying again.

The software might not run properly if the collegeboard assignments looked 
something like this:
<br><br>
![invalid example 1](/docs/invalid-example-1.png)
![invalid example 2](/docs/invalid-example-2.png)
<br><br>
Try resizing the browser window or use a larger device screen then refresh your 
window, if your assignments now look like this, then you are good to go!
<br><br>
![valid example](/docs/valid-example.png)
<br><br>
***Please note that fixing this issue will be a priority update for future versions of the software***
