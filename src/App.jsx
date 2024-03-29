import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageCode from "./components/Code/PageCode";
import PageLogin from "./components/Login/PageLogin";
import PageRegsiter from "./components/Register/PageRegsiter";
import PageDoctorAssignment from "./components/DoctorAssignment/PageDoctorAssignment";
import PageStudentAssignment from "./components/StudentAssignment/PageStudentAssignment";
import PageHome from "./components/Home/PageHome";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import PageSpinner from "./components/Loaders/PageSpinner";
import checkToken from "./store/actions/checkToken";
import AddHelp from "./components/Modals/AddHelp/AddHelp";
import PageSavedPosts from "./components/SavedPosts/PageSavedPosts";
import PageProfile from "./components/Profile/PageProfile";
import getCourse from "./store/actions/getCourse";
import getRecentAssignments from "./store/actions/getRecentAssignments";
import socketIOClient from "socket.io-client";
import {
  CDN,
  REDUX_SOCKET,
  REDUX_NOTIFICATION,
  REDUX_POST,
  REDUX_COURSE,
} from "./store/CONSTANTS";
import BlockUnblock from "./components/Modals/BlockUnblock/BlockUnblock";
import ShowHelp from "./components/Modals/ShowHelp/ShowHelp";
import AboutUs from "./components/Modals/AboutUs/AboutUs";
import getAllCourses from "./store/actions/getAllCourses";

function App({}) {
  const {
    pageLoaders,
    userDetails,
    isLogged,
    postArr,
    pageHelpers,
    coursesArr,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect((_) => {
    document
      .getElementById("main-styles")
      .setAttribute("href", "styles/indexLTR.css");

    dispatch(getAllCourses());

    if (isLogged) {
      dispatch(checkToken());
    }
  }, []);

  useEffect(() => {
    if (isLogged && userDetails.token) {
      dispatch(getCourse());
    }
  }, [isLogged, userDetails.code]);

  useEffect(() => {
    const socket = socketIOClient(CDN);

    socket.on("NOTIFICATION", (data) => {
      dispatch({ type: REDUX_NOTIFICATION, value: data });
    });

    // socket.on("USER_BLOCKING", (data) => {
    //   if (userDetails.code === data.student_code) {
    //     let newCourses = coursesArr.map((item) => {
    //       if (item.code === data.course_code) {
    //         item.is_blocked = data.is_blocked;
    //       }
    //       console.log(item);
    //       return item;
    //     });
    //     dispatch({ type: REDUX_COURSE, value: { ...newCourses } });
    //   }
    // });

    socket.on("COMMENT_ADD", (data) => {
      if (postArr.data.length >= 1) {
        let newData = postArr.data.map((item) => {
          if (item.id == data.post_id) {
            item.comments_count = parseInt(item.comments_count) + 1;
            if (item.comments) item.comments = [data, ...item.comments];
          }
          return item;
        });
        dispatch({ type: REDUX_POST, value: { ...postArr, data: newData } });
      }
    });
    socket.on("COMMENT_REMOVE", (data) => {
      if (postArr.data.length >= 1) {
        let newData = postArr.data.map((item) => {
          if (item.id == data.post_id) {
            item.comments_count = parseInt(item.comments_count) - 1;
            if (item.comments)
              item.comments = item.comments.filter((i) => i.id != data.id);
          }
          return item;
        });
        dispatch({ type: REDUX_POST, value: { ...postArr, data: newData } });
      }
    });
    dispatch({ type: REDUX_SOCKET, value: socket });
    return (_) => {
      socket.disconnect();
    };
  }, [postArr]);

  return (
    <>
      {(pageLoaders.getDepartment ||
        pageLoaders.getGradeYear ||
        pageLoaders.getSearch ||
        pageLoaders.getAllCourses ||
        pageLoaders.checkToken ||
        pageLoaders.getRecentAssignments ||
        pageLoaders.getCourse ||
        pageLoaders.logout ||
        pageLoaders.getInstitute) && <PageSpinner />}
      <ToastContainer />
      <Switch>
        {!isLogged && <Route exact path="/code" component={PageCode} />}

        {!isLogged && <Route exact path="/login/:id" component={PageLogin} />}

        {!isLogged && (
          <Route exact path="/register/student" component={PageRegsiter} />
        )}

        {isLogged && userDetails.role_type !== "student" && (
          <Route exact path="/assignments" component={PageDoctorAssignment} />
        )}

        {isLogged && userDetails.role_type === "student" && (
          <Route exact path="/assignments" component={PageStudentAssignment} />
        )}
        {isLogged && <Route exact path="/profile" component={PageProfile} />}

        {isLogged && <Route exact path="/" component={PageHome} />}
        {isLogged && (
          <Route exact path="/saved-posts" component={PageSavedPosts} />
        )}

        {!isLogged && <Redirect from="*" to="/code" />}
        {isLogged && <Redirect from="*" to="/" />}
        <Route path="*" />
      </Switch>
      <AddHelp />
      <BlockUnblock />
      <AboutUs />
      {pageHelpers.helpItem && <ShowHelp />}
    </>
  );
}

export default App;
