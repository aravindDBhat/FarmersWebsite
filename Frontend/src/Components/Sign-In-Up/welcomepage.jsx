function Welcomepage(Props) {
  return (
    <div className="welcomepage">
      <h1>Welcome to</h1>
      <p>
        <i id="icon" className="fa-solid fa-leaf fa-2xl"></i>
        <br></br>
        <span>
          <b>Krishika Mitra</b>
        </span>
      </p>
      <p>Your Trusted Partner in Agriculture Innovation and Knowledge.</p>
      <a href={Props.link}>
        <button className="hidden">{Props.pageType}</button>
      </a>
    </div>
  );
}
export default Welcomepage;
