const fetchPost = async (url, body) => {
  console.log("BODY", body);

  const data = await fetch(
    // `https://europe-west3-kokodarts-native.cloudfunctions.net/app/${url}`,
    `http://192.168.0.102:5002/${url}`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
  return data;
};

export default fetchPost;
