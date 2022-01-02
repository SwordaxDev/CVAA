(() => {
  /*
			CVAA (Collegeboard Video Assignment Automater)
			Written by Swordax
			- my website: https://swordax.netlify.app/
			- my github: https://github.com/SwordaxDev/
			- my discord: https://discord.com/users/465453058667839499/
	*/

  // code valid as of Jan 2022 collegeboard site (collegeboard.org)

  // variables
  const lessonsTitles = document.querySelectorAll(
    ".StudentAssignments .assignment_title"
  );
  const intervalTime = 300;
  let oldestBranch = lessons = null;

  // get current time and format it (hh:mm)
  function gimmeTime() {
    let timeNow = new Date();
    let hourNow = timeNow.getHours(),
      minuteNow = timeNow.getMinutes();
    let gimmeHour = () => {
      if (hourNow == 0) return 12;
      else if (hourNow > 12) return hourNow - 12;
      else return hourNow;
    };
    let gimmeMinute = () => {
      if (minuteNow.toString().length == 1) return `0${minuteNow}`;
      else return minuteNow;
    };
    let gimmeNoon = () => {
      if (hourNow > 11) return "PM";
      else return "AM";
    };
    return `${gimmeHour()}:${gimmeMinute()} ${gimmeNoon()}`;
  }

  // get oldest un-finished assignment
  const gimmeLesson = (state) => {
    let oldestChapter = (oldestLesson = latestChapter = latestLesson = null);
    lessons = [];
    // get all lesson identifications/names
    lessonsTitles.forEach((title) => {
      if (!title.innerText.includes("Daily Video")) return false;
      let lessonName = title.innerText;
      let lessonNum = lessonName.split(":")[0];
      let lessonBranch = lessonName.split(":")[1].replace(" Daily Video ", "");
      lessons.push([lessonNum, lessonBranch]);
    });
    // get oldest and latest chapter
    lessons.forEach((lesson) => {
      let chapNum = parseInt(lesson[0].split(".")[0]);
      if (!oldestChapter || chapNum < oldestChapter) oldestChapter = chapNum;
      if (!latestChapter || chapNum > latestChapter) latestChapter = chapNum;
    });
    // get oldest and latest lesson
    lessons.forEach((lesson) => {
      let lessonNum = parseInt(lesson[0].split(".")[1]);
      if (lesson[0].split(".")[0] == oldestChapter) {
        if (!oldestLesson || lessonNum < oldestLesson) oldestLesson = lessonNum;
      } else if (lesson[0].split(".")[0] == latestChapter) {
        if (!latestLesson || lessonNum > latestLesson) latestLesson = lessonNum;
      }
    });
    // get oldest branch
    lessons.forEach((lesson) => {
      if (lesson[0] == `${oldestChapter}.${oldestLesson}`) {
        if (!oldestBranch || lesson[1] < oldestBranch) oldestBranch = lesson[1];
      }
    });
    // return latest/oldest un-finished video assignment identification/name
    if (state == "latest") return `${latestChapter}.${latestLesson}`;
    else if (state == "oldest") return `${oldestChapter}.${oldestLesson}`;
    else return console.log("CVAA ERROR: gimmeLesson() state is undefined");
  };

  // open oldest video assignment
  lessonsTitles.forEach((title) => {
    let oldestLessonTitle = gimmeLesson("oldest");
    if (
      title.innerText.split(":")[0] == oldestLessonTitle &&
      title.innerText.includes("Daily Video")
    ) {
      title.click();
      // trigger video
      triggerVideo(oldestLessonTitle, oldestBranch);
    }
  });

  // open next video assignment
	let incBy = 1;
  function openNext() {
    // get indexes and next video
    let currentIndex = document
      .querySelector(".is-selected")
      .getAttribute("data-index");
    let nextIndex = parseInt(currentIndex) + incBy;
    let nextVideo = document.querySelector(`button[data-index="${nextIndex}"]`);
    if (nextVideo) {
      // get lesson names sauses
      let nextVideoFullTitle =
        nextVideo.querySelector(".ft-video-title").innerText;
      let nextVideoBranch = nextVideoFullTitle
        .split(":")[1]
        .replace(" Daily Video ", "");
      let nextVideoTitle = nextVideoFullTitle.split(":")[0].split("."),
        latestVideoTitle = gimmeLesson("latest").split(".");
      // parse destructured sauses
      let nextVideoChapter = parseInt(nextVideoTitle[0]),
        nextVideoLesson = parseInt(nextVideoTitle[1]),
        latestVideoChapter = parseInt(latestVideoTitle[0]),
        latestVideoLesson = parseInt(latestVideoTitle[1]);
      // check if next video passed the latest assigned video
      if (
        nextVideoChapter > latestVideoChapter ||
        (nextVideoChapter == latestVideoChapter &&
          nextVideoLesson > latestVideoLesson)
      ) {
        console.log(
          `%cCVAA: Congrats! all video assignments are completed at ${gimmeTime()}`,
          "font-size:20px;color:lime;"
        );
      } else {
				// check if video required
				let videoRequired = lessons.some(el => el[0] == `${nextVideoChapter}.${nextVideoLesson}`);
				if (!videoRequired) {
					incBy++;
					return openNext();
				} else {
					incBy = 1;
				}
        nextVideo.click();
        // check if next video is selected yet
        let checkVideo = setInterval(() => {
          if (nextVideo.classList.contains("is-selected")) {
            clearInterval(checkVideo);
            // trigger next video
            triggerVideo(
              `${nextVideoChapter}.${nextVideoLesson}`,
              nextVideoBranch
            );
          }
        }, intervalTime);
      }
    } else {
      // if next video was not found, print error
      console.log(
        "%cCVAA ERROR: next video not found :(",
        "font-size:20px;color:crimson;"
      );
    }
  }

  // trigger video function
  function triggerVideo(lessonTitle = "unknown", lessonBranch = "unknown") {
    // open video settings
    let settingsOpener = setInterval(() => {
      let settingsBtn = document.querySelector("[title='Show settings menu']");
      if (settingsBtn) {
        clearInterval(settingsOpener);
        settingsBtn.click();
        // set video speed to x2
        let speedClicker = setInterval(() => {
          let speedBtn = document.querySelector("[for='2x']");
          if (speedBtn) {
            clearInterval(speedClicker);
            speedBtn.click();
            // play current video
            document.querySelector("[title='Play Video']").click();
						// check if video finished
						let videoGetter = setInterval(() => {
							let videoEl = document.querySelector("[aria-label='Video']");
							if (videoEl) {
								clearInterval(videoGetter);
								videoEl.onended = () => {
									console.log(
										`%cCVAA: Lesson ${lessonTitle} Daily Video ${lessonBranch} is successfully completed at ${gimmeTime()}!`,
										"font-size:20px;color:lime"
									);
									// open the next video assignment
									openNext();
								};
							}
						}, intervalTime);
          }
        }, intervalTime);
      }
    }, intervalTime);
  }

  // as program runs, log success message
  console.log(
    `%cCVAA software running successfully at ${gimmeTime()}`,
    "font-size:20px;color:lime;"
  );
})();

/*
	** TODO
	- change the method that checks if the video is required to make it able to check video branches too {
		plan is to save the listed required videos in lessons array as the following format : chapter.lesson.branch instead of the 
		current format : [chapter.lesson, branch]
		that will enable us from checking for the exact branch existance in the required videos list.
	}
*/