import React, { useState, useEffect } from "react";

const CheesecakeSection = () => {
  const [slices, setSlices] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showMilestoneReward, setShowMilestoneReward] = useState(false);
  const [selectedReward, setSelectedReward] = useState("");
  const [rewardHistory, setRewardHistory] = useState([]);

  // Simple puzzles - you can expand these
const puzzles = [
  {
    question:
      "What has keys but no locks, space but no room, and you can enter but not go in?",
    answer: "keyboard",
  },
  {
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
  },
  {
    question: "What gets wetter as it dries?",
    answer: "towel",
  },
  {
    question: "What has a neck but no head?",
    answer: "bottle",
  },
  {
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
  },
  {
    question: "What has many teeth but cannot bite?",
    answer: "comb",
  },
  {
    question: "What has one eye but cannot see?",
    answer: "needle",
  },
  {
    question: "What runs but never walks, has a mouth but never talks?",
    answer: "river",
  },
  {
    question: "What belongs to you, but other people use it more than you do?",
    answer: "your name",
  },
  {
    question: "What has hands but can’t clap?",
    answer: "clock",
  },
];


  // Check for milestones when slices change
  useEffect(() => {
    if (slices > 0 && slices % 5 === 0 && !rewardHistory.includes(slices)) {
      setShowMilestoneReward(true);
    }
  }, [slices, rewardHistory]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    if (userAnswer.toLowerCase().trim() === puzzles[puzzleIndex].answer) {
      setSlices(slices + 1);
      setUserAnswer("");
      setPuzzleIndex((puzzleIndex + 1) % puzzles.length);
    }
  };

  const selectReward = (reward) => {
    setSelectedReward(reward);
    setRewardHistory([...rewardHistory, slices]);
    setShowMilestoneReward(false);
  };

  return (
    <section
      id="cheesecake"
      className="scroll-snap-section py-20 px-6 text-center relative z-10 max-w-lg mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-4">
        Cheesecake Reward Tracker
      </h2>

      <div className="mb-6">
        <div className="text-6xl mb-4 flex justify-center items-center gap-2">
          <span>{slices}</span>
          <span className="animate-bounce">🍰</span>
        </div>
        <p className="text-white/80">
          Solve puzzles to earn cheesecake slices!
        </p>
      </div>

      {showMilestoneReward ? (
        <div className="bg-pink-100 p-6 rounded-lg shadow-lg mb-6 animate-pulse">
          <h3 className="text-xl font-bold text-pink-700 mb-4">
            Milestone Reached: {slices} Slices! 🎉
          </h3>
          <p className="mb-4 text-pink-800">Choose your reward:</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => selectReward("Hug")}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full transition"
            >
              Hug 🤗
            </button>
            <button
              onClick={() => selectReward("Kiss")}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full transition"
            >
              Kiss 😘
            </button>
            <button
              onClick={() => selectReward("Surprise")}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full transition"
            >
              Surprise 🎁
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold text-pink-300 mb-2">
            Puzzle #{puzzleIndex + 1}:
          </h3>
          <p className="mb-4 text-white">{puzzles[puzzleIndex].question}</p>
          <form
            onSubmit={handleAnswerSubmit}
            className="flex flex-col md:flex-row gap-2 justify-center"
          >
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="px-4 py-2 rounded-l-full w-full md:w-auto bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full md:rounded-l-none transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {selectedReward && (
        <div className="mt-4 p-3 bg-pink-100 rounded-lg text-pink-800">
          <p>
            Last reward claimed:{" "}
            <span className="font-bold">{selectedReward}</span> at {slices}{" "}
            slices
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-pink-300 mb-2">
          Milestone Progress
        </h3>
        <div className="w-full bg-white/20 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-pink-400 to-pink-600 h-4 rounded-full"
            style={{ width: `${(slices % 5) * 20}%` }}
          ></div>
        </div>
        <p className="text-white/80 mt-2">
          {5 - (slices % 5)} more slices until next reward
        </p>
      </div>
    </section>
  );
};

export default CheesecakeSection;
 