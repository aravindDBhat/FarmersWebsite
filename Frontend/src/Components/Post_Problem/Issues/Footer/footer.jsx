function Footer(props) {
  return (
    <div className="issueFooter">
      <a href="/createpost">
        <button>Post Issue</button>
      </a>{" "}
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
