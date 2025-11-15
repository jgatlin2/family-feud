import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const questions = [
    ["Change Seats", " Cover Nose", "Turn Head", "Endure / Enjoy It", "Spray Perfume", "''You Reek Yo''","Sleep", "Hang In The Bathroom"], //Name something you'd do if the person sitting next to you on an airplane had body odor.
    ["Strip Joint","Tacky Restaurant","Parents House" , "Bar / Dance Club" , "Sports / Tractor Pull" , "Church", "Home / Bed"], // We asked 100 men, name a place you would never take a first date:
    ["Mechanical Bull", "Horse / Bronco", "Motorcycle", "Camel", "Elephant", "Donkey / Mule", "Plane", "Rocket/ Spaceship"], // Name something you can honestly say you've never ridden
    ["In a Relationship", "Not Interested", "I'm Gay", "I'm Busy Sorry", "Not Dating Right Now", "Don't Live Around Here"], // If someone asked you out on a date, what's an excuse you might give if you weren't interested?
    ["Nurse", "Doctor / Dentist","Beautician / Hair", "Nanny / Day Care", "Teacher", "Polititian", "Message Therapist"], //Name an occupation in which you trust a woman more than a man
    ["Hit Him", "Yell / Call him out", "Check Her Out Too", "No more Sex", "Laugh", "Give Dirty Look"], // What might a woman do when she catches her man checking out another woman?
    ["Nagging / Voice", "Cooking", "Attitude", "Spending" , "Family", "Snoring", "No Sex Policy"], // Fill in the blank: I'm getting really tired of my wife's (blank.)
    ["Overstaying", "Messy ASL", "Talking/Compalining", "Eating Everything", "Stealing"], // Name something that turns a house guest into a house pest
    ["Ex", "Co-worker / Boss", "Parent", "Friend", "Sibling", "Spouse", "Preist"], // Name someone you wouldn't want to run into on a date with a one night stand
    ["Sleeping", "Watching TV", "Having Sex", "Dancing", "Drinking", "Eating", "Gambling"], // If you live to be 100, what do you think you’ll be doing on Saturday night?
    ["Getting Down and Dirty", "Drinking", "Smoking", "Using the AirFryer", "Lighting a Candle", "Gooning"], //We asked 100 College Students, What wouldn't you want your RA to walk in catching you doing?
    ["The Bill", "Pills / Perscription", "Advice / A Lecture", "Nothing", "Candy / Snack"], // A Pediatritian gives little kids a ballon, what does your doctor give you?
    ["Drive", "Walk", "Cook", "Think Clearly", "Pee","Get Up"], // Name something you hope you can still do for yourslrf when you're 80 years old
    ["Avoid", "Offer Gum", "Turn Away", "Hold Breath", "Tell Them","Ignore","Gag/Puke","Cover Face"],// Name Soemthing You'd do when your boss has very bad breath
    ["In-Laws / Family Event", "Doctor / Dentist", "Church", "Ballet / Muscial ", "Mall / Store","Dance / Adult Prom","Chick Flick"], // Name Something A Wife might Force Her Husband to go to
    ["Piss", "Eat", "Shower / Wash Off", "Sleep", "Wake Up","Shave","Put on Shoes"], // Name something even the laziest person in the world has to do every day
    ["Bee/Wasp", "Roach", "Fly", "Ant", "Praying Mantis","Spider","Gnat"], // name a kind of bug your boss remids you of
    ["Kids", "Long Hours", "Low Pay", "The Santa Suit"], // Name soemthing a department store santa might hate about his job
    ["Car", "Water", "Refrigerator", "Clock", "Nose","Panty Hose","Clock"], //  Name something that runs but has no legs
    ["Outfit", "Dog", "Child/Baby", "Mate", "Car/Truck ","Hair Style","Picture"], // Fill in the blank: Name something a friend has that you'd think to yourself "Thats the ugliest blank in the world"
    ["Food/ Pie", "Hole", "Peoples Business", "Bush/Tree", "The Fridge ","Beehive","Hot Babe"], // Name something Pinocchio might stick his nose into
    ["Lie", "Always hungry ;^)", "Listen / Communicate", "Spend Money", "Exist"], // We asked 100 students, Name something your Ex does better than your current partner
    ["Job", "Personality / Humor", "Warranty / Garuntee", "Heart / Character", "Bank Account","Body","Heasd of Hair", "Brain"], //  If there was a store that only sold husbands, most people would try to buy one with a what?
    ["Balloon", "Tire", "Beach Ball", "Ego", "Raft"],// Name something that can be inflated or deflated.
    ["Restaurant", "Stores", "Bar", "Casino", "The Movies", "Concert", "Sporting Event"], // Name a place where people tend to spend money they don't have
    ["Cheese", "Clothes", "Alibi/ Story", "Net", "Strainer", "Golf Course", "Street"], // Name something that might be full of holes
    ["In a Cake", "Up Your Shaft", "Underwear", "bra", "Shoe", "Socks", "Bribe / With Guard", "Hair"], // Where might you hide something you wanted to smuggle into prison?
    ["French", "Italian", "Spanish", "British / English", "German", "Chinese", "Japanese"], // Name a language that sounds sexy when spoken
    ["Wake Up Early", "Work", "Errands", "Chores", "Church", "Cook", "Anything"], // Name something you do not want to do on a Sunday

    // Add more sets as needed
   ];
   
function FamilyFeudBoard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState(Array(8).fill(false));
  const [showX, setShowX] = useState(false);

  const correctSound = useRef(new Audio("/Correct Answer.mp3"));
  const buzzerSound = useRef(new Audio("/buzzer.mp3"));
  const themeSound = useRef(new Audio("/Theme.mp3"));
  const roundWinSound = useRef(new Audio("/RoundWin.mp3"));

  const currentAnswers = questions[currentQuestionIndex];
  const [isThemePlaying, setIsThemePlaying] = useState(false);
  const [hasPlayedWinSound, setHasPlayedWinSound] = useState(false);
  const boxPositions = [
    { top: "5px", left: "2px", width: "152px", height: "28px" }, // Box 1
    { top: "51px", left: "2px", width: "152px", height: "28px" }, // Box 2
    { top: "101px", left: "2px", width: "152px", height: "28px" }, // Box 3
    { top: "150px", left: "2px", width: "152px", height: "28px" }, // Box 4
    { top: "5px", left: "170px", width: "152px", height: "28px" }, // Box 5
    { top: "51px", left: "170px", width: "152px", height: "28px" }, // Box 6
    { top: "101px", left: "170px", width: "152px", height: "28px" }, // Box 7
    { top: "150px", left: "170px", width: "152px", height: "28px" }, // Box 8
  ];
  

  useEffect(() => {
    const handleKeyPress = (e) => {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 8) {
          setRevealed((prev) => {
            if (!prev[num - 1]) {
              correctSound.current.currentTime = 0.9;
              correctSound.current.play();
            }
            const updated = [...prev];
            updated[num - 1] = true;
            return updated;
          });
        } else if (num === 9) {
          buzzerSound.current.currentTime = 0.7;
          buzzerSound.current.play();
          setShowX(true);
          setTimeout(() => setShowX(false), 1500);
        } else if (num === 0) {
            if (isThemePlaying) {
              themeSound.current.pause();
              themeSound.current.currentTime = 0;
              setIsThemePlaying(false);
            } else {
              themeSound.current.currentTime = 0;
              themeSound.current.play();
              setIsThemePlaying(true);
            }
          }
      };
      

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setRevealed(Array(8).fill(false));
    setShowX(false);
    setHasPlayedWinSound(false);
  };
  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev === 0 ? questions.length - 1 : prev - 1
    );
    setRevealed(Array(8).fill(false));
    setShowX(false);
    setHasPlayedWinSound(false);
  };
  
  useEffect(() => {
    const allRevealed = revealed.every((r) => r);
    if (allRevealed && !hasPlayedWinSound) {
      roundWinSound.current.currentTime = 0;
      roundWinSound.current.play();
      setHasPlayedWinSound(true);
    }
  }, [revealed, hasPlayedWinSound]);
  
  return (
    <div className="game-container">
      <img src="/board.png" alt="Game Board" className="board-image" />
      <div className="question-number">
   {currentQuestionIndex + 1}
</div>

      <div className="answers-container">
 {currentAnswers.map((answer, i) => (
    <div
      key={i}
      className={`answer-box ${revealed[i] ? "revealed" : ""}`}
      style={{
        position: "absolute",
        top: boxPositions[i].top,
        left: boxPositions[i].left,
        width: boxPositions[i].width,
        height: boxPositions[i].height,
      }}
    >
      {revealed[i] ? answer : `${i + 1}`}
    </div>
  ))}
  

      </div>

      {showX && (
        <div className="red-x">
          <span>X</span>
        </div>
      )}

      <button className="next-button" onClick={nextQuestion} >
        Next Question
      </button>
      <button className="prev-button" onClick={prevQuestion}>
  Previous Question
</button>

    </div>
  );
}

export default FamilyFeudBoard;
