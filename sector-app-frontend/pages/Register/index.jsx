import React, { useEffect } from "react";
import { Form, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";

// Material UI Components
import { TextField } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";

const rules = [{ required: true, message: "This field is required" }];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "green",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: "600px", // Reduced width
    height: "540px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "15px",
            fontFamily: "Montserrat, sans-serif",
            color: "black",
          }}
        >
          Sector-App <span style={{ color: "#757575" }}>REGISTER FORM</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          {/* Name Field */}
          <Form.Item label="Name" name="name" rules={rules}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <AccountCircle style={{ color: "#757575" }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your name"
                size="small"
              />
            </div>
          </Form.Item>

          {/* Email Field */}
          <Form.Item label="Email" name="email" rules={rules}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Email style={{ color: "#757575" }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                size="small"
              />
            </div>
          </Form.Item>

          {/* Password Field */}
          <Form.Item label="Password" name="password" rules={rules}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Lock style={{ color: "#757575" }} />
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                size="small"
              />
            </div>
          </Form.Item>

          {/* Register Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              marginTop: "10px",
              backgroundColor: "green",
              color: "white",
              padding: "8px",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Register
          </Button>

          {/* Login Link */}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <span style={{ color: "#757575" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#2196F3",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                LOGIN
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
