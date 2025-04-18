

//game
// trading-game-frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API = 'http://localhost:5000';

export default function Game() {
  const [market, setMarket] = useState([]);
  const [coins, setCoins] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showQuiz, setShowQuiz] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${API}/quiz`).then(res => {
      setQuiz(res.data);
      setQuizAnswers(Array(res.data.length).fill(null));
    });
  }, []);

  const submitQuiz = () => {
    axios.post(`${API}/quiz/submit`, { answers: quizAnswers })
      .then(res => {
        alert(res.data.message);
        setCoins(res.data.coins);
        if (res.data.message.includes('passed')) {
          setShowQuiz(false);
        }
      });
  };

  const fetchMarket = () => {
    setMarket([
      { id: 1, name: 'Tech Corp', price: 120, type: 'stock' },
      { id: 2, name: 'Health Inc', price: 80, type: 'stock' },
      { id: 3, name: 'Safe Bank FD', price: 100, type: 'fd' },
      { id: 4, name: 'Growth Fund', price: 200, type: 'mf' },
      { id: 5, name: 'CryptoCoin', price: 60, type: 'crypto' },
    ]);
  };

  useEffect(() => {
    if (!showQuiz) fetchMarket();
  }, [showQuiz]);

  const invest = (stockId) => {
    axios.post(`${API}/investt`, { stockId }).then(res => {
      setCoins(res.data.coins);
      setPortfolio(res.data.portfolio);
      setResult({ result: res.data.result, change: res.data.change });
    }).catch(err => {
      alert(err.response.data.message);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">📈 Investment Game</h1>

      {showQuiz ? (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">🧠 Investment Quiz</h2>
          {quiz.map((q, idx) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium">{q.question}</p>
              {q.options.map((opt, oidx) => (
                <div key={oidx}>
                  <label>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt}
                      checked={quizAnswers[idx] === opt}
                      onChange={() => {
                        const newAnswers = [...quizAnswers];
                        newAnswers[idx] = opt;
                        setQuizAnswers(newAnswers);
                      }}
                    /> {opt}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={submitQuiz} className="bg-green-600 text-white px-4 py-2 rounded">Submit Quiz</button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-xl">💰 Coins: <strong>{coins}</strong></p>
            {result && (
              <p className={result.result === 'Profit' ? 'text-green-600' : 'text-red-600'}>
                You made a {result.result} of {Math.abs(result.change)} coins!
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {market.map(stock => (
              <div key={stock.id} className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-sm italic">{stock?.type?.toUpperCase() || 'UNKNOWN'}</p>
                <p>💸 Price: {stock.price}</p>
                <button
                  onClick={() => invest(stock.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >Invest</button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">📦 Portfolio</h2>
            {portfolio.length === 0 ? <p>No investments yet.</p> : (
              <ul className="list-disc ml-6">
                {portfolio.map((item, idx) => (
                  <li key={idx}>{item.name} - Return: {item.returnAmount} ({item.isProfit ? 'Profit' : 'Loss'})</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
