import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "stream-browserify";
// Import your components for routing
import LoginPage from "./pages/Login/Login";
import Teacherlogin from "./pages/teacherlogin/teacherlogin";
import Teacherhome from "./pages/teacherhome/teacherhome";
import Teachervideos from "./pages/teachervideos/teachervideos";
import Teacherregister from "./pages/teacherregister/teacherregister";
import Studentlogin from "./pages/studentlogin/studentlogin";
import Teacherprofile from "./pages/teacherprofile/teacherprofile";
import Studentregister from "./pages/studentregister/studentregister";
import Studenthome from "./pages/studenthome/studenthome";
import AddTimestampPage from "./pages/AddTimestampPage/AddTimestampPage";
import ContentDisplay from "./pages/AddTimestampPage/ContentDisplay";
import Studentvideos from "./pages/studentvideos/studentvideos";
import Contactcontact from "./pages/contactus/contactus";
import AboutAboutus from "./pages/aboutus/aboutus";
import Chatboxchatbox from "./pages/chatbox/chatbox";
import Teacherchatbox from "./pages/teacherchatbox/teacherchatbox";
import Studentprofile from "./pages/studentprofile/studentprofile";
import TeacherstampPage from "./pages/teacherAddTimestampPage/AddTimestampPage";
import Chatstudent from "./pages/chatstudent/chatstudent";
import Chatteacher from "./pages/chatteacher/chatteacher";
import Forgotpassword from "./pages/forgotpassword/forgotpassword";
import Teaforgotpassword from "./pages/teaforgotpassword/teaforgotpassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />{" "}
        <Route path="/contactuss" element={<Contactcontact />} />{" "}
        <Route path="/aboutus" element={<AboutAboutus />} />{" "}
        <Route path="/profile" element={<Studentprofile />} />{" "}
        <Route path="/chatbox" element={<Chatboxchatbox />} />{" "}
        <Route path="/teacherlogin" element={<Teacherlogin />} />{" "}
        <Route path="/teacherhome" element={<Teacherhome />} />{" "}
        <Route path="/teachervideos" element={<Teachervideos />} />{" "}
        <Route path="/teacherstamp/:index" element={<TeacherstampPage />} />{" "}
        <Route path="/teacherregister" element={<Teacherregister />} />{" "}
        <Route path="/teacherchatbox" element={<Teacherchatbox />} />{" "}
        <Route path="/chatteacher" element={<Chatteacher />} />{" "}
        <Route path="/studentlogin" element={<Studentlogin />} />{" "}
        <Route path="/forgotpassword" element={<Forgotpassword />} />{" "}
        <Route path="/teaforgotpassword" element={<Teaforgotpassword />} />{" "}
        <Route path="/teacherprofile" element={<Teacherprofile />} />{" "}
        <Route path="/studentregister" element={<Studentregister />} />{" "}
        <Route path="/studenthome" element={<Studenthome />} />{" "}
        <Route path="/chatstudent" element={<Chatstudent />} />{" "}
        <Route path="/addtimestamp/:index" element={<AddTimestampPage />} />{" "}
        <Route path="/studentvideos" element={<Studentvideos />} />{" "}
        <Route exact path="/contentdisplay/:index" component={ContentDisplay} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
