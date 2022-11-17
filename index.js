import axios from "axios";

const { data } = await axios.post("https://localhost:5000/translate", {
  q: "",
  source: "en",
  target: "fr",
  format: "text",
  api_key: "",
});

console.log(data);
