import {
  REDUX_USER,
  REDUX_DEPARTMENT,
  REDUX_INSTITUTE,
  REDUX_GRADE_YEAR,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_PAGE_HELPERS,
  REDUX_COURSE,
  REDUX_ACTIVE_COURSE,
  REDUX_POST,
  REDUX_HELP,
  REDUX_SAVED_POSTS,
  REDUX_ALL_COURSES,
  REDUX_COURSE_STUDENTS,
  REDUX_BLOCK_DATA,
  REDUX_IS_LOGED,
  REDUX_ASSIGNMENTS,
  REDUX_SOLVERS,
  REDUX_STUDENT_ASSIGNMENT,
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_RECENT_ASSIGNMENTS,
  REDUX_CLEAR,
} from "../CONSTANTS";

const initState = {
  isLogged: false,
  pageLoaders: {},
  pageHelpers: { page: 1 },
  pageErrors: {},
  userDetails: {},
  instituteArr: [],
  coursesArr: [],
  allCoursesArr: [],
  courseStudentsArr: [],
  postArr: { data: [], hasMore: true },
  savedPostsArr: { data: [], hasMore: true },
  departmentArr: [],
  gradeYearArr: [],
  activeCourse: {},
  activeAssignment: {},
  helpArr: [],
  blockData: {},
  assignmentsArr: { hasMore: true, data: [] },
  recentAssignmentsArr: [],
  solversArr: { hasMore: true, data: [] },
  assignmentData: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case REDUX_IS_LOGED:
      return {
        ...state,
        isLogged: action.value,
      };
    case REDUX_PAGE_LOADERS:
      return {
        ...state,
        pageLoaders: { ...state.pageLoaders, ...action.value },
      };

    case REDUX_PAGE_ERRORS:
      return {
        ...state,
        pageErrors: { ...state.pageErrors, ...action.value },
      };

    case REDUX_PAGE_HELPERS:
      return {
        ...state,
        pageHelpers: { ...state.pageHelpers, ...action.value },
      };

    case REDUX_USER:
      return {
        ...state,
        userDetails: action.value,
      };

    case REDUX_DEPARTMENT:
      return {
        ...state,
        departmentArr: action.value,
      };

    case REDUX_INSTITUTE:
      return {
        ...state,
        instituteArr: action.value,
      };

    case REDUX_GRADE_YEAR:
      return {
        ...state,
        gradeYearArr: action.value,
      };

    case REDUX_COURSE:
      return {
        ...state,
        coursesArr: action.value,
      };

    case REDUX_ACTIVE_COURSE:
      return {
        ...state,
        activeCourse: { ...action.value },
      };

    case REDUX_POST:
      return {
        ...state,
        postArr: action.value,
      };

    case REDUX_SAVED_POSTS:
      return {
        ...state,
        savedPostsArr: action.value,
      };

    case REDUX_HELP:
      return {
        ...state,
        helpArr: action.value,
      };

    case REDUX_ALL_COURSES:
      return {
        ...state,
        allCoursesArr: action.value,
      };
    case REDUX_COURSE_STUDENTS:
      return {
        ...state,
        courseStudentsArr: action.value,
      };
    case REDUX_BLOCK_DATA:
      return {
        ...state,
        blockData: action.value,
      };
    case REDUX_ASSIGNMENTS:
      return {
        ...state,
        assignmentsArr: action.value,
      };
    case REDUX_SOLVERS:
      return {
        ...state,
        solversArr: action.value,
      };
    case REDUX_ACTIVE_ASSIGNMENT:
      return {
        ...state,
        activeAssignment: action.value,
      };
    case REDUX_RECENT_ASSIGNMENTS:
      return {
        ...state,
        recentAssignmentsArr: action.value,
      };
    case REDUX_CLEAR:
      return {
        ...initState,
      };

    default:
      return { ...state };
  }
};
