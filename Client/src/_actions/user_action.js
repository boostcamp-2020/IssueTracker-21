export async function auth() {
  const request = await axios.get("/api/user/auth").then((res) => res.data);
  //console.log(request);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
