import React from 'react';

export default () => {
  return (
    <div className="container">
      <div id="detail" className="col-12 p-3">
        <div className="row">
          <div className="col-5">
            <img src='https://cdn-images-1.medium.com/max/1600/0*VoTjZcl8WnXfn11b.png' class="img-fluid"/>
          </div>
          <div className="col-7 text-center">
            <h3>React course for beginner.</h3>
            <h5>Author: Peerachat Boonchan</h5>
            <p className="mt-4">description: adsfdsafdsafsdaigoewqjriosdafsd</p>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <h1 className="mt-3 ">You have enrolled this class</h1>
        </div>
      </div>
    </div>
  )
}
