import React from 'react';

const FooterInstance = () => {
  return (
    <footer className="navbar navbar-default navbar-fixed-bottom">
      <div className="container-fluid footer">
        <div className="col-md-6 socialFooter">
          <ul className="social-network social-circle">
            <li>
              <a
                className="socialIcon "
                href="https://joao-henrique.github.io/JH-Website/"
                target="blank"
                title="Portfolio">
                <i className="fa fa-home "></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon"
                href="https://www.facebook.com/ljoaohenriquel"
                title="Facebook">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon "
                href="https://www.linkedin.com/feed/?trk="
                target="blank"
                title="Linkedin ">
                <i className="fa fa-linkedin "></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon "
                href="https://codepen.io/Joao_Henrique/"
                target="blank"
                title="Codepen ">
                <i className="fa fa-codepen "></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon "
                href="https://glitch.com/@Joao-Henrique"
                target="blank"
                title="Glitch ">
                <i className="fa fa-rocket "></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon "
                href="https://github.com/Joao-Henrique "
                target="blank"
                title="Github ">
                <i className="fa fa-github "></i>
              </a>
            </li>
            <li>
              <a
                className="socialIcon "
                href="https://github.com/Joao-Henrique "
                target="blank"
                title="Stack Overflow ">
                <i className="fa fa-stack-overflow "></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-6 authorFooter">
          <h6>
            <i className="fa fa-copyright "></i>
            João Henrique 2017</h6>
        </div>
      </div>
    </footer>
  )
}

export default FooterInstance;