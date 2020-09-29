// import React, { useContext } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AuthContext } from "../context/auth";

// const AuthRoute = ({ component: Component, ...args }) => {
//   const { person } = useContext(AuthContext);
//   return (
//     <Route
//       {...args}
//       render={(props) =>
//         !person ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };
// export default AuthRoute;
