import React, { useState } from "react";
import Music from "./music";
import Podcast from "./podcast";
import Yoga from "./yoga";
import "./sides.css";
import Meditation from "./meditation";
import Standupcomedy from "./standup-comedy";
import Books from "./books";

function Side() {
  const [activeTab, setActiveTab] = useState("music");
  const [splitTransition, setSplitTransition] = useState(false);

  const handleTabClick = (tab) => {
    setSplitTransition(true); // Apply split transition
    setTimeout(() => {
      setActiveTab(tab);
      setSplitTransition(false); // Reset split transition after a delay
    }, 300); // Wait for 300 milliseconds (same duration as CSS transition)
  };

  return (
    <div className="d-flex align-items-start" >
      <div
        className="nav flex-column nav-pills me-5"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          className={`nav-link ${activeTab === "music" ? "active" : ""}`}
          id="v-pills-music-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-music"
          type="button"
          role="tab"
          aria-controls="v-pills-music"
          aria-selected={activeTab === "music"}
          onClick={() => handleTabClick("music")}
        >
          Music
        </button>
        <button
          className={`nav-link ${activeTab === "podcast" ? "active" : ""}`}
          id="v-pills-podcast-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-podcast"
          type="button"
          role="tab"
          aria-controls="v-pills-podcast"
          aria-selected={activeTab === "podcast"}
          onClick={() => handleTabClick("podcast")}
        >
          Podcast
        </button>
        <button
          className={`nav-link ${activeTab === "yoga" ? "active" : ""}`}
          id="v-pills-yoga-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-yoga"
          type="button"
          role="tab"
          aria-controls="v-pills-yoga"
          aria-selected={activeTab === "yoga"}
          onClick={() => handleTabClick("yoga")}
        >
          Yoga
        </button>
        <button
          className={`nav-link ${activeTab === "meditation" ? "active" : ""}`}
          id="v-pills-meditation-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-meditation"
          type="button"
          role="tab"
          aria-controls="v-pills-meditation"
          aria-selected={activeTab === "meditation"}
          onClick={() => handleTabClick("meditation")}
        >
          Meditation
        </button>
        <button
          className={`nav-link ${activeTab === "standup-comedy" ? "active" : ""}`}
          id="v-pills-standup-comedy-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-standup-comedy"
          type="button"
          role="tab"
          aria-controls="v-pills-standup-comedy"
          aria-selected={activeTab === "standup-comedy"}
          onClick={() => handleTabClick("standup-comedy")}
        >
          Standup-Comedy
        </button>
        <button
          className={`nav-link ${activeTab === "books" ? "active" : ""}`}
          id="v-pills-books-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-books"
          type="button"
          role="tab"
          aria-controls="v-pills-books"
          aria-selected={activeTab === "books"}
          onClick={() => handleTabClick("books")}
        >
          e-Books
        </button>
      </div>
      <div className="content-wrapper">
        <div className="content">
          <div className={`tab-content`} id="v-pills-tabContent">
            <div
              className={`tab-pane fade ${
                activeTab === "music" ? "show active" : ""
              }`}
              id="v-pills-music"
              role="tabpanel"
              aria-labelledby="v-pills-music-tab"
              tabIndex="0"
            >
              <Music />
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "podcast" ? "show active" : ""
              }`}
              id="v-pills-podcast"
              role="tabpanel"
              aria-labelledby="v-pills-podcast-tab"
              tabIndex="0"
            >
              <Podcast />
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "yoga" ? "show active" : ""
              }`}
              id="v-pills-yoga"
              role="tabpanel"
              aria-labelledby="v-pills-yoga-tab"
              tabIndex="0"
            >
              <Yoga/>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "meditation" ? "show active" : ""
              }`}
              id="v-pills-meditation"
              role="tabpanel"
              aria-labelledby="v-pills-meditation-tab"
              tabIndex="0"
            >
              <Meditation/>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "standup-comedy" ? "show active" : ""
              }`}
              id="v-pills-standup-comedy"
              role="tabpanel"
              aria-labelledby="v-pills-standup-comedy-tab"
              tabIndex="0"
            >
              <Standupcomedy/>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "books" ? "show active" : ""
              }`}
              id="v-pills-books"
              role="tabpanel"
              aria-labelledby="v-pills-books-tab"
              tabIndex="0"
            >
              <Books/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side;
