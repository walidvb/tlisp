import React from 'react'
import routes from '../frontend/routes';

const SignIn = () => {
  const onClick = () => {
    var src = routes.web.user.signin
    window.open(src, 'shareWindow', 'height=700, width=850, top=' + Math.max(window.outerHeight / 2 - 325, 0) + ', left=' + Math.max(window.outerWidth / 2 - 425, 0) + ', toolbar=0, location=0, menubar=no, directories=0, scrollbars=0');
  }
  return <div onClick={onClick}>SignUp</div>
}

export default SignIn