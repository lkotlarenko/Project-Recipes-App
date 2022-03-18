import React from 'react';
import NotFoundImage from '../../images/hungry3.jpg';

function NotFound() {
  return (
    <div className="bgcenter">
      <div className="notFound">
        <img src={ NotFoundImage } alt="Not Found" className="notFoundImage" />
        <div className="notFoundText">
          <p>
            Error 404!
            <br />
            Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
