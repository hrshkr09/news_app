
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FetchData = ({cat}) => {
  const [data, setData] = useState("");
  const fetchData = async () => {
    await axios
      .get(
        cat ?`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=747b17d308f146c1be8bc7e6d995f055`:
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=747b17d308f146c1be8bc7e6d995f055"
      )
      .then((res) => setData(res.data.articles));
  };
  useEffect(() => {
    fetchData();
  }, [cat]);
  return (
    <div className="container my-4" >
      <h3>
        <u>TOP HEADLINES</u>
      </h3>
      <div className="container d-flex justify-content-center align-items-center flex-column my-3"
      style={{minHeight:"100vh"}} >
        {data
          ? data.map((items,index) => (
              <React.Fragment key={items.publishedAt}>
                <div  className="container my-3 p-3" style={{ width: "700px",boxShadow:"2px 2px 10px silver",borderRadius:"10px"}} >
                  <h5 className="my-2">{items.title}</h5>
                  <div className=" d-flex justify-content-center align-items-center">
                    <img
                      src={items.urlToImage}
                      alt="image not found"
                      className="img-fluid "
                      style={{ width:"100%" ,height: "300px", objectFit: "cover" }}
                    />
                  </div>

                  <p className="my-1">{items.content}</p>
                  <Link
                    to={items.url}
                    target="_blank"
                    style={{ cursor: "pointer" }}
                  >
                    view more
                  </Link>
                </div>
              </React.Fragment>
            ))
          : "LOADING..."}
      </div>
    </div>
  );
};

export default FetchData;

