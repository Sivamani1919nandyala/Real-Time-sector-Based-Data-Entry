import React, { useEffect, useCallback } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { AccountCircle, Logout } from "@mui/icons-material"; // Material UI Icons

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate User Token
  const validateToken = useCallback(async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [validateToken, navigate]);

  return (
    user && (
      <div style={{ width: "100%", height: "120vh", backgroundColor: "lightgreen" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#2c3e50",
            padding: "15px 30px",
            color: "white",
          }}
        >
          <h1
            style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Real-Time Data Entry
          </h1>

          {/* User Info & Logout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              backgroundColor: "white",
              padding: "8px 15px",
              borderRadius: "8px",
            }}
          >
            {/* User Icon (Material UI) */}
            <AccountCircle style={{ fontSize: "28px", color: "#3498db" }} />

            {/* Username */}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#e74c3c")}
              onMouseLeave={(e) => (e.target.style.color = "black")}
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>

            {/* Logout Icon (Material UI) */}
            <Logout
              style={{
                fontSize: "28px",
                color: "#e74c3c",
                cursor: "pointer",
                marginLeft: "20px",
                transition: "transform 0.2s ease-in-out, color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#c0392b")}
              onMouseLeave={(e) => (e.target.style.color = "#e74c3c")}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
