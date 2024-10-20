import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from './components/admin/SignIn';
import { SignUp } from './components/admin/SignUp';
import { ForgotPassword } from './components/admin/ForgotPassword';
import { PasswordReset } from './components/admin/PasswordReset';
import { LandingPage } from './components/admin/LandingPage'

import { SignInUser } from './components/user/SignInUser';
import { SignUpUser } from './components/user/SignUpUser';

import { AppbarUser } from './components/user/AppbarUser';
import { Appbar } from './components/admin/Appbar';

import { AddCourse } from './components/admin/AddCourse'
import { GetCourses } from './components/admin/GetCourses'
import { CourseDetails } from './components/admin/CourseDetails'

import { UserCourses } from './components/user/UserCourses'
// import { PurchasedCourse } from './components/PurchasedCourse';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { NotFound } from './components/admin/NotFound';

function App() {
  const location = useLocation()
  const isUserRoute = location.pathname.includes('/users/')
  return (
    <div style={{ width: "100vw", height: "auto", backgroundColor: "#eeeeee" }}>
      {isUserRoute ? <AppbarUser /> : <Appbar />}
      <Routes>
        {/* ADMIN */}
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='getcourse' element={<GetCourses />} />
        <Route path='getcourse/:courseId' element={<CourseDetails />} />
        <Route path='/addcourse' element={<AddCourse />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />

        {/* USER */}
        <Route path='users/courses' element={<UserCourses />} />
        <Route path="/users/signup" element={<SignUpUser />} />
        <Route path="/users/login" element={<SignInUser />} />
        {/* <Route path="/purchasedcourses" element={<PurchasedCourse />} /> */}
      </Routes>
    </div >
  );
}

export default function Main() {
  return (
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  );
}
