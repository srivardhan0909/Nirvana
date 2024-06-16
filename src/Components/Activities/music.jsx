import React from 'react';

function Music() {
  const videoUrls = [
    "https://www.youtube.com/embed/IQ95IgO8wyo?si=iXieWm1n_cqohlON",
    "https://www.youtube.com/embed/l6J0ylYTO4s?si=NizHResVMfz6dHLX",
    "https://www.youtube.com/embed/tF4z5kntXAA?si=j6I--68GfysuxHoF",
    "https://www.youtube.com/embed/ZJpt_bRTC6g?si=vINzHH6MBPnVjwaA",
    "https://www.youtube.com/embed/TQAevEd0LOE?si=IJDDcT16YTinY3ZS",
    "https://www.youtube.com/embed/AImuCtIokl0?si=wbGDI06-NdCPaxrJ",
    "https://www.youtube.com/embed/QVq3GIEiTns?si=kySnWHV1ufybWh7V",
    "https://www.youtube.com/embed/VgdAcENXy84?si=Y_rmVd40dHkWIGmu",
    "https://www.youtube.com/embed/40tPuU6jrgQ?si=r9gsm2Xi1MBbgwsy",
    "https://www.youtube.com/embed/1il__9vPE5o?si=K3i1k2CNqzVlMXqt",
    "https://www.youtube.com/embed/vPvIxwh9N2w?si=e4RrBgCJ5CnZ71y9",
    "https://www.youtube.com/embed/60Gnd8Wy0gE?si=EiUgWbfG_8vR5W74",
    "https://www.youtube.com/embed/SgROC9xiZNg?si=lvCUW-fO1NEwOEJO",
    "https://www.youtube.com/embed/PBQjpvZ9Gy4?si=q-mpSpN2RctrEhMD",
    "https://www.youtube.com/embed/EWVtzDK0BC4?si=Mssd0skkybsl7ESL",
    "https://www.youtube.com/embed/lE6RYpe9IT0?si=5z2ORs4TGi91ynYI",
    "https://www.youtube.com/embed/IaDWJbCGbX0?si=DB3RPZVkXCxOjO88",
    "https://www.youtube.com/embed/O9vGWQrZyMg?si=aXJvZoeE-Ezl6Y72"
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

export default Music;
