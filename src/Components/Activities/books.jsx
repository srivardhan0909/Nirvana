import React from 'react';

function Books() {
  const bookImages = [
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/gadcover2016.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/theselfandtherapy.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/235guide.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/ntadcoverss.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/dynamiccoverss.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2020/05/IPICover.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/socialphobiacover2016.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2021/06/seicover.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/depressioncover.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/depressivedisorderscover.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/andreasencover.png",
    "https://www.freepsychotherapybooks.org/ebook/wp-content/uploads/2018/10/coverss.png"
  ];

  const bookLinks = [
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654",
    "https://www.freepsychotherapybooks.org/download/the-self-and-therapy/?v=4654"
  ];

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transition = 'transform 0.2s ease-in-out';
    e.currentTarget.style.transform = 'scale(1.04)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transition = 'transform 0.2s ease-in-out';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <div className="row">
        {bookImages.map((imageUrl, index) => (
          <div 
            key={index} 
            className="col-md-4 mb-4" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <div className="shadow p-4 m-5 rounded-3">
              {bookLinks[index] ? (
                <img
                  className="img-fluid rounded-3"
                  src={imageUrl}
                  alt={`Book cover ${index + 1}`}
                  onClick={() => handleClick(bookLinks[index])}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <img
                  className="img-fluid rounded-3"
                  src={imageUrl}
                  alt={`Book cover ${index + 1}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
