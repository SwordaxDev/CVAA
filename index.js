(() => {
    /**
     * ViewCB (Collegeboard Video Assignment Automator)
     * Developed by Swordax
     *      - my website:   https://swordax.netlify.app
     *      - my discord:   (Swordax#5756): https://discord.com/users/465453058667839499/
     *      - my github:    https://github.com/SwordaxSy
     *
     * Project Github Repo:             https://github.com/SwordaxSy/ViewCB
     * Current Code Production Date:    30 May, 2022
     */

    // code valid as of June 2022 collegeboard site (collegeboard.org)

    // variables
    const VIEWCB_VERSION = "1.1.1";
    const lessonsTitles = [
        ...document.querySelectorAll(".StudentAssignments .assignment_title"),
    ];
    const intervalTime = 500;
    let oldestBranch = (latestBranch = lessons = null);

    // gimmeStyle Provider Function
    const gimmeStyle = (color, size = 20) => {
        return `font-size:${size}px;color:${color};`;
    };

    // get current time and format it (hh:mm)
    function gimmeTime() {
        const timeNow = new Date();
        const hourNow = timeNow.getHours();
        const minuteNow = timeNow.getMinutes();

        const gimmeHour = () => {
            if (hourNow == 0) return 12;
            else if (hourNow > 12) return hourNow - 12;
            else return hourNow;
        };

        const gimmeMinute = () => {
            if (minuteNow.toString().length == 1) return `0${minuteNow}`;
            else return minuteNow;
        };

        const gimmeNoon = () => {
            if (hourNow > 11) return "PM";
            else return "AM";
        };

        return `${gimmeHour()}:${gimmeMinute()} ${gimmeNoon()}`;
    }

    // crop lesson
    function gimmeCropped(lesson) {
        return {
            title: lesson.substring(0, lesson.lastIndexOf(".")),
            branch: lesson.substring(lesson.lastIndexOf(".") + 1),
        };
    }

    // check if video is playing
    function isPlaying() {
        const videoEl = document.querySelector(".w-video-wrapper video");
        if (!videoEl) return false;

        return !!(
            videoEl.currentTime > 0 &&
            !videoEl.paused &&
            !videoEl.ended &&
            videoEl.readyState > 2
        );
    }

    // get assignments names and branches
    const gimmeLesson = (state) => {
        let oldestChapter =
            (oldestLesson =
            latestChapter =
            latestLesson =
                null);
        lessons = [];

        // get all lesson identifications/names
        lessonsTitles.forEach((title) => {
            if (!title.innerText.includes("Daily Video")) return false;

            const lessonName = title.innerText;
            const lessonNum = lessonName.split(":")[0];
            const lessonBranch = lessonName
                .split(":")[1]
                .replace(" Daily Video ", "");

            lessons.push(`${lessonNum}.${lessonBranch}`);
        });

        // get oldest and latest chapter
        lessons.forEach((lesson) => {
            const croppedLesson = gimmeCropped(lesson).title.split(".");
            const chapNum = parseInt(croppedLesson[0]);

            if (!oldestChapter || chapNum < oldestChapter)
                oldestChapter = chapNum;

            if (!latestChapter || chapNum > latestChapter)
                latestChapter = chapNum;
        });

        // get oldest and latest lesson
        lessons.forEach((lesson) => {
            const croppedLesson = gimmeCropped(lesson).title.split(".");
            const chapNum = croppedLesson[0];
            const lessonNum = parseInt(croppedLesson[1]);

            if (chapNum == oldestChapter) {
                if (!oldestLesson || lessonNum < oldestLesson)
                    oldestLesson = lessonNum;
            } else if (chapNum == latestChapter) {
                if (!latestLesson || lessonNum > latestLesson)
                    latestLesson = lessonNum;
            }
        });

        // get oldest and latest branch
        lessons.forEach((lesson) => {
            const { title, branch } = gimmeCropped(lesson);

            if (title == `${oldestChapter}.${oldestLesson}`) {
                if (!oldestBranch || branch < oldestBranch)
                    oldestBranch = branch;
            } else if (title == `${latestChapter}.${latestLesson}`) {
                if (!latestBranch || branch > latestBranch)
                    latestBranch = branch;
            }
        });

        // return latest/oldest un-finished video assignment identification/name
        if (state == "latest") {
            return `${latestChapter}.${latestLesson}`;
        } else if (state == "oldest") {
            return `${oldestChapter}.${oldestLesson}`;
        } else {
            return console.log(
                "%cViewCB ERROR: gimmeLesson() state is undefined",
                gimmeStyle("crimson")
            );
        }
    };

    // as program runs, log success message
    console.log(
        `%cViewCB script version ${VIEWCB_VERSION} running successfully at ${gimmeTime()}`,
        gimmeStyle("lime")
    );
    console.log(
        "%cViewCB script developed by Swordax#5756\n%cGithub: https://github.com/SwordaxSy/\n%cProgram Repo: https://github.com/SwordaxSy/ViewCB",
        gimmeStyle("#17c0eb"),
        gimmeStyle("#17c0eb", 14),
        gimmeStyle("#17c0eb", 14)
    );

    // check if no videos are assigned
    let assignmentsFound = false;
    lessonsTitles.forEach((title) => {
        if (title.innerText.includes("Daily Video")) assignmentsFound = true;
    });

    if (!assignmentsFound) {
        return console.log(
            "%cViewCB: No video assignments found",
            gimmeStyle("yellow")
        );
    }

    // open oldest video assignment
    const oldestLessonTitle = gimmeLesson("oldest");
    const firstTitle = lessonsTitles.find((title) => {
        return (
            title.innerText.split(":")[0] == oldestLessonTitle &&
            title.innerText.includes("Daily Video")
        );
    });
    firstTitle.click();
    triggerVideo(oldestLessonTitle, oldestBranch);

    // open next video assignment
    let incBy = 1;
    function openNext() {
        // get indexes and next video
        const currentIndex = document
            .querySelector(".is-selected")
            .getAttribute("data-index");
        const nextIndex = parseInt(currentIndex) + incBy;
        const nextVideo = document.querySelector(
            `button[data-index="${nextIndex}"]`
        );

        if (nextVideo) {
            // get lesson names sauses
            const nextVideoFullTitle =
                nextVideo.querySelector(".ft-video-title").innerText;
            const nextVideoBranch = parseInt(
                    nextVideoFullTitle
                        .split(":")[1]
                        .replace(" Daily Video ", "")
                ),
                nextVideoTitle = nextVideoFullTitle.split(":")[0].split("."),
                latestVideoTitle = gimmeLesson("latest").split(".");

            // parse destructured sauses
            const nextVideoChapter = parseInt(nextVideoTitle[0]);
            const nextVideoLesson = parseInt(nextVideoTitle[1]);
            const latestVideoChapter = parseInt(latestVideoTitle[0]);
            const latestVideoLesson = parseInt(latestVideoTitle[1]);

            // check if next video passed the latest assigned video
            if (
                nextVideoChapter > latestVideoChapter ||
                (nextVideoChapter == latestVideoChapter &&
                    nextVideoLesson > latestVideoLesson) ||
                (nextVideoChapter == latestVideoChapter &&
                    nextVideoLesson == latestVideoLesson &&
                    nextVideoBranch > latestBranch)
            ) {
                console.log(
                    `%cViewCB: Congrats! all video assignments are completed at ${gimmeTime()}`,
                    gimmeStyle("lime")
                );
            } else {
                // check if video required
                const videoRequired = lessons.some(
                    (el) =>
                        el ==
                        `${nextVideoChapter}.${nextVideoLesson}.${nextVideoBranch}`
                );

                if (!videoRequired) {
                    incBy++;
                    return openNext();
                } else {
                    incBy = 1;
                }

                nextVideo.click();

                // check if next video is selected yet
                const checkVideo = setInterval(() => {
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
                "%cViewCB ERROR: next video not found :(",
                gimmeStyle("crimson")
            );
        }
    }

    // trigger video function
    function triggerVideo(lessonTitle = "unknown", lessonBranch = "unknown") {
        // open video settings
        const settingsGetter = setInterval(() => {
            const settingsBtn = document.querySelector(
                "[title='Show settings menu']"
            );
            if (settingsBtn) {
                clearInterval(settingsGetter);
                settingsBtn.click();

                // set video speed to x2
                const speedGetter = setInterval(() => {
                    const speedBtn = document.querySelector("[for='2x']");

                    if (speedBtn) {
                        clearInterval(speedGetter);
                        speedBtn.click();

                        // play current video
                        const playBtnGetter = setInterval(() => {
                            const playBtn =
                                document.querySelector(".w-big-play-button");

                            if (playBtn) {
                                clearInterval(playBtnGetter);

                                // check if video finished
                                const videoGetter = setInterval(() => {
                                    const videoEl = document.querySelector(
                                        ".w-video-wrapper video"
                                    );

                                    if (videoEl) {
                                        clearInterval(videoGetter);

                                        // make sure video is playing
                                        const videoPlayer = setInterval(() => {
                                            videoEl.play();
                                            if (!isPlaying()) {
                                                const playButton =
                                                    document.querySelector(
                                                        ".w-big-play-button"
                                                    );

                                                if (playButton) {
                                                    playButton.click();
                                                }
                                            }
                                        }, intervalTime);

                                        videoEl.addEventListener(
                                            "ended",
                                            () => {
                                                console.log(
                                                    `%cViewCB: Lesson ${lessonTitle} Daily Video ${lessonBranch} is successfully completed at ${gimmeTime()}!`,
                                                    gimmeStyle("lime")
                                                );
                                                clearInterval(videoPlayer);
                                                // open the next video assignment
                                                openNext();
                                            }
                                        );
                                    }
                                }, intervalTime);
                            }
                        }, intervalTime);
                    }
                }, intervalTime);
            }
        }, intervalTime);
    }
})();
