const express = require("express");
const app = express();
const port = 3001;
const unirest = require("unirest");
const cors = require("cors");
app.use(cors({ origin: "*" }));
const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://api.twinword.com/api/word/associations/latest/",
//   params: { entry: "sound" },
//   headers: {
//     "X-RapidAPI-Key":
//       "UJIdc06ZjAOz6ai2XQoaxedAr1PyoJcujm2GU3qdNn1sqbL1BRiGztamu5JXvBsljEmlFsVTXQLLoCeLv2Bxgw==",
//     "X-RapidAPI-Host": "twinword-word-associations-v1.p.rapidapi.com",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

app.get("/api/associations/:word", (req, res) => {
  const request = unirest(
    "GET",
    "https://api.twinword.com/api/word/associations/latest/"
  );
  request.query({ entry: req.params.word });
  request.headers({
    "x-rapidapi-host": "api.twinword.com",
    "x-rapidapi-key":
      "UJIdc06ZjAOz6ai2XQoaxedAr1PyoJcujm2GU3qdNn1sqbL1BRiGztamu5JXvBsljEmlFsVTXQLLoCeLv2Bxgw==",
    useQueryString: true,
  });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    res.json(response.body.associations_scored || {});
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
