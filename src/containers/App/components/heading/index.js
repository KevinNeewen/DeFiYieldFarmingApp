const heading = () => {
  return (
    <Navbar variant="dark">
      <Navbar.Brand>
        <Container fluid>
          <img src="/farmer.png" width="25" height="25" alt="" />
          <span className="navbar-title">Yield Farming Protocol"</span>
        </Container>
      </Navbar.Brand>
    </Navbar>
  );
};

export default heading;
