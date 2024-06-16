import React from 'react';

function Yoga() {
  const videoUrls = [
    "https://www.youtube.com/embed/hJbRpHZr_d0?si=Y2hPhRvoKPCUNJXd",
    "https://www.youtube.com/embed/L1HCG3BGK8I?si=oshmJp8AYMsrhUwF",
    "https://www.youtube.com/embed/9MazN_6wdqI?si=JWg0-c4GF021IxIV",
    "https://www.youtube.com/embed/iqcAWup2aCE?si=qhWvOVPxeL2E9JYx",
    "https://www.youtube.com/embed/REIAGCwrzcI?si=B-ol97AqVSjms7ty",
    "https://www.youtube.com/embed/TGdNZTl86Qs?si=T-vElqvl7wrGJrr6",
    "https://www.youtube.com/embed/8TuRYV71Rgo?si=wJ-63eaEHa5kWQPt",
    "https://www.youtube.com/embed/6ijg6tpyxXg?si=zTSwLw3SvUPHiWHO",
    "https://www.youtube.com/embed/40bPxbFUCj4?si=ulMN664EriTuhIEg",
    "https://www.youtube.com/embed/C_MFrCwVD34?si=AHs11KTa-6SD27xd",
    "https://www.youtube.com/embed/sTANio_2E0Q?si=2ZedLvPp1y43PgTx",
    "https://www.youtube.com/embed/nusf3ISodRE?si=DbnKtCA6ablUCXES",
    "https://www.youtube.com/embed/COp7BR_Dvps?si=S9599lprjG9Knp6D",
    "https://www.youtube.com/embed/IGQgt3eHoRc?si=d16YQNQnBoiEDssy",
    "https://www.youtube.com/embed/PDXsA-CAGU8?si=-7kAlhSGvrNmScg1",
    "https://www.youtube.com/embed/eUDTHzCw5YE?si=--oAM9gFklc__OU2",
    "https://www.youtube.com/embed/8TuRYV71Rgo?si=nUvgfUv12voVMse9",
    "https://www.youtube.com/embed/rRxqYGj0_60?si=AaSMMdO9XHgD_nW7"
  ];

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transition = 'transform 0.2s ease-in-out';
    e.currentTarget.style.transform = 'scale(1.04)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transition = 'transform 0.2s ease-in-out';
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div className="container">
      <div className="row">
        {videoUrls.map((url, index) => (
          <div 
            key={index} 
            className="col-md-4 mb-4" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <div className="shadow p-3 mb-5 rounded-3">
              <iframe
                className="embed-responsive-item rounded-3"
                src={url}
                title={`YouTube video player ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Yoga;
