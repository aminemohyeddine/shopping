import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopHeader.css";
import Marquee from "react-fast-marquee";

interface Props {
  normalMenu: boolean;
}

export const TopHeader: React.FC<Props> = ({ normalMenu }) => {
  return (
    <>
      {normalMenu ? (
        <div className="topHeaderContainer">
          <div className="topHeaderElement">
            <div className="iconContainer">
              <FontAwesomeIcon className="validateIcon" icon={faCheck} />
            </div>
            <div className="topHeaderOption">
              <p>Flat rate</p>
            </div>
            <div className="topHeaderTitle">
              <p>shipping</p>
            </div>
          </div>

          <div className="topHeaderElement">
            <div className="iconContainer">
              <FontAwesomeIcon className="validateIcon" icon={faCheck} />
            </div>
            <div className="topHeaderOption">
              <p>Selected</p>
            </div>
            <div className="topHeaderTitle">
              <p>gardeners</p>
            </div>
          </div>

          <div className="topHeaderElement">
            <div className="iconContainer">
              <FontAwesomeIcon className="validateIcon" icon={faCheck} />
            </div>
            <div className="topHeaderOption">
              <p>Full</p>
            </div>
            <div className="topHeaderTitle">
              <p>right of withdrawal</p>
            </div>
          </div>

          <div className="topHeaderElement">
            <div className="iconContainer">
              <FontAwesomeIcon className="validateIcon" icon={faCheck} />
            </div>
            <div className="topHeaderOption">
              <p>Free</p>
            </div>
            <div className="topHeaderTitle">
              <p>service hotline: 0800 - 0445500</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="scrollLeftContainer">
          <div className="scrollItem">
            <Marquee
              gradient={false}
              pauseOnClick={true}
              pauseOnHover={true}
              speed={100}
            >
              <div className="topHeaderElement">
                <div className="iconContainer">
                  <FontAwesomeIcon className="validateIcon" icon={faCheck} />
                </div>
                <div className="topHeaderOption">
                  <p>Flat rate</p>
                </div>
                <div className="topHeaderTitle">
                  <p>shipping</p>
                </div>

                <div className="topHeaderElement">
                  <div className="iconContainer">
                    <FontAwesomeIcon className="validateIcon" icon={faCheck} />
                  </div>
                  <div className="topHeaderOption">
                    <p>Selected</p>
                  </div>
                  <div className="topHeaderTitle">
                    <p>gardeners</p>
                  </div>
                </div>

                <div className="topHeaderElement">
                  <div className="iconContainer">
                    <FontAwesomeIcon className="validateIcon" icon={faCheck} />
                  </div>
                  <div className="topHeaderOption">
                    <p>Full</p>
                  </div>
                  <div className="topHeaderTitle">
                    <p>right of withdrawal</p>
                  </div>
                </div>

                <div className="topHeaderElement">
                  <div className="iconContainer">
                    <FontAwesomeIcon className="validateIcon" icon={faCheck} />
                  </div>
                  <div className="topHeaderOption">
                    <p>Free</p>
                  </div>
                  <div className="topHeaderTitle">
                    <p>service hotline: 0800 - 0445500</p>
                  </div>
                </div>
              </div>
            </Marquee>
          </div>
        </div>
      )}
    </>
  );
};
