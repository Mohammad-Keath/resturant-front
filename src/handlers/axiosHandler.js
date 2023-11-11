import axios from "axios";
import Cookies from "js-cookie";


export async function axiosHandler(method, path, data) {
  const url = "http://localhost:4000" + path;
  const token = Cookies.get("user_token");
  const response = await axios({
    method: method,
    url: url,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: data,
  });
  return response;
}
