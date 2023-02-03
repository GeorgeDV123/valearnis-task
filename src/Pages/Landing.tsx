export function Landing() {
  return (
    //Landing Page
    <>
      <section className="landing-page">
        <div className="landing-box">
          <h1 className="landing-head">Mythology Quiz</h1>
          <p>
            Welcome to our fun mythology quiz! Please click on the button to
            continue on to the quiz area.
          </p>
          <button>
            <a href="/quiz">Quiz Time →</a>
          </button>
        </div>
      </section>
    </>
  );
}
