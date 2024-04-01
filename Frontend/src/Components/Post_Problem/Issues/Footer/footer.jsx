function Footer() {
  return (
    <div className="issueFooter">
      <a href="/createpost">
        <button>Post Issue</button>
      </a>{" "}
      <div className="footerserachbar">
        <input
          className="footersearch"
          placeholder="Search for Issue"
          type="text"
        />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}
export default Footer;
