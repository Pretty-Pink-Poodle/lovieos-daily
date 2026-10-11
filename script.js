const desktopNavButtons =
    document.querySelectorAll(".nav-button");

const mobileNavButtons =
    document.querySelectorAll(".mobile-nav-button");

const pages =
    document.querySelectorAll(".page");

const goToButtons =
    document.querySelectorAll("[data-go-to]");


const currentDateElement =
    document.getElementById("currentDate");

const greetingElement =
    document.getElementById("greeting");

const plannerModeDisplay =
    document.getElementById("plannerModeDisplay");

const profileButton =
    document.getElementById("profileButton");


const progressText =
    document.getElementById("progressText");

const dailyProgress =
    document.getElementById("dailyProgress");


const moodButtons =
    document.querySelectorAll(".mood-button");

const moodResult =
    document.getElementById("moodResult");


const quickNote =
    document.getElementById("quickNote");

const quickNoteStatus =
    document.getElementById("quickNoteStatus");

const mainNote =
    document.getElementById("mainNote");

const mainNoteStatus =
    document.getElementById("mainNoteStatus");


const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskDate =
    document.getElementById("taskDate");

const taskPriority =
    document.getElementById("taskPriority");

const taskCategory =
    document.getElementById("taskCategory");

const taskList =
    document.getElementById("taskList");

const taskEmptyState =
    document.getElementById("taskEmptyState");

const taskTotalCount =
    document.getElementById("taskTotalCount");

const taskOpenCount =
    document.getElementById("taskOpenCount");

const taskCompleteCount =
    document.getElementById("taskCompleteCount");

const taskFilterButtons =
    document.querySelectorAll(".task-filter");

const clearCompletedButton =
    document.getElementById("clearCompletedButton");

const todayPriorities =
    document.getElementById("todayPriorities");


const habitForm =
    document.getElementById("habitForm");

const habitEmoji =
    document.getElementById("habitEmoji");

const habitName =
    document.getElementById("habitName");

const habitCategory =
    document.getElementById("habitCategory");

const habitList =
    document.getElementById("habitList");

const habitEmptyState =
    document.getElementById("habitEmptyState");

const habitTotalCount =
    document.getElementById("habitTotalCount");

const habitDoneCount =
    document.getElementById("habitDoneCount");

const habitBestStreak =
    document.getElementById("habitBestStreak");

const habitPreviewList =
    document.getElementById("habitPreviewList");


const profileSettingsForm =
    document.getElementById("profileSettingsForm");

const displayNameInput =
    document.getElementById("displayNameInput");

const plannerModeInput =
    document.getElementById("plannerModeInput");

const greetingStyleSelect =
    document.getElementById("greetingStyleSelect");

const weekStartInputs =
    document.querySelectorAll(
        'input[name="weekStart"]'
    );

const themeCards =
    document.querySelectorAll(".theme-card");

const currentThemeName =
    document.getElementById("currentThemeName");

const currentSettingsSummary =
    document.getElementById(
        "currentSettingsSummary"
    );


/* ========================= */
/* SCHEDULE ELEMENTS */
/* ========================= */

const addScheduleButton =
    document.getElementById("addScheduleButton");

const scheduleList =
    document.getElementById("scheduleList");

const scheduleEmptyState =
    document.getElementById("scheduleEmptyState");

const scheduleCount =
    document.getElementById("scheduleCount");


const scheduleModal =
    document.getElementById("scheduleModal");

const scheduleModalBackdrop =
    document.getElementById(
        "scheduleModalBackdrop"
    );

const closeScheduleModalButton =
    document.getElementById(
        "closeScheduleModalButton"
    );

const cancelScheduleButton =
    document.getElementById(
        "cancelScheduleButton"
    );


const scheduleForm =
    document.getElementById("scheduleForm");

const scheduleEditId =
    document.getElementById("scheduleEditId");

const scheduleDate =
    document.getElementById("scheduleDate");

const scheduleTime =
    document.getElementById("scheduleTime");

const scheduleTitle =
    document.getElementById("scheduleTitle");

const scheduleNote =
    document.getElementById("scheduleNote");

const scheduleFormTitle =
    document.getElementById("scheduleFormTitle");

const saveScheduleButton =
    document.getElementById("saveScheduleButton");


/* ========================= */
/* STORAGE */
/* ========================= */

const STORAGE_KEYS = {
    tasks: "lovieOSDailyTasks",
    habits: "lovieOSDailyHabits",
    schedule: "lovieOSDailySchedule",
    mood: "lovieOSDailyMood",
    quickNote: "lovieOSDailyQuickNote",
    mainNote: "lovieOSDailyMainNote",
    settings: "lovieOSDailySettings"
};


const DEFAULT_SETTINGS = {
    displayName: "lovie",
    plannerMode: "soft productivity mode",
    greetingStyle: "automatic",
    weekStart: "monday",
    theme: "pink-dream"
};


let tasks =
    loadTasks();

let habits =
    loadHabits();

let scheduleItems =
    loadScheduleItems();

let settings =
    loadSettings();

let activeTaskFilter =
    "all";


/* ========================= */
/* SETTINGS STORAGE */
/* ========================= */

function loadSettings() {
    const savedSettings =
        localStorage.getItem(
            STORAGE_KEYS.settings
        );


    if (!savedSettings) {
        return {
            ...DEFAULT_SETTINGS
        };
    }


    try {
        const parsedSettings =
            JSON.parse(
                savedSettings
            );


        return {
            ...DEFAULT_SETTINGS,
            ...parsedSettings
        };
    } catch (error) {
        console.error(
            "Could not load settings:",
            error
        );


        return {
            ...DEFAULT_SETTINGS
        };
    }
}


function saveSettings() {
    localStorage.setItem(
        STORAGE_KEYS.settings,
        JSON.stringify(settings)
    );
}


/* ========================= */
/* DATE HELPERS */
/* ========================= */

function getDateString(date) {
    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;
}


function getTodayDateString() {
    return getDateString(
        new Date()
    );
}


function parseDateString(
    dateString
) {
    const [
        year,
        month,
        day
    ] =
        dateString
            .split("-")
            .map(Number);


    return new Date(
        year,
        month - 1,
        day
    );
}


function formatDate(
    dateString
) {
    if (!dateString) {
        return "no due date";
    }


    const date =
        parseDateString(
            dateString
        );


    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric"
        }
    ).format(date);
}


function formatScheduleTime(
    timeString
) {
    if (!timeString) {
        return "";
    }


    const [
        hours,
        minutes
    ] =
        timeString
            .split(":")
            .map(Number);


    const date =
        new Date();


    date.setHours(
        hours,
        minutes,
        0,
        0
    );


    return new Intl.DateTimeFormat(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(date);
}


function getCurrentWeekDates() {
    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const currentDay =
        today.getDay();


    let daysSinceStart;


    if (
        settings.weekStart ===
        "sunday"
    ) {
        daysSinceStart =
            currentDay;
    } else {
        daysSinceStart =
            currentDay === 0
                ? 6
                : currentDay - 1;
    }


    const weekStartDate =
        new Date(today);


    weekStartDate.setDate(
        today.getDate() -
        daysSinceStart
    );


    const dates = [];


    for (
        let index = 0;
        index < 7;
        index += 1
    ) {
        const date =
            new Date(
                weekStartDate
            );


        date.setDate(
            weekStartDate.getDate() +
            index
        );


        dates.push(date);
    }


    return dates;
}


function getWeekDayLabels() {
    if (
        settings.weekStart ===
        "sunday"
    ) {
        return [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
    }


    return [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];
}


/* ========================= */
/* GREETING + PROFILE */
/* ========================= */

function getTimeOfDay() {
    const hour =
        new Date().getHours();


    if (hour < 12) {
        return "morning";
    }


    if (hour < 17) {
        return "afternoon";
    }


    return "evening";
}


function updateDateAndGreeting() {
    const now =
        new Date();


    const formattedDate =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        ).format(now);


    currentDateElement.textContent =
        formattedDate;


    const timeOfDay =
        getTimeOfDay();


    const name =
        settings.displayName.trim() ||
        "lovie";


    let greeting;


    if (
        settings.greetingStyle ===
        "sweet"
    ) {
        greeting =
            `good ${timeOfDay}, pretty ${name} ♡`;
    } else if (
        settings.greetingStyle ===
        "simple"
    ) {
        greeting =
            `good ${timeOfDay}, ${name}`;
    } else {
        greeting =
            `good ${timeOfDay}, ${name} ♡`;
    }


    greetingElement.textContent =
        greeting;


    plannerModeDisplay.textContent =
        settings.plannerMode.trim() ||
        DEFAULT_SETTINGS.plannerMode;


    const initial =
        name
            .charAt(0)
            .toUpperCase();


    profileButton.textContent =
        initial || "L";
}


/* ========================= */
/* THEMES */
/* ========================= */

function getThemeLabel(
    themeName
) {
    const labels = {
        "pink-dream":
            "Pink Dream",

        "cheetah-girl":
            "Cheetah Girl",

        "night-routine":
            "Night Routine"
    };


    return (
        labels[themeName] ||
        "Pink Dream"
    );
}


function applyTheme() {
    document.body.dataset.theme =
        settings.theme;


    themeCards.forEach(
        (card) => {

            card.classList.toggle(
                "active",
                card.dataset.theme ===
                    settings.theme
            );
        }
    );


    currentThemeName.textContent =
        getThemeLabel(
            settings.theme
        );
}


function setTheme(
    themeName
) {
    settings.theme =
        themeName;


    saveSettings();

    applyTheme();

    updateSettingsSummary();
}


/* ========================= */
/* SETTINGS UI */
/* ========================= */

function populateSettingsForm() {
    displayNameInput.value =
        settings.displayName;

    plannerModeInput.value =
        settings.plannerMode;

    greetingStyleSelect.value =
        settings.greetingStyle;


    weekStartInputs.forEach(
        (input) => {

            input.checked =
                input.value ===
                settings.weekStart;
        }
    );
}


function updateSettingsSummary() {
    const greetingLabels = {
        automatic:
            "automatic greeting",

        sweet:
            "extra sweet greeting",

        simple:
            "simple greeting"
    };


    const weekLabel =
        settings.weekStart ===
        "sunday"
            ? "Sunday start"
            : "Monday start";


    currentSettingsSummary.textContent =
        `${
            greetingLabels[
                settings.greetingStyle
            ]
        } · ${weekLabel}`;
}


function applySettings() {
    applyTheme();

    populateSettingsForm();

    updateDateAndGreeting();

    updateSettingsSummary();
}


function saveProfileSettings(
    event
) {
    event.preventDefault();


    settings.displayName =
        displayNameInput
            .value
            .trim() ||
        DEFAULT_SETTINGS.displayName;


    settings.plannerMode =
        plannerModeInput
            .value
            .trim() ||
        DEFAULT_SETTINGS.plannerMode;


    settings.greetingStyle =
        greetingStyleSelect.value;


    saveSettings();

    applySettings();
}


profileSettingsForm.addEventListener(
    "submit",
    saveProfileSettings
);


weekStartInputs.forEach(
    (input) => {

        input.addEventListener(
            "change",
            () => {

                if (!input.checked) {
                    return;
                }


                settings.weekStart =
                    input.value;


                saveSettings();

                updateSettingsSummary();

                renderHabits();
            }
        );
    }
);


themeCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                setTheme(
                    card.dataset.theme
                );
            }
        );
    }
);


/* ========================= */
/* PAGE NAVIGATION */
/* ========================= */

function openPage(
    pageName
) {
    pages.forEach(
        (page) => {

            page.classList.remove(
                "active"
            );
        }
    );


    desktopNavButtons.forEach(
        (button) => {

            button.classList.remove(
                "active"
            );
        }
    );


    mobileNavButtons.forEach(
        (button) => {

            button.classList.remove(
                "active"
            );
        }
    );


    const selectedPage =
        document.getElementById(
            `${pageName}-page`
        );


    if (selectedPage) {
        selectedPage.classList.add(
            "active"
        );
    }


    const matchingDesktopButton =
        document.querySelector(
            `.nav-button[data-page="${pageName}"]`
        );


    const matchingMobileButton =
        document.querySelector(
            `.mobile-nav-button[data-page="${pageName}"]`
        );


    if (matchingDesktopButton) {
        matchingDesktopButton
            .classList
            .add("active");
    }


    if (matchingMobileButton) {
        matchingMobileButton
            .classList
            .add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


desktopNavButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.page
                );
            }
        );
    }
);


mobileNavButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.page
                );
            }
        );
    }
);


goToButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.goTo
                );
            }
        );
    }
);


/* ========================= */
/* SCHEDULE STORAGE */
/* ========================= */

function loadScheduleItems() {
    const savedSchedule =
        localStorage.getItem(
            STORAGE_KEYS.schedule
        );


    if (!savedSchedule) {
        return [];
    }


    try {
        const parsedSchedule =
            JSON.parse(
                savedSchedule
            );


        if (
            Array.isArray(
                parsedSchedule
            )
        ) {
            return parsedSchedule;
        }


        return [];
    } catch (error) {
        console.error(
            "Could not load schedule:",
            error
        );


        return [];
    }
}


function saveScheduleItems() {
    localStorage.setItem(
        STORAGE_KEYS.schedule,
        JSON.stringify(
            scheduleItems
        )
    );
}


/* ========================= */
/* SCHEDULE MODAL */
/* ========================= */

function resetScheduleForm() {
    scheduleForm.reset();

    scheduleEditId.value =
        "";

    scheduleDate.value =
        getTodayDateString();

    scheduleFormTitle.textContent =
        "add a little plan";

    saveScheduleButton.innerHTML =
        "<span>＋</span> save plan";
}


function openScheduleModal(
    item = null
) {
    resetScheduleForm();


    if (item) {
        scheduleEditId.value =
            item.id;

        scheduleDate.value =
            item.date;

        scheduleTime.value =
            item.time;

        scheduleTitle.value =
            item.title;

        scheduleNote.value =
            item.note || "";


        scheduleFormTitle.textContent =
            "edit your plan";

        saveScheduleButton.innerHTML =
            "<span>✓</span> save changes";
    }


    scheduleModal.classList.add(
        "open"
    );


    scheduleModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            if (item) {
                scheduleTitle.focus();
            } else {
                scheduleTime.focus();
            }
        },
        50
    );
}


function closeScheduleModal() {
    scheduleModal.classList.remove(
        "open"
    );


    scheduleModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    resetScheduleForm();
}


addScheduleButton.addEventListener(
    "click",
    () => {

        openScheduleModal();
    }
);


closeScheduleModalButton.addEventListener(
    "click",
    closeScheduleModal
);


cancelScheduleButton.addEventListener(
    "click",
    closeScheduleModal
);


scheduleModalBackdrop.addEventListener(
    "click",
    closeScheduleModal
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            scheduleModal.classList.contains(
                "open"
            )
        ) {
            closeScheduleModal();
        }
    }
);


/* ========================= */
/* SCHEDULE CREATION */
/* ========================= */

function createScheduleItem(
    date,
    time,
    title,
    note
) {
    return {
        id:
            `${Date.now()}-${Math.random()
                .toString(16)
                .slice(2)}`,

        date,
        time,
        title,
        note,

        createdAt:
            new Date()
                .toISOString()
    };
}


function saveScheduleForm(
    event
) {
    event.preventDefault();


    const date =
        scheduleDate.value;

    const time =
        scheduleTime.value;

    const title =
        scheduleTitle.value.trim();

    const note =
        scheduleNote.value.trim();

    const editId =
        scheduleEditId.value;


    if (
        !date ||
        !time ||
        !title
    ) {
        return;
    }


    if (editId) {
        scheduleItems =
            scheduleItems.map(
                (item) => {

                    if (
                        item.id ===
                        editId
                    ) {
                        return {
                            ...item,
                            date,
                            time,
                            title,
                            note
                        };
                    }


                    return item;
                }
            );
    } else {
        const newItem =
            createScheduleItem(
                date,
                time,
                title,
                note
            );


        scheduleItems.push(
            newItem
        );
    }


    saveScheduleItems();

    renderSchedule();

    closeScheduleModal();
}


scheduleForm.addEventListener(
    "submit",
    saveScheduleForm
);


/* ========================= */
/* SCHEDULE ACTIONS */
/* ========================= */

function editScheduleItem(
    itemId
) {
    const item =
        scheduleItems.find(
            (scheduleItem) =>
                scheduleItem.id ===
                itemId
        );


    if (!item) {
        return;
    }


    openScheduleModal(
        item
    );
}


function deleteScheduleItem(
    itemId
) {
    scheduleItems =
        scheduleItems.filter(
            (item) =>
                item.id !==
                itemId
        );


    saveScheduleItems();

    renderSchedule();
}


/* ========================= */
/* SCHEDULE RENDERING */
/* ========================= */

function getTodaysSchedule() {
    const today =
        getTodayDateString();


    return scheduleItems
        .filter(
            (item) =>
                item.date ===
                today
        )
        .sort(
            (a, b) =>
                a.time.localeCompare(
                    b.time
                )
        );
}


function renderSchedule() {
    scheduleList.innerHTML =
        "";


    const todaysSchedule =
        getTodaysSchedule();


    if (
        todaysSchedule.length ===
        0
    ) {
        scheduleEmptyState
            .classList
            .remove("hidden");


        scheduleCount.textContent =
            "nothing planned yet";


        return;
    }


    scheduleEmptyState
        .classList
        .add("hidden");


    scheduleCount.textContent =
        todaysSchedule.length === 1
            ? "1 little plan today"
            : `${todaysSchedule.length} little plans today`;


    todaysSchedule.forEach(
        (item) => {

            const scheduleItem =
                document.createElement(
                    "article"
                );


            scheduleItem.className =
                "schedule-item";


            const timePill =
                document.createElement(
                    "div"
                );


            timePill.className =
                "time-pill";

            timePill.textContent =
                formatScheduleTime(
                    item.time
                );


            const copy =
                document.createElement(
                    "div"
                );


            copy.className =
                "schedule-item-copy";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                item.title;


            copy.appendChild(
                title
            );


            if (item.note) {
                const note =
                    document.createElement(
                        "p"
                    );


                note.textContent =
                    item.note;


                copy.appendChild(
                    note
                );
            }


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "schedule-item-actions";


            const editButton =
                document.createElement(
                    "button"
                );


            editButton.type =
                "button";

            editButton.className =
                "schedule-action-button";

            editButton.setAttribute(
                "aria-label",
                `Edit ${item.title}`
            );

            editButton.textContent =
                "✎";


            editButton.addEventListener(
                "click",
                () => {

                    editScheduleItem(
                        item.id
                    );
                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";

            deleteButton.className =
                "schedule-action-button";

            deleteButton.setAttribute(
                "aria-label",
                `Delete ${item.title}`
            );

            deleteButton.textContent =
                "×";


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteScheduleItem(
                        item.id
                    );
                }
            );


            actions.append(
                editButton,
                deleteButton
            );


            scheduleItem.append(
                timePill,
                copy,
                actions
            );


            scheduleList.appendChild(
                scheduleItem
            );
        }
    );
}


/* ========================= */
/* TASK STORAGE */
/* ========================= */

function loadTasks() {
    const savedTasks =
        localStorage.getItem(
            STORAGE_KEYS.tasks
        );


    if (!savedTasks) {
        return [];
    }


    try {
        const parsedTasks =
            JSON.parse(
                savedTasks
            );


        if (
            Array.isArray(
                parsedTasks
            )
        ) {
            return parsedTasks;
        }


        return [];
    } catch (error) {
        console.error(
            "Could not load saved tasks:",
            error
        );


        return [];
    }
}


function saveTasks() {
    localStorage.setItem(
        STORAGE_KEYS.tasks,
        JSON.stringify(tasks)
    );
}


/* ========================= */
/* TASK CREATION */
/* ========================= */

function createTask(
    title,
    date,
    priority,
    category
) {
    return {
        id:
            `${Date.now()}-${Math.random()
                .toString(16)
                .slice(2)}`,

        title,
        date,
        priority,
        category,

        completed:
            false,

        createdAt:
            new Date()
                .toISOString()
    };
}


function addTask(
    event
) {
    event.preventDefault();


    const title =
        taskTitle.value.trim();

    const date =
        taskDate.value;

    const priority =
        taskPriority.value;

    const category =
        taskCategory.value;


    if (!title) {
        taskTitle.focus();
        return;
    }


    const newTask =
        createTask(
            title,
            date,
            priority,
            category
        );


    tasks.unshift(
        newTask
    );


    saveTasks();


    taskForm.reset();

    taskPriority.value =
        "medium";

    taskCategory.value =
        "personal";


    renderAll();

    taskTitle.focus();
}


/* ========================= */
/* TASK ACTIONS */
/* ========================= */

function toggleTask(
    taskId
) {
    tasks =
        tasks.map(
            (task) => {

                if (
                    task.id ===
                    taskId
                ) {
                    return {
                        ...task,

                        completed:
                            !task.completed
                    };
                }


                return task;
            }
        );


    saveTasks();

    renderAll();
}


function deleteTask(
    taskId
) {
    tasks =
        tasks.filter(
            (task) =>
                task.id !==
                taskId
        );


    saveTasks();

    renderAll();
}


function editTask(
    taskId
) {
    const task =
        tasks.find(
            (item) =>
                item.id ===
                taskId
        );


    if (!task) {
        return;
    }


    const newTitle =
        window.prompt(
            "edit task",
            task.title
        );


    if (
        newTitle === null
    ) {
        return;
    }


    const cleanedTitle =
        newTitle.trim();


    if (!cleanedTitle) {
        return;
    }


    tasks =
        tasks.map(
            (item) => {

                if (
                    item.id ===
                    taskId
                ) {
                    return {
                        ...item,

                        title:
                            cleanedTitle
                    };
                }


                return item;
            }
        );


    saveTasks();

    renderAll();
}


function clearCompletedTasks() {
    const hasCompletedTasks =
        tasks.some(
            (task) =>
                task.completed
        );


    if (!hasCompletedTasks) {
        return;
    }


    tasks =
        tasks.filter(
            (task) =>
                !task.completed
        );


    saveTasks();

    renderAll();
}


/* ========================= */
/* TASK FILTERS */
/* ========================= */

function taskMatchesFilter(
    task
) {
    const today =
        getTodayDateString();


    if (
        activeTaskFilter ===
        "all"
    ) {
        return true;
    }


    if (
        activeTaskFilter ===
        "today"
    ) {
        return (
            task.date ===
            today
        );
    }


    if (
        activeTaskFilter ===
        "upcoming"
    ) {
        return (
            task.date &&
            task.date > today &&
            !task.completed
        );
    }


    if (
        activeTaskFilter ===
        "completed"
    ) {
        return task.completed;
    }


    return true;
}


function getFilteredTasks() {
    return tasks.filter(
        taskMatchesFilter
    );
}


/* ========================= */
/* TASK RENDERING */
/* ========================= */

function renderTasks() {
    taskList.innerHTML =
        "";


    const filteredTasks =
        getFilteredTasks();


    if (
        filteredTasks.length ===
        0
    ) {
        taskEmptyState
            .classList
            .remove("hidden");


        return;
    }


    taskEmptyState
        .classList
        .add("hidden");


    filteredTasks.forEach(
        (task) => {

            const taskItem =
                document.createElement(
                    "article"
                );


            taskItem.className =
                "task-item";


            if (task.completed) {
                taskItem.classList.add(
                    "completed"
                );
            }


            const completeButton =
                document.createElement(
                    "button"
                );


            completeButton.type =
                "button";

            completeButton.className =
                "task-complete-button";


            completeButton.setAttribute(
                "aria-label",
                task.completed
                    ? "Mark task incomplete"
                    : "Mark task complete"
            );


            completeButton.textContent =
                task.completed
                    ? "✓"
                    : "";


            completeButton.addEventListener(
                "click",
                () => {

                    toggleTask(
                        task.id
                    );
                }
            );


            const taskMain =
                document.createElement(
                    "div"
                );


            taskMain.className =
                "task-main";


            const title =
                document.createElement(
                    "strong"
                );


            title.className =
                "task-title";

            title.textContent =
                task.title;


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "task-meta";


            const categoryPill =
                document.createElement(
                    "span"
                );


            categoryPill.className =
                "task-meta-pill";

            categoryPill.textContent =
                task.category;


            const priorityPill =
                document.createElement(
                    "span"
                );


            priorityPill.className =
                `task-meta-pill ${task.priority}`;

            priorityPill.textContent =
                `${task.priority} priority`;


            const datePill =
                document.createElement(
                    "span"
                );


            datePill.className =
                "task-meta-pill";

            datePill.textContent =
                formatDate(
                    task.date
                );


            meta.append(
                categoryPill,
                priorityPill,
                datePill
            );


            taskMain.append(
                title,
                meta
            );


            const taskActions =
                document.createElement(
                    "div"
                );


            taskActions.className =
                "task-actions";


            const editButton =
                document.createElement(
                    "button"
                );


            editButton.type =
                "button";

            editButton.className =
                "task-action-button";

            editButton.setAttribute(
                "aria-label",
                "Edit task"
            );

            editButton.textContent =
                "✎";


            editButton.addEventListener(
                "click",
                () => {

                    editTask(
                        task.id
                    );
                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";

            deleteButton.className =
                "task-action-button";

            deleteButton.setAttribute(
                "aria-label",
                "Delete task"
            );

            deleteButton.textContent =
                "×";


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteTask(
                        task.id
                    );
                }
            );


            taskActions.append(
                editButton,
                deleteButton
            );


            taskItem.append(
                completeButton,
                taskMain,
                taskActions
            );


            taskList.appendChild(
                taskItem
            );
        }
    );
}


function updateTaskStats() {
    const total =
        tasks.length;


    const completed =
        tasks.filter(
            (task) =>
                task.completed
        ).length;


    const open =
        total -
        completed;


    taskTotalCount.textContent =
        total;

    taskOpenCount.textContent =
        open;

    taskCompleteCount.textContent =
        completed;
}


/* ========================= */
/* DASHBOARD TASKS */
/* ========================= */

function renderDashboardPriorities() {
    todayPriorities.innerHTML =
        "";


    const incompleteTasks =
        tasks.filter(
            (task) =>
                !task.completed
        );


    const priorityWeight = {
        high: 3,
        medium: 2,
        low: 1
    };


    const sortedTasks =
        [...incompleteTasks]
            .sort(
                (a, b) => {

                    const priorityDifference =
                        priorityWeight[
                            b.priority
                        ] -
                        priorityWeight[
                            a.priority
                        ];


                    if (
                        priorityDifference !==
                        0
                    ) {
                        return (
                            priorityDifference
                        );
                    }


                    if (
                        a.date &&
                        b.date
                    ) {
                        return (
                            a.date.localeCompare(
                                b.date
                            )
                        );
                    }


                    if (a.date) {
                        return -1;
                    }


                    if (b.date) {
                        return 1;
                    }


                    return (
                        new Date(
                            a.createdAt
                        ) -
                        new Date(
                            b.createdAt
                        )
                    );
                }
            )
            .slice(
                0,
                3
            );


    if (
        sortedTasks.length ===
        0
    ) {
        const emptyState =
            document.createElement(
                "div"
            );


        emptyState.className =
            "dashboard-empty-state";


        emptyState.innerHTML = `
            <span>♡</span>

            <p>
                add some tasks and your
                priorities will show up here.
            </p>
        `;


        todayPriorities.appendChild(
            emptyState
        );


        return;
    }


    sortedTasks.forEach(
        (task) => {

            const label =
                document.createElement(
                    "label"
                );


            label.className =
                "priority-item";


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";

            checkbox.className =
                "priority-check";

            checkbox.checked =
                task.completed;


            const customCheck =
                document.createElement(
                    "span"
                );


            customCheck.className =
                "custom-check";


            const text =
                document.createElement(
                    "span"
                );


            text.className =
                "priority-text";

            text.textContent =
                task.title;


            checkbox.addEventListener(
                "change",
                () => {

                    toggleTask(
                        task.id
                    );
                }
            );


            label.append(
                checkbox,
                customCheck,
                text
            );


            todayPriorities.appendChild(
                label
            );
        }
    );
}


/* ========================= */
/* HABIT STORAGE */
/* ========================= */

function loadHabits() {
    const savedHabits =
        localStorage.getItem(
            STORAGE_KEYS.habits
        );


    if (!savedHabits) {
        return [];
    }


    try {
        const parsedHabits =
            JSON.parse(
                savedHabits
            );


        if (
            Array.isArray(
                parsedHabits
            )
        ) {
            return parsedHabits.map(
                (habit) => ({
                    ...habit,

                    completions:
                        Array.isArray(
                            habit.completions
                        )
                            ? habit.completions
                            : []
                })
            );
        }


        return [];
    } catch (error) {
        console.error(
            "Could not load saved habits:",
            error
        );


        return [];
    }
}


function saveHabits() {
    localStorage.setItem(
        STORAGE_KEYS.habits,
        JSON.stringify(habits)
    );
}


/* ========================= */
/* HABIT CREATION */
/* ========================= */

function createHabit(
    name,
    emoji,
    category
) {
    return {
        id:
            `${Date.now()}-${Math.random()
                .toString(16)
                .slice(2)}`,

        name,
        emoji,
        category,

        completions:
            [],

        createdAt:
            new Date()
                .toISOString()
    };
}


function addHabit(
    event
) {
    event.preventDefault();


    const name =
        habitName.value.trim();

    const emoji =
        habitEmoji.value.trim() ||
        "♡";

    const category =
        habitCategory.value;


    if (!name) {
        habitName.focus();
        return;
    }


    const newHabit =
        createHabit(
            name,
            emoji,
            category
        );


    habits.unshift(
        newHabit
    );


    saveHabits();


    habitForm.reset();

    habitEmoji.value =
        "♡";

    habitCategory.value =
        "wellness";


    renderAll();

    habitName.focus();
}


/* ========================= */
/* HABIT ACTIONS */
/* ========================= */

function toggleHabitDate(
    habitId,
    dateString
) {
    habits =
        habits.map(
            (habit) => {

                if (
                    habit.id !==
                    habitId
                ) {
                    return habit;
                }


                const completions =
                    [
                        ...habit.completions
                    ];


                const existingIndex =
                    completions.indexOf(
                        dateString
                    );


                if (
                    existingIndex >=
                    0
                ) {
                    completions.splice(
                        existingIndex,
                        1
                    );
                } else {
                    completions.push(
                        dateString
                    );
                }


                completions.sort();


                return {
                    ...habit,
                    completions
                };
            }
        );


    saveHabits();

    renderAll();
}


function toggleHabitToday(
    habitId
) {
    toggleHabitDate(
        habitId,
        getTodayDateString()
    );
}


function deleteHabit(
    habitId
) {
    habits =
        habits.filter(
            (habit) =>
                habit.id !==
                habitId
        );


    saveHabits();

    renderAll();
}


/* ========================= */
/* HABIT STREAK */
/* ========================= */

function calculateHabitStreak(
    habit
) {
    if (
        habit.completions.length ===
        0
    ) {
        return 0;
    }


    const completionSet =
        new Set(
            habit.completions
        );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    let checkingDate =
        new Date(today);


    const todayString =
        getDateString(
            checkingDate
        );


    if (
        !completionSet.has(
            todayString
        )
    ) {
        checkingDate.setDate(
            checkingDate.getDate() -
            1
        );
    }


    let streak =
        0;


    while (true) {
        const dateString =
            getDateString(
                checkingDate
            );


        if (
            !completionSet.has(
                dateString
            )
        ) {
            break;
        }


        streak += 1;


        checkingDate.setDate(
            checkingDate.getDate() -
            1
        );
    }


    return streak;
}


/* ========================= */
/* HABIT RENDERING */
/* ========================= */

function renderHabits() {
    habitList.innerHTML =
        "";


    if (
        habits.length ===
        0
    ) {
        habitEmptyState
            .classList
            .remove("hidden");


        return;
    }


    habitEmptyState
        .classList
        .add("hidden");


    const weekDates =
        getCurrentWeekDates();


    const dayLabels =
        getWeekDayLabels();


    const todayString =
        getTodayDateString();


    habits.forEach(
        (habit) => {

            const habitCard =
                document.createElement(
                    "article"
                );


            habitCard.className =
                "habit-card";


            const cardTop =
                document.createElement(
                    "div"
                );


            cardTop.className =
                "habit-card-top";


            const habitIdentity =
                document.createElement(
                    "div"
                );


            habitIdentity.className =
                "habit-identity";


            const emojiBox =
                document.createElement(
                    "div"
                );


            emojiBox.className =
                "habit-emoji";

            emojiBox.textContent =
                habit.emoji;


            const nameWrap =
                document.createElement(
                    "div"
                );


            nameWrap.className =
                "habit-name-wrap";


            const name =
                document.createElement(
                    "strong"
                );


            name.className =
                "habit-name";

            name.textContent =
                habit.name;


            const category =
                document.createElement(
                    "span"
                );


            category.className =
                "habit-category";

            category.textContent =
                habit.category;


            nameWrap.append(
                name,
                category
            );


            habitIdentity.append(
                emojiBox,
                nameWrap
            );


            const habitActions =
                document.createElement(
                    "div"
                );


            habitActions.className =
                "habit-card-actions";


            const todayDone =
                habit.completions.includes(
                    todayString
                );


            const todayButton =
                document.createElement(
                    "button"
                );


            todayButton.type =
                "button";

            todayButton.className =
                "habit-today-button";


            if (todayDone) {
                todayButton.classList.add(
                    "completed"
                );
            }


            todayButton.textContent =
                todayDone
                    ? "✓ done today"
                    : "check in";


            todayButton.addEventListener(
                "click",
                () => {

                    toggleHabitToday(
                        habit.id
                    );
                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";

            deleteButton.className =
                "habit-delete-button";


            deleteButton.setAttribute(
                "aria-label",
                `Delete ${habit.name}`
            );


            deleteButton.textContent =
                "×";


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteHabit(
                        habit.id
                    );
                }
            );


            habitActions.append(
                todayButton,
                deleteButton
            );


            cardTop.append(
                habitIdentity,
                habitActions
            );


            const cardMiddle =
                document.createElement(
                    "div"
                );


            cardMiddle.className =
                "habit-card-middle";


            const weekTracker =
                document.createElement(
                    "div"
                );


            weekTracker.className =
                "week-tracker";


            let completedThisWeek =
                0;


            weekDates.forEach(
                (date, index) => {

                    const dateString =
                        getDateString(
                            date
                        );


                    const isCompleted =
                        habit.completions.includes(
                            dateString
                        );


                    const isToday =
                        dateString ===
                        todayString;


                    if (isCompleted) {
                        completedThisWeek +=
                            1;
                    }


                    const dayButton =
                        document.createElement(
                            "button"
                        );


                    dayButton.type =
                        "button";

                    dayButton.className =
                        "week-day";


                    if (isCompleted) {
                        dayButton.classList.add(
                            "completed"
                        );
                    }


                    if (isToday) {
                        dayButton.classList.add(
                            "today"
                        );
                    }


                    const label =
                        document.createElement(
                            "span"
                        );


                    label.className =
                        "week-day-label";

                    label.textContent =
                        dayLabels[index];


                    const circle =
                        document.createElement(
                            "span"
                        );


                    circle.className =
                        "week-day-circle";

                    circle.textContent =
                        isCompleted
                            ? "✓"
                            : date.getDate();


                    dayButton.setAttribute(
                        "aria-label",
                        `${dayLabels[index]} ${
                            isCompleted
                                ? "completed"
                                : "not completed"
                        }`
                    );


                    const isFuture =
                        dateString >
                        todayString;


                    if (isFuture) {
                        dayButton.disabled =
                            true;

                        dayButton.style.opacity =
                            "0.45";

                        dayButton.style.cursor =
                            "default";
                    } else {
                        dayButton.addEventListener(
                            "click",
                            () => {

                                toggleHabitDate(
                                    habit.id,
                                    dateString
                                );
                            }
                        );
                    }


                    dayButton.append(
                        label,
                        circle
                    );


                    weekTracker.appendChild(
                        dayButton
                    );
                }
            );


            const streak =
                calculateHabitStreak(
                    habit
                );


            const streakBox =
                document.createElement(
                    "div"
                );


            streakBox.className =
                "habit-streak-box";


            const streakNumber =
                document.createElement(
                    "strong"
                );


            streakNumber.textContent =
                streak;


            const streakLabel =
                document.createElement(
                    "span"
                );


            streakLabel.textContent =
                "day streak";


            streakBox.append(
                streakNumber,
                streakLabel
            );


            cardMiddle.append(
                weekTracker,
                streakBox
            );


            const progressLine =
                document.createElement(
                    "div"
                );


            progressLine.className =
                "habit-progress-line";


            const progressCopy =
                document.createElement(
                    "div"
                );


            progressCopy.className =
                "habit-progress-copy";


            const progressLabel =
                document.createElement(
                    "span"
                );


            progressLabel.textContent =
                "weekly progress";


            const progressNumber =
                document.createElement(
                    "strong"
                );


            progressNumber.textContent =
                `${completedThisWeek} of 7`;


            progressCopy.append(
                progressLabel,
                progressNumber
            );


            const progressTrack =
                document.createElement(
                    "div"
                );


            progressTrack.className =
                "habit-progress-track";


            const progressFill =
                document.createElement(
                    "div"
                );


            progressFill.className =
                "habit-progress-fill";


            const percentage =
                Math.round(
                    (
                        completedThisWeek /
                        7
                    ) *
                    100
                );


            progressFill.style.width =
                `${percentage}%`;


            progressTrack.appendChild(
                progressFill
            );


            progressLine.append(
                progressCopy,
                progressTrack
            );


            habitCard.append(
                cardTop,
                cardMiddle,
                progressLine
            );


            habitList.appendChild(
                habitCard
            );
        }
    );
}


/* ========================= */
/* HABIT STATS */
/* ========================= */

function updateHabitStats() {
    const today =
        getTodayDateString();


    const completedToday =
        habits.filter(
            (habit) =>
                habit.completions.includes(
                    today
                )
        ).length;


    const streaks =
        habits.map(
            calculateHabitStreak
        );


    const bestStreak =
        streaks.length > 0
            ? Math.max(
                ...streaks
            )
            : 0;


    habitTotalCount.textContent =
        habits.length;

    habitDoneCount.textContent =
        completedToday;

    habitBestStreak.textContent =
        bestStreak;
}


/* ========================= */
/* DASHBOARD HABITS */
/* ========================= */

function renderHabitPreview() {
    habitPreviewList.innerHTML =
        "";


    if (
        habits.length ===
        0
    ) {
        const emptyState =
            document.createElement(
                "div"
            );


        emptyState.className =
            "dashboard-empty-state";


        emptyState.innerHTML = `
            <span>✿</span>

            <p>
                your habits will show up here
                once you add them.
            </p>
        `;


        habitPreviewList.appendChild(
            emptyState
        );


        return;
    }


    const today =
        getTodayDateString();


    habits
        .slice(
            0,
            3
        )
        .forEach(
            (habit) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "habit-row";


                const label =
                    document.createElement(
                        "span"
                    );


                label.textContent =
                    `${habit.emoji} ${habit.name}`;


                const status =
                    document.createElement(
                        "span"
                    );


                status.className =
                    "habit-status";


                const completed =
                    habit.completions.includes(
                        today
                    );


                if (completed) {
                    status.classList.add(
                        "done"
                    );

                    status.textContent =
                        "done";
                } else {
                    status.textContent =
                        "later";
                }


                row.append(
                    label,
                    status
                );


                habitPreviewList.appendChild(
                    row
                );
            }
        );
}


/* ========================= */
/* DAILY PROGRESS */
/* ========================= */

function updateDailyProgress() {
    const today =
        getTodayDateString();


    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(
            (task) =>
                task.completed
        ).length;


    const totalHabits =
        habits.length;


    const completedHabits =
        habits.filter(
            (habit) =>
                habit.completions.includes(
                    today
                )
        ).length;


    const totalItems =
        totalTasks +
        totalHabits;


    const completedItems =
        completedTasks +
        completedHabits;


    if (
        totalItems ===
        0
    ) {
        progressText.textContent =
            "0 of 0 complete";

        dailyProgress.style.width =
            "0%";


        return;
    }


    const percentage =
        Math.round(
            (
                completedItems /
                totalItems
            ) *
            100
        );


    progressText.textContent =
        `${completedItems} of ${totalItems} complete`;


    dailyProgress.style.width =
        `${percentage}%`;
}


/* ========================= */
/* TASK EVENTS */
/* ========================= */

taskForm.addEventListener(
    "submit",
    addTask
);


taskFilterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                taskFilterButtons.forEach(
                    (filterButton) => {

                        filterButton
                            .classList
                            .remove(
                                "active"
                            );
                    }
                );


                button.classList.add(
                    "active"
                );


                activeTaskFilter =
                    button.dataset.filter;


                renderTasks();
            }
        );
    }
);


clearCompletedButton.addEventListener(
    "click",
    clearCompletedTasks
);


/* ========================= */
/* HABIT EVENT */
/* ========================= */

habitForm.addEventListener(
    "submit",
    addHabit
);


/* ========================= */
/* MOOD */
/* ========================= */

function loadMood() {
    const savedMood =
        localStorage.getItem(
            STORAGE_KEYS.mood
        );


    if (!savedMood) {
        return;
    }


    const matchingButton =
        document.querySelector(
            `.mood-button[data-mood="${savedMood}"]`
        );


    if (matchingButton) {
        selectMood(
            matchingButton,
            false
        );
    }
}


function selectMood(
    button,
    shouldSave = true
) {
    moodButtons.forEach(
        (moodButton) => {

            moodButton
                .classList
                .remove(
                    "selected"
                );
        }
    );


    button.classList.add(
        "selected"
    );


    const mood =
        button.dataset.mood;


    const messages = {
        sleepy:
            "sleepy girl mode activated 😴 take it easy today.",

        okay:
            "okay is perfectly acceptable ♡",

        cute:
            "as you SHOULD feel 🥰",

        focused:
            "locked in, but still adorable 🤓",

        "over-it":
            "understood. minimal effort only 🙄"
    };


    moodResult.textContent =
        messages[mood] ||
        "mood saved ♡";


    if (shouldSave) {
        localStorage.setItem(
            STORAGE_KEYS.mood,
            mood
        );
    }
}


moodButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                selectMood(
                    button
                );
            }
        );
    }
);


/* ========================= */
/* NOTES */
/* ========================= */

function loadSavedNotes() {
    const savedQuickNote =
        localStorage.getItem(
            STORAGE_KEYS.quickNote
        );


    const savedMainNote =
        localStorage.getItem(
            STORAGE_KEYS.mainNote
        );


    if (
        savedQuickNote !==
        null
    ) {
        quickNote.value =
            savedQuickNote;
    }


    if (
        savedMainNote !==
        null
    ) {
        mainNote.value =
            savedMainNote;
    }
}


let quickNoteTimer;


quickNote.addEventListener(
    "input",
    () => {

        quickNoteStatus.textContent =
            "saving...";


        clearTimeout(
            quickNoteTimer
        );


        quickNoteTimer =
            setTimeout(
                () => {

                    localStorage.setItem(
                        STORAGE_KEYS.quickNote,
                        quickNote.value
                    );


                    quickNoteStatus.textContent =
                        "saved automatically ♡";

                },
                350
            );
    }
);


let mainNoteTimer;


mainNote.addEventListener(
    "input",
    () => {

        mainNoteStatus.textContent =
            "saving...";


        clearTimeout(
            mainNoteTimer
        );


        mainNoteTimer =
            setTimeout(
                () => {

                    localStorage.setItem(
                        STORAGE_KEYS.mainNote,
                        mainNote.value
                    );


                    mainNoteStatus.textContent =
                        "saved automatically ♡";

                },
                350
            );
    }
);


/* ========================= */
/* MASTER RENDER */
/* ========================= */

function renderAll() {
    renderSchedule();


    renderTasks();

    updateTaskStats();

    renderDashboardPriorities();


    renderHabits();

    updateHabitStats();

    renderHabitPreview();


    updateDailyProgress();
}


/* ========================= */
/* INITIALIZE LOVIEOS */
/* ========================= */

applySettings();

loadSavedNotes();

loadMood();

resetScheduleForm();

renderAll();


/* ========================= */
/* SERVICE WORKER */
/* ========================= */

if ("serviceWorker" in navigator) {
    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )
                .then(
                    (registration) => {

                        console.log(
                            "LovieOS service worker registered:",
                            registration.scope
                        );
                    }
                )
                .catch(
                    (error) => {

                        console.error(
                            "LovieOS service worker registration failed:",
                            error
                        );
                    }
                );
        }
    );
}