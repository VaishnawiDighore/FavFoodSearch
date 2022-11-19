import React from "react";
import { useState, useEffect } from "react";
import { Req } from "../keys";
import { Stack } from "@mui/material";
import FavFood from "./FavFood";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";

const FoodCard = () => {
  const [foodlist, setFoodlist] = useState("");
  const [findclick, setFindclick] = useState(false);
  const [start, setStart] = useState(false);
  const [value, setValue] = useState("chicken");

  useEffect((_) => {
    (async (_) => {
      const response = await Req.get(`?q=chicken`);
      setFoodlist(response.data.hits);
      setStart(true);
      console.log("Vaishu");
    })();
  }, []);

  useEffect(
    (_) => {
      if (findclick === true) {
        (async (_) => {
          const response = await Req.get(`?q=${value}`);
          console.log(response.data.count);
          if (response.status === 200 && response.data.count > 0) {
            setFoodlist(response.data.hits);
            setStart(true);
          } else {
            setStart(false);
          }
        })();
      }
      //  eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [findclick, value]
  );

  const input = (e) => {
    const input_value = e.target.value;
    setValue(input_value);
  };
  const submit_input = (_) => {
    if (value !== "") {
      setFindclick(true);
      setTimeout((_) => {
        setFindclick(false);
      }, 5000);
    }
  };

  return (
    <>
      <Stack className="title">
        <Typography variant="v6" color="white">
          Your Fav Recipe App
        </Typography>
      </Stack>
      <Stack direction="row" className="searchBtn">
        <input
          type="text"
          onKeyUp={input}
          placeholder="Search Recipe"
        />
        <button onClick={submit_input}>Search</button>
      </Stack>
      <p
        className={
          start === false && findclick === true && value !== "chicken"
            ? "notfound"
            : "notfound none"
        }
        sx={{ color: "green" }}
      >
      </p>

      
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Masonry columns={6} spacing={2}>
          {start === true
            ? foodlist.map((data, idx) => {
                return (
                  <>
                    <FavFood key={idx} data={data} />
                  </>
                );
              })
            : ""}
        </Masonry>
      </div>
    </>
  );
};

export default FoodCard;
