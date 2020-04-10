import {
  REDUX_USER,
  REDUX_DEPARTMENT,
  REDUX_INSTITUTE,
  REDUX_GRADE_YEAR,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_PAGE_HELPERS
} from "../CONSTANTS";

const initState = {
  pageLoaders: {},
  pageHelpers: {},
  pageErrors: {},
  userDetails: {},
  instituteArr: [],
  departmentArr: [],
  gradeYearArr: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case REDUX_PAGE_LOADERS:
      return {
        ...state,
        pageLoaders: { ...state.pageLoaders, ...action.value }
      };

    case REDUX_PAGE_ERRORS:
      return {
        ...state,
        pageErrors: { ...state.pageErrors, ...action.value }
      };

    case REDUX_PAGE_HELPERS:
      return {
        ...state,
        pageHelpers: { ...state.pageHelpers, ...action.value }
      };

    case REDUX_USER:
      return {
        ...state,
        userDetails: action.value
      };

    case REDUX_DEPARTMENT:
      return {
        ...state,
        departmentArr: action.value
      };

    case REDUX_INSTITUTE:
      return {
        ...state,
        instituteArr: action.value
      };

    case REDUX_GRADE_YEAR:
      return {
        ...state,
        gradeYearArr: action.value
      };

    default:
      return { ...state };
  }
};
