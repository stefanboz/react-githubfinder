import React from 'react';

import image404 from '../../assets/404.jpg';

function NotFound() {
  return (
    <div className="text-center">
      <img
        className="img-info img-info__lg"
        src={image404}
        alt="Page not found"
      />
    </div>
  );
}

export default NotFound;
