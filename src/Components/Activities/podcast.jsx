import React from 'react';

function Podcast() {
  const videoUrls = [
    "https://www.youtube.com/embed/ntfcfJ28eiU?si=tAG3jboOoG6r7ukc",
    "https://www.youtube.com/embed/Nz9eAaXRzGg?si=5-TdsvIgebgycsRV",
    "https://www.youtube.com/embed/vpO_3ZegQL4?si=0MAtR0N1-O4Uwt8h",
    "https://www.youtube.com/embed/1XCObQjSHIs?si=clTjGzkPJRuh8M6C",
    "https://www.youtube.com/embed/TqxxCYnAxo8?si=2TF-o5EqO_mqmfSW",
    "https://www.youtube.com/embed/LhYRD0XmzOU?si=a5M9cW00FAAUwC46",
    "https://www.youtube.com/embed/RdM596wLz00?si=X3hLUO6HRG6LoPrn",
    "https://www.youtube.com/embed/FhG-VoRtkKY?si=nfGHDkWPF5xFJT4o",
    "https://www.youtube.com/embed/a0KCcRjvz7g?si=EqfKSTJA_OwsoUMO",
    "https://www.youtube.com/embed/_QCtzOb8_XA?si=bVFt1RNEvconmGaw",
    "https://www.youtube.com/embed/3Nf2Pzcketg?si=oM-RGBkLmsc5FuqO",
    "https://www.youtube.com/embed/u0OBgihk2f8?si=dfQtABQYyIdj8utO",
    "https://www.youtube.com/embed/BfdvbZFXbNA?si=_wKmXMIZtkjgbsyI",
    "https://www.youtube.com/embed/SGh-oQ8FF6g?si=mOfKsJXLkasyd4E5",
    "https://www.youtube.com/embed/p3uYG17WUig?si=h9R0EC_6IOByZ1Wi",
    "https://www.youtube.com/embed/EfASjM-KmL0?si=NDufUSMiyaffQteX",
    "https://www.youtube.com/embed/3NbwW5KTgX8?si=u3LFY9N_MniRFGXO",
    "https://www.youtube.com/embed/7AYTzSCJP3Y?si=dYM1hM30QBrSBY8N"
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

export default Podcast;
