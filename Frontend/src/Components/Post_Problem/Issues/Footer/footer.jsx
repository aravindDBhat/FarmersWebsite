function Footer(props) {
  let Token = localStorage.getItem("Token");
  Token = JSON.parse(Token);
  console.log("here : ", typeof Token.type);
  return (
    <div className="issueFooter">
      {Token.type && Token.type == "1" ? (
        <a href="/createpost">
          <button>Post Issue</button>
        </a>
      ) : (
        <a href="/createpost">
          <button>Post Solution</button>
        </a>
      )}

      <div className="footerserachbar">
        <input
          onChange={props.function}
          className="footersearch"
          placeholder="Search for Issue"
          type="text"
        />
        <button onClick={props.function2} type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}
export default Footer;
