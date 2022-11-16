import React from "react";
import Layout from "../Layout";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" });

  const [error, setError] = React.useState<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    try {
      const res = await axios.post("/user/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.data.username);
      localStorage.setItem("email", res.data.data.email);
      window.location.href = "/home";
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="auth">
        <div className="auth-title">Login</div>
        {error && (
          <div style={{ fontWeight: "bold", color: "red", margin: "30px 0" }}>
            {error}
          </div>
        )}
        <div className="form">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="group">
              <Input
                placeholder="Email"
                type="email"
                className="auth-input"
                required
                value={user.email}
                name="email"
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="group">
              <Input
                placeholder="Password"
                type="password"
                className="auth-input"
                required
                value={user.password}
                name="password"
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="group">
              <Button type="submit" primary>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
