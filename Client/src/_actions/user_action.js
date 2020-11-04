export async function auth() {
  const request = await axios.get("/api/user/auth").then((res) => {
    console.log(res.data);
  });
  //console.log(request);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
