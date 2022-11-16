import React from "react";
import Layout from "../Layout";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = React.useState<string>();

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    try {
      await axios.post("/user", user);
      navigate("/");
    } catch (e: any) {
      if (e.response && e.response.data.message) {
        setError(e.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="auth">
        <div className="auth-title">Signup</div>
        {error && (
          <div style={{ fontWeight: "bold", color: "red", margin: "30px 0" }}>
            {error}
          </div>
        )}
        <div className="form">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="group">
              <Input
                placeholder="Username"
                type="text"
                className="auth-input"
                required
                value={user.username}
                name="username"
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
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
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Signup;
