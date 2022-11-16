import React from "react";
import { List, Container, Grid } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={token ? 13 : 16}>
            <List horizontal>
              {token ? (
                <>
                  <List.Item>
                    <Link to="/home">Home</Link>
                  </List.Item>
                </>
              ) : (
                <>
                  <List.Item>
                    <Link to="/">Login</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/signup">Signup</Link>
                  </List.Item>
                </>
              )}
            </List>
          </Grid.Column>
          {token && (
            <Grid.Column width={3}>
              <List horizontal>
                <List.Item onClick={onLogout}>
                  <Link to="#">Logout</Link>
                </List.Item>
              </List>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
