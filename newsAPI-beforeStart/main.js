// const API_KEY = `6a22436237a543f48ec9da4da2559d40`;
// // function getNews() {
// async function getNews() {
//   const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//   );
//   console.log('uuu', url);
//   //   const response = fetch(url);
//   const response = await fetch(url);
//   console.log('rrr', response);
// }

// getNews();
// for (let i = 0; i < 20; i++) {
//   console.log('after', i);
// }

const API_KEY = `6a22436237a543f48ec9da4da2559d40`;
let news = [];
const getLatestNews = async () => {
  const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  console.log('uuu', url);
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('ddddd', news);
};

getLatestNews();
