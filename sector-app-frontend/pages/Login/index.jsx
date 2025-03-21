// import React,{useEffect} from "react";
// import { Form, Input, Button, Divider, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { LoginUser } from "../../utils/api";
// import { setLoader } from "../../redux/loaderSlice";
// import { useDispatch } from "react-redux";

// const rules = [
//   {
//     required: true,
//     message: "This field is required",
//   },
// ];

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onFinish = async (values) => {
//     try {
//       dispatch(setLoader(true))
//       const response = await LoginUser(values);
//       dispatch(setLoader(false))
//       if (response.success) {
//         message.success(response.message);
//         localStorage.setItem("token", response.data);
//         navigate("/"); // Navigate to home
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       dispatch(setLoader(false))
//       message.error(error.message);
//     }
//   };
//   useEffect(()=>{
//     if (localStorage.getItem("token")){
//       navigate("/")
//     }
//   },[navigate])

//   return (
//     <div
//       className="h-screen flex justify-center items-center p-15"
//       style={{ backgroundColor: "green" }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[450px] h-[420px]">
//         <h1
//           className="text-center text-2xl font-semibold mb-6"
//           style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}
//         >
//           Sector-App <span className="text-gray-600">LOGIN FORM</span>
//         </h1>
//         <Divider />
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item label="Email" name="email" rules={rules}>
//             <Input placeholder="Email" className="p-3 border border-gray-250 rounded-lg" />
//           </Form.Item>
//           <Form.Item label="Password" name="password" rules={rules}>
//             <Input
//               type="password"
//               placeholder="Password"
//               className="p-2 border border-gray-300 rounded-lg"
//             />
//           </Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             block
//             className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-sm"
//           >
//             Login
//           </Button>
//           <div className="mt-3 text-center">
//             <span className="text-gray-500">
//               Don&apos;t have an account?{" "}
//               <Link className="text-primary font-semibold" to="/register">
//                 Register
//               </Link>
//             </span>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useEffect } from "react";
import { Form, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../utils/api";
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

// Material UI Components
import { TextField } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const rules = [{ required: true, message: "This field is required" }];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/"); // Navigate to home
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
          width: "550px",
          height:"530",
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
          Sector-App <span style={{ color: "#757575" }}>LOGIN FORM</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
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

          {/* Login Button */}
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
            Login
          </Button>

          {/* Register Link */}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <span style={{ color: "#757575" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#2196F3",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
