import React from 'react';

function Standupcomedy() {
  const videoUrls = [
    "https://www.youtube.com/embed/_fWyWcZB7VA?si=x0xvytoq1SDwL2_D",
    "https://www.youtube.com/embed/tbRvPBB7KUI?si=yGQm0ItX63N-m35O",
    "https://www.youtube.com/embed/GdagF8Kwfks?si=5_EebGuGU30o-ewO",
    "https://www.youtube.com/embed/jQgXykcmFCg?si=_Sw4HToHLV5J1JGr",
    "https://www.youtube.com/embed/28-7Jki3PEM?si=YLWbEzQw-nqch15g",
    "https://www.youtube.com/embed/caoK6lM7ckE?si=6NKn6j33A0a-6zAy",
    "https://www.youtube.com/embed/6LHUxFRNguY?si=sS8VEbsE5ew4KZSW",
    "https://www.youtube.com/embed/EostPx5-a7U?si=YfxZN57DGXkrnYSw",
    "https://www.youtube.com/embed/_looGAGzJGY?si=T0-CuHU7vxEGwuuZ",
    "https://www.youtube.com/embed/sg2rM264Tko?si=gYbmfn1QuFwUnzjC",
    "https://www.youtube.com/embed/akbnHtx0l30?si=Hq7y27fx6qp-3J5K",
    "https://www.youtube.com/embed/12lwHY_fs0Y?si=FXhYi81ysYouChVY",
    "https://www.youtube.com/embed/FrqvTMyD1Tc?si=xkLSnDHVhiABUPnV",
    "https://www.youtube.com/embed/NWtUA0s3U4I?si=L_Xm3nznNyYKZhwL",
    "https://www.youtube.com/embed/FuAFfFzuhLo?si=gfUscfklGKURhYU9",
    "https://www.youtube.com/embed/_reDRJgmaIk?si=PQXEeHiu513F0WV3",
    "https://www.youtube.com/embed/zSZi-Dg4MYs?si=8XRbPwTDEnlm6hql",
    "https://www.youtube.com/embed/ZJdLJf4ZW-M?si=yXAs6SfHRLNAw0di"
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

export default Standupcomedy;
