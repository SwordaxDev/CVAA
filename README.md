# ViewCB

**Collegeboard Video Assignment Automator
V1.1.0**

<img alt="ViewCB Logo" src="/docs/viewcb-logo.png" width="200">

## About

ViewCB is an automating tool built to watch collegeboard AP classes video assignments,
the tool is built by Swordax using JavaScript scripting language.

**Repo: https://github.com/SwordaxSy/ViewCB**<br>
_Script code is valid as of May 2022, collegeboard site (https://www.collegeboard.org)_

ViewCB when ran in the console, automates running the video assignments on
collegeboard AP courses, and makes sure all the assigned videos are completed max speed.

## Mechanism

-   Finds the oldest un-completed video assignment in the assignments list
-   Selects the assignment and sets the video speed to x2
-   Plays the video when loaded
-   As video ends, selects the next un-completed video assignment and triggers it
-   As videos complete, ViewCB keeps logging updates in the page devtools console
-   When all assigned videos are automatically triggered and completed on max speed, ViewCB ends task

## Advantages

-   Assignments completion automation
-   Max speed performance
-   Simplicity of use
-   Instant action logger
-   Free to use & open source

## How to use

1.  Open collegeboard AP classroom assignments page
2.  Open the devtools by `right click` -> `inspect` or by pressing the `f12` key
3.  Select the console tab in the devtools
4.  Paste the following code in the console

```js
fetch("https://raw.githubusercontent.com/SwordaxSy/ViewCB/main/index.js")
    .then((res) => res.text())
    .then((data) => eval(data));
```

5.  Press Enter
6.  Leave the window opened and have fun till all assignments are completed :)<br><br>
    ![implementation example](/docs/implementation-example.png)

## Handle Errors

You might occasionally face some errors and unexpected actions, such as the
program not running properly or the videos not playing. Something you could do
that might sometimes fix such issues is refreshing the page and trying again.

The program might not run properly if the collegeboard assignments looked
something like this:
<br><br>
![invalid example 1](/docs/invalid-example-1.png)
![invalid example 2](/docs/invalid-example-2.png)
<br><br>
Try resizing the browser window or use a device with a larger screen then refresh your
window, if your assignments now look like this, then you are good to go!
<br><br>
![valid example](/docs/valid-example.png)
<br><br>
**_Please note that fixing this issue will be a priority update for future versions of the software_**

## Report Bugs

If you encountered any bug while using the program (other than the issues mentioned
in the handle errors section) then don't hesitate to report them to me directly by messaging
me on discord, find me as Swordax#5756
<br><br>[<img alt="Discord Logo" src="/docs/discord-logo.png" width="100">](https://discord.com/users/465453058667839499/)<br><br>
