import React, { useEffect } from "react";
import { gsap } from "gsap";

const BongoCat = () => {
  useEffect(() => {
    // Custom splitArray function
    const splitArray = (array, chunkSize) => {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    };

    // GSAP Animations
    const animatePawState = (selector) =>
      gsap.fromTo(
        selector,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.01,
          repeatDelay: 0.19,
          yoyo: true,
          repeat: -1,
        }
      );

    const tl = gsap.timeline();
    tl.add(animatePawState(".paw-left-up"), "start")
      .add(animatePawState(".paw-right-down"), "start")
      .add(animatePawState(".paw-left-down"), "start+=0.19")
      .add(animatePawState(".paw-right-up"), "start+=0.19")
      .timeScale(1.6);

    // Music Note Animations
    const notes = document.querySelectorAll(".note");
    gsap.set(notes, { scale: 0, autoAlpha: 1 });

    const animateNotes = (els) => {
      els.forEach((el) => {
        gsap.set(el, {
          stroke: gsap.utils.random(["#A5EA9B", "#FF61D8", "#569CFA", "#FFCC81"]),
          rotation: gsap.utils.random(-50, 50, 1),
          x: gsap.utils.random(-25, 25, 1),
        });
      });

      return gsap.fromTo(
        els,
        {
          autoAlpha: 1,
          y: 0,
          scale: 0,
        },
        {
          duration: 2,
          autoAlpha: 0,
          scale: 1,
          ease: "none",
          stagger: { from: "random", each: 0.5 },
          rotation: `${gsap.utils.random(["-", "+"])}=${gsap.utils.random(20, 30)}`,
          x: `${gsap.utils.random(["-", "+"])}=${gsap.utils.random(40, 60)}`,
          y: gsap.utils.random(-200, -220),
          onComplete: () => animateNotes(els),
        }
      );
    };

    const groupedNotes = splitArray([...notes], Math.ceil(notes.length / 3));
    groupedNotes.forEach((group, i) => {
      tl.add(animateNotes(group), i * 0.25);
    });
  }, []);

  return (
    <div className="flex items-end justify-center bg-gray-900 h-screen">
      {/* Bongo Cat Container */}
      <div className="relative w-4/5 h-4/5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 783.55 354.91">
          {/* Cat Body */}
          <g id="bongo-cat" className="fill-current text-gray-800 stroke-current stroke-[4]">
            <g className="head">
              <path d="M280.4,221l383.8,62.6a171.4,171.4,0,0,0-9.2-40.5..." />
            </g>

            {/* Paw Animation */}
            <g className="paw paw-left">
              <path className="paw-left-up" d="M586.6,208.8c-.6-2.3-4.2-15.6-17.2-22.2..." />
              <path className="paw-left-down" d="M534.1,231.4c-19.7,6-32.9,18.4-34.2,29.1..." />
            </g>

            <g className="paw paw-right">
              <path className="paw-right-up" d="M327.3,170c-.4-1.4-6.3-18.8-23.5-23.5..." />
              <path className="paw-right-down" d="M289.1,181.7c-12.1,9.8-20.6,20.7-20.7,32.1..." />
            </g>

            {/* Music Notes */}
            <g className="music">
              <g className="note">
                <path d="M368.5,46.5c.5,2.1,1.2,3.5,3.8,6.3..." />
              </g>
              <g className="note">
                <path d="M368.5,46.5c.5,2.1,1.2,3.5,3.8,6.3..." />
              </g>
            </g>

            {/* Table */}
            <g className="table">
              <polygon points="25.3 158.5 783.2 293 513 354.9 25.3 158.5" />
              <line x1="25.3" y1="158.5" x2="783.2" y2="293" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BongoCat;
