const fetchGet = async (url) => {
  const data = await fetch(
    // `https://europe-west3-kokodarts-native.cloudfunctions.net/app/${url}`,
    `http://192.168.0.102:5002/${url}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
  return data;
};

export default fetchGet;
