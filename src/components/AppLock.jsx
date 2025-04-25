import React, { useState, useEffect } from 'react';

const AppLock = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [step, setStep] = useState('setup'); // 'setup' or 'verify'
  const [storedPin, setStoredPin] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('app_pin');
    if (savedPin) {
      setStoredPin(savedPin);
      setStep('verify');
    }
  }, []);

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (step === 'setup') {
      if (pin.length === 4) {
        localStorage.setItem('app_pin', pin);
        setMessage('PIN set successfully!');
        onUnlock();
      } else {
        setMessage('PIN must be 4 digits.');
      }
    } else {
      if (pin === storedPin) {
        setMessage('Access granted!');
        onUnlock();
      } else {
        setMessage('Incorrect PIN.');
        setPin('');
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-4">
      <h2 className="text-xl font-semibold mb-4">
        {step === 'setup' ? 'Set Your 4-digit App PIN' : 'Enter PIN to Unlock'}
      </h2>

      {/* PIN dots */}
      <div className="flex gap-4 mb-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full ${
              i < pin.length ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 w-48 text-center mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((val, i) => (
          <button
            key={i}
            onClick={() => {
              if (val === '←') {
                handleBackspace();
              } else if (val !== '') {
                handleKeyPress(val.toString());
              }
            }}
            className="bg-white shadow-md p-4 rounded-full text-xl font-semibold active:bg-blue-100"
          >
            {val}
          </button>
        ))}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {message && (
        <p className="mt-4 text-sm font-medium text-red-600">{message}</p>
      )}
    </div>
  );
};

export default AppLock;
