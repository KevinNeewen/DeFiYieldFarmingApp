import React, { useState, useEffect } from "react";
import useWeb3Provider from "../../hooks/useWeb3Provider";
import Navbar from "react-bootstrap/Navbar";
import Alert from "../../components/Alert";
import Container from "react-bootstrap/Container";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null);
  const { hasEthereumProvider } = useWeb3Provider();

  return (
    <>
      <Navbar variant="dark">
        <Navbar.Brand>
          <Container fluid>
            <img src="/farmer.png" width="25" height="25" alt="" />
            <span className="navbar-title">Yield Farming Protocol"</span>
          </Container>
        </Navbar.Brand>
      </Navbar>
      <Container>
        {hasEthereumProvider ? (
          <div>all good</div>
        ) : (
          <Alert
            variant="danger"
            message="Please connect your MetaMask Wallet."
          />
        )}
      </Container>
    </>
  );
};

export default App;
