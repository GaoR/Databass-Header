import http from "k6/http";
import { check } from "k6";

const randomNumber = (max, min = 0) => Math.floor(Math.random() * (min - max + 1)) + max;

export let options = {
  stages: [
    {duration: "15s", target: 50},
    {duration: "15s", target: 100},
    {duration: "1m30s", target: 100}
  ]
};

export default function() {
  let res = http.get(`http://127.0.0.1:3004/artists/${randomNumber(9100000, 9000000)}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};