import React, { useState, useEffect } from "react";

function FetchQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
    const intervalID = setInterval(() => {
      getQuote();
    }, 24 * 60 * 60 * 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  function getQuote() {
    fetch("http://quotes.rest/qod.json?category=inspire")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
      });
  }
  return (
    <>
      <h5 className="poruka mt-5"> Порука дана:</h5>
      <h5 className="lead-txt">"{quote}"</h5>
      <p className="lead-txt">- {author}</p>
    </>
  );
}
export default FetchQuote;
