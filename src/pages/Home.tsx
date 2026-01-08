import MoodCard from "../components/MoodCard";
import Navbar from "../components/Navbar";

import creative from "../assets/mood-images/creative.png";
import inspired from "../assets/mood-images/inspired.png";
import romantic from "../assets/mood-images/romantic.png";
import adventurous from "../assets/mood-images/adventurous.png";
import technical from "../assets/mood-images/technical.png";
import magical from "../assets/mood-images/magical.png";
import financial from "../assets/mood-images/financial.png";
import humorous from "../assets/mood-images/humorous.png";
import scared from "../assets/mood-images/scared.png";

import { IoMdHeart } from "react-icons/io";
import QueryInput from "../components/QueryInput";

const moodCards = [
  {
    imgPath: creative,
    title: "Creative",
  },
  {
    imgPath: inspired,
    title: "Inspired",
  },
  {
    imgPath: romantic,
    title: "Romantic",
  },
  {
    imgPath: adventurous,
    title: "Adventurous",
  },
  {
    imgPath: technical,
    title: "Technical",
  },
  {
    imgPath: magical,
    title: "Magical",
  },
  {
    imgPath: financial,
    title: "Financial",
  },
  {
    imgPath: humorous,
    title: "Humorous",
  },
  {
    imgPath: scared,
    title: "Scared",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="landing-header">
        <h1>
          Find books that make you{" "}
          <span style={{ fontStyle: "italic", color: "#421F00" }}>feel</span>.
        </h1>
        <div>
          Matchbooks helps you discover your next read, with some{" "}
          <IoMdHeart className="icon" color="#EF7000" /> from the OpenLibrary
          API.
        </div>
      </div>

      <div className="cards-flex">
        {moodCards.map((mood, i) => (
          <MoodCard imgSrc={mood.imgPath} title={mood.title} key={i} />
        ))}
      </div>
      <QueryInput />
    </>
  );
}
