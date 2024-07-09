const openSearchBox = () => {
  let inputArea = document.getElementById('input-area');
  if (inputArea.style.display === 'inline') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'inline';
  }
};

const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
///////////////////////////////////////////////////////////////////////
let newsList = [];
//수정이 시작되는 부분#2
let newsListRefined = [];
//수정이 끝나는 부분#2
const getLatestNews = async () => {
  const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  console.log('uuu', url);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log('ddddd', newsList);
  //수정 시작부분#1
  newsListRefined = newsList.map((item) => {
    if (!item.content) {
      item.content = '제목이 곧 내용이며 추가적인 내용이 없습니다.';
    }
    if (item.content.length >= 200) {
      item.content = item.content.slice(0, 200) + '...';
    }
    if (!item.urlToImage) {
      item.urlToImage =
        'https://images.chosun.com/resizer/_nUJsPvW2sWkjkBAnfqk7zr_59k=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WCHDFTHCT5WR3GWBGNTRH43U2Q.jpg';
    }
    if (!item.source) {
      item.source = 'no Source';
    }
    item.publishedAt =
      item.publishedAt + ' -- ' + moment(item.publishedAt).fromNow();
    return item;
  });
  //수정 끝 부분#1

  render();
};

const render = () => {
  const newsHTML = newsListRefined
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-image-size"
              src=${news.urlToImage}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${news.content}
            </p>
            <div>${news.source.name} * ${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join('');
  console.log('HTML 어떻게 생겼나 보자: ', newsListRefined);
  document.getElementById('news-board').innerHTML = newsHTML;
};
getLatestNews();

