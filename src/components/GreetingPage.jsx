import { useNavigate } from "react-router-dom";

function GreetingPage() {
  const navigate = useNavigate();

  return (
    <div className="gg-container">
      <div className="wlcom-g-container">
        <div className="start-container">
          <img src="/startg.png" alt="" />
        </div>
        <div className="heading-container">
          <h1>
            Immerse <br /> yourself in <br /> the world of <br /> Walmart{" "}
          </h1>
        </div>
        <div className="button-container-wlcm">
          <button onClick={() => navigate("/name")}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default GreetingPage;
