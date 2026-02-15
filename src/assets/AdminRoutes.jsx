import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  console.log("Admin auth:", auth);

  useEffect(() => {
    const checkAuth = () => {
      fetch("https://ecom-app-u73g.onrender.com/auth/adminauth", {
        headers: {
          authorization: auth?.token,
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
        .catch(() => setOk(false));
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : null;
}
