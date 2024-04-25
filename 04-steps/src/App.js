import { useEffect, useState } from "react";
import { US } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";

const data = {
  eng: {
    "bt-1": "Previous",
    "bt-2": "Next",
    messages: [
      "Learn React ⚛️",
      "Apply for jobs 💼",
      "Invest your new income 🤑",
    ],
  },
  pt: {
    "bt-1": "Anterior",
    "bt-2": "Próximo",
    messages: [
      "Aprenda React ⚛️",
      "Faça entrevistas de emprego 💼",
      "Invista sua nova renda 🤑",
    ],
  },
};

export default function App() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
  }, []);

  const handlePrevious = () => {
    step > 1 && setStep((step) => step - 1);
  };

  const handleNext = () => {
    step < 3 && setStep((step) => step + 1);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          {lang === "eng" ? (
            <US
              onClick={() => {
                setLang((l) => "");
                window.localStorage.setItem("lang", "");
              }}
              width={50}
              className="flag"
            />
          ) : (
            <BR
              onClick={() => {
                setLang((l) => "eng");
                window.localStorage.setItem("lang", "eng");
              }}
              width={50}
              className="flag"
            />
          )}
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            {lang === "eng"
              ? `${data.eng.messages[step - 1]}`
              : `${data.pt.messages[step - 1]}`}
          </p>
          <div className="buttons">
            <Button
              bgColor={"tomato"}
              textColor={"black"}
              onClick={handlePrevious}
            >
              <span>👈🏻</span>
              {lang === "eng" ? data.eng["bt-1"] : data.pt["bt-1"]}
            </Button>
            <Button bgColor={"tomato"} textColor={"black"} onClick={handleNext}>
              {lang === "eng" ? data.eng["bt-2"] : data.pt["bt-2"]}
              <span>👉🏻</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
