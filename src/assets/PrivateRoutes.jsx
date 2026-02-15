import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const {auth} = useAuth();
  console.log("User auth:", auth);

  useEffect(() => {
    const checkAuth = () => {
      fetch("https://ecom-app-u73g.onrender.com/auth/userauth", {
        headers: {
          "authorization": auth?.token
        },
      })
        .then((res1) => {
          res1.json().then((res2) => {
            console.log(res2);
            if (res1.ok) {
              setOk(true);
            } else {
              setOk(false);
            }
          });
        })
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : null;
}
