function Navbar() {
  return (
    <div className="Navbar">
      <nav class="navbar navbar-expand-lg bg-primary ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="fa-solid fa-leaf"></i> Krushika Mitra
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class=" navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Predict
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  E-Commerce
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Post
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
