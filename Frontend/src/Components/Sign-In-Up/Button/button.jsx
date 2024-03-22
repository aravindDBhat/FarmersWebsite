function Button(Props) {
  return (
    <div className="me-2">
      <button
        onClick={() => {
          Props.func();
        }}
      >
        {Props.text}
      </button>
    </div>
  );
}
export default Button;
