import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5">
            <div className=" d-flex justify-content-around text-white">
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sitaram-rathi-519152197/">
                <i className="fab fa-linkedin-in text-dark mr-md-5 mr-3 fa-2x"></i>
              </a>
              <a target="_blank" rel="noreferrer" href="mailto:srrathi2000@gmail.com">
                <i className="far fa-envelope text-dark mr-md-5 mr-3 fa-2x"></i>
              </a>
              <a target="_blank" rel="noreferrer" href="https://github.com/srrathi">
                <i className="fab fa-github text-dark fa-2x"></i>
              </a>
              <a target="_blank" rel="noreferrer" href="https://twitter.com/sitaramrathi5">
                <i className="fab fa-twitter text-dark mr-md-5 mr-3 fa-2x"></i>
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/imrathiii/">
                <i className="fab fa-instagram text-dark mr-md-5 mr-3 fa-2x"></i>
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/rohitsitaram.rathi">
                <i className="fab fa-facebook-f text-dark mr-md-5 mr-3 fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center pb-3">
        Made with <span role="img">❤️</span> by
        <a className="text-dark" href="https://github.com/srrathi">
          {" "}
          Sitaram Rathi
        </a>
      </div>
    </footer>
  );
};

export default FooterComponent;
