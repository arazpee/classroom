import React from 'react';

export default () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark primary-color">
    <div className="container">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="basicExampleNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Advanced search</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
        <form className="form-inline">
          <div className="md-form my-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          </div>
        </form>
      </div>
    </div>
    </nav>
  )
}
