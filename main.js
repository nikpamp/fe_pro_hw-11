const itSchool = {
  name: "IT School",
  description: "IT Education",
  maxQtyOfStartedGroups: 10,
  maxQtyOfStudentsPerGroup: 15,

  availableCourses: ["Front-end Pro", "Front-end Basic", "Python Basic"],
  startedGroups: [],

  __callbacks: {},

  startLearningGroup(courseName, amountOfStudents, totalLessons) {
    if (this.availableCourses.includes(courseName)) {
      if (amountOfStudents <= this.maxQtyOfStudentsPerGroup) {
        if (!this.startedGroups.includes(courseName)) {
          if (totalLessons) {
            this.startedGroups.push({courseName, amountOfStudents, totalLessons, passedLessons: 0});
            this.dispatch("GROUP_STARTED", courseName);
          } else console.log(`Please enter number of total lessons.`);
        } else console.log(`Sorry, course ${courseName} is started.`);
      } else console.log(`Sorry, maximum number of students per group is ${this.maxQtyOfStudentsPerGroup}.`);
    } else console.log(`Sorry, course ${courseName} is unavailable.`);
  },

  endLearningGroup(courseName) {
    if (this.startedGroups.some((startedGroup) => startedGroup.courseName !== courseName)) {
      if (this.startedGroups.totalLessons = this.startedGroups.passedLessons) {
        this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
        this.dispatch("GROUP_ENDED", courseName);
      } else console.log(`You cannot finish this course until all lessons will be passed!`);
    } else console.log(`There is no such group in the list!`);
  },

  addCourse(courseName) {
    if (!this.availableCourses.includes(courseName)) {
      this.availableCourses.push(courseName);
      console.log(`Course ${courseName} has beeen added to the available courses!`);
    }
  },

  removeCourse(courseName) {
    if (this.availableCourses.includes(courseName)) {
      this.availableCourses = this.availableCourses.filter((removedName) => removedName !== courseName);
      console.log(`Course ${courseName} has been deleted from the available courses!`);
    }
  },

  doneLesson(courseName) {
    let course = this.startedGroups.find((startedGroup) => startedGroup.courseName === courseName);
      if (course) {
        course.passedLessons++;
      } else console.log(`The ${courseName} course is has not been started!`);
  },

  on(eventName, callback) {
    this.__callbacks[eventName] = callback;
  },

  dispatch(eventName, courseName) {
    if (this.__callbacks[eventName]) {
      this.__callbacks[eventName](courseName);
    }
  }
};

itSchool.on(
  "GROUP_STARTED",
  (courseName) => console.log(`О, стартовала новая группа по курсу ${courseName}!`),
);

itSchool.on(
  "GROUP_ENDED",
  (courseName) => console.log(`О, похоже группа по курсу ${courseName} закончила свое обучение!`),
);

// старт групп
itSchool.startLearningGroup("Front-end Pro", 10, 38);
itSchool.startLearningGroup("Front-end Basic", 13, 20);
itSchool.startLearningGroup("Python Basic", 6, 16);

// конец групп
itSchool.endLearningGroup("Front-end Basic");
itSchool.endLearningGroup("Python Basic");

// Добавление нового курса
itSchool.addCourse("Java Basic");

// Удаление курса
itSchool.removeCourse("Python Basic");

// Прохождение одного урока
itSchool.doneLesson("Front-end Basic");