import React, { useState } from 'react';
import './history.css';
import { useNavigate } from 'react-router-dom';


const questions = [
  {
    question: "🌶️ What kind of food do you usually prefer?",
    options: ["Spicy", "Sweet", "Salty", "Healthy"]
  },
  {
    question: "🍿 How often do you eat snacks?",
    options: ["Rarely", "Sometimes", "Daily", "Very Often"]
  },
  {
    question: "🎯 What's your primary health goal?",
    options: ["Lose weight", "Gain muscle", "Stay healthy", "I don’t care"]
  },
  {
    question: "🧐 Do you check food labels?",
    options: ["Always", "Sometimes", "Never", "What’s a food label?"]
  },
  {
    question: "🏃‍♂️ How active is your lifestyle?",
    options: ["Very Active", "Moderate", "Low", "Sedentary"]
  },
  {
    question: "🥗 Do you have any dietary restrictions?",
    options: ["Vegan", "Vegetarian", "None", "Allergic to something"]
  }
];

const getResult = (answers) => {
  const spicy = answers.includes("Spicy");
  const sweet = answers.includes("Sweet");
  const careless = answers.includes("I don’t care") || answers.includes("Never") || answers.includes("Very Often");
  const healthy = answers.includes("Healthy") || answers.includes("Always");
  const active = answers.includes("Very Active") || answers.includes("Gain muscle");
  const lazy = answers.includes("Sedentary") || answers.includes("Low");

  if (spicy && active) return { type: "🔥 Spicy Fit Foodie", foods: ["Paneer Tikka Wrap", "Peri Peri Chickpea Bowl"] };
  if (sweet && lazy) return { type: "🍫 Sweet Tooth Couch Lover", foods: ["Chocolate Mug Cake", "Creamy Milkshake"] };
  if (careless) return { type: "🤷 Carefree Eater", foods: ["Instant Noodles", "Cheesy Nachos"] };
  if (healthy && active) return { type: "🥗 Fitness Freak", foods: ["Quinoa Salad", "Grilled Tofu Bowl"] };
  return { type: "😋 Balanced Explorer", foods: ["Pasta with Veggies", "Fruit Yogurt Bowl"] };
};

const History = () => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setResult(getResult(updatedAnswers));
    }
  };

  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
<div className="history-container" style={{ position: 'relative' }}>
{/* Background image layer with opacity */}
<div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: "url('/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.4,
    zIndex: 0,
  }}
/>{/* ✅ Robot Chat Section */}
      <div className="robot-section">
        <div className="robot-center">
          <div className="chat-bubble">💬 Vibe with me!</div>
          <img src="/robot.png" alt="Food Bot" className="robot-image" />
          <p
  className="robot-text"
  style={{
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px', // Change to '32px' or '2rem' if you want more
    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
  }}
>
  Let me find your taste!
</p>


          <div className="quiz-box" style={{
            background: 'white',
            padding: '1.5rem',
            marginTop: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}>
            {!result ? (
              <>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{questions[currentQuestionIndex].question}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {questions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      style={{
                        padding: '0.6rem 1rem',
                        background: '#fde2e4',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        color: '#b91c1c',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fccaca'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#fde2e4'}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#059669', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{result.type}</h4>
                <p style={{ marginBottom: '0.5rem' }}> We recommend:</p>
                <ul style={{ marginBottom: '1rem' }}>
                  {result.foods.map((food, i) => <li key={i}>🍽️ {food}</li>)}
                </ul>
                <button
                  onClick={restart}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Play Again
                </button>
                <button onClick={() => navigate('/scan')} style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}>
      Scan Me
    </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
