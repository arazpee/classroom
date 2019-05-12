import React from 'react';

export default () => {
  return (
    <section className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
      <p className="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas
        nostrum quisquam eum porro a pariatur veniam.</p>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
          <div className="card collection-card z-depth-1-half">
            <div className="view zoom">
              <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/5.jpg" className="img-fluid"
                alt=""/>
              <div className="stripe dark">
                <a>
                  <p>Red trousers
                    <i className="fas fa-angle-right"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
          <div className="card collection-card z-depth-1-half">
            <div className="view zoom">
              <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg" className="img-fluid"
                alt="ss"/>
              <div className="stripe light">
                <a>
                  <p>Sweatshirt
                    <i className="fas fa-angle-right"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-md-0 mb-4">
          <div className="card collection-card z-depth-1-half">
            <div className="view zoom">
              <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/9.jpg" className="img-fluid"
                alt=""/>
              <div className="stripe dark">
                <a>
                  <p>Accessories
                    <i className="fas fa-angle-right"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card collection-card z-depth-1-half">
            <div className="view zoom">
              <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg" className="img-fluid"
                alt="saas"/>
              <div className="stripe light">
                <a>
                  <p>Sweatshirt
                    <i className="fas fa-angle-right"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
