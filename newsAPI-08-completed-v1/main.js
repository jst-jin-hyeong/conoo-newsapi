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
let buttons = document.querySelectorAll('.menus > button');
buttons.forEach((item) =>
  item.addEventListener('click', function (event) {
    console.log(event.target.innerHTML);
    filter(event);
  })
);
let category = 'default';
const API_KEY = `6a22436237a543f48ec9da4da2559d40`;
let newsList = [];
//수정이 시작되는 부분#2
let newsListRefined = [];
let categoryNewsList = [];
//수정이 끝나는 부분#2
const getLatestNews = async () => {
  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  // const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  //   );

  const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );
  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  console.log('uuu', url);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log('ddddd', newsList);
  //수정 시작부분#1
  newsListRefined = refiner(newsList);
  render();
};

function refiner(array) {
  console.log('refiner 안의 array: ', array);
  let results = array.map((item) => {
    if (!item.description) {
      item.description = '제목이 곧 내용이며 추가적인 내용이 없습니다.';
    }
    if (item.description.length >= 200) {
      item.description = item.description.slice(0, 200) + '...';
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
    // //#5. 이미지 fetch 검증으로 404일 때도 이미지 바꾸기 수정해보는 중 - 시작
    // async function checkImage() {
    //   try {
    //     console.log('이미지체크 시작');
    //     let imgTestURL = new URL(item.urlToImage);
    //     let responseImgTest = await fetch(imgTestURL);
    //     let dataNew = await responseImgTest.json();
    //     console.log('이미지체크 확인: ', dataNew);
    //   } catch (e) {
    //     console.log('체크 및 보완 시작----------------');
    //     item.urlToImage =
    //       'https://images.chosun.com/resizer/_nUJsPvW2sWkjkBAnfqk7zr_59k=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WCHDFTHCT5WR3GWBGNTRH43U2Q.jpg';

    //     console.log(item.urlToImage);
    //     console.log(item.title);
    //     console.log(e.message);
    //     console.log('체크 및 보완 끝----------------');
    //   }
    // }
    // checkImage();
    // //#5. 이미지 fetch 검증으로 404일 때도 이미지 바꾸기 수정해보는 중 - 끝

    return item;
  });
  return results;
}

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
              ${news.description}
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

async function filter(event) {
  if (event) {
    category = event.target.innerHTML;
    console.log('category 값: ', category);
    await categoryNews(category);
  }
}

const categoryNews = async (category) => {
  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  // const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  //   );

  const categoryUrl = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=${category}`
  );
  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  console.log('category News의 category: ', category);
  console.log('uuu category url: ', categoryUrl);
  const categoryResponse = await fetch(categoryUrl);
  const categoryData = await categoryResponse.json();
  categoryNewsList = categoryData.articles;
  console.log('ddddd category: ', categoryNewsList);
  //수정 시작부분#1
  newsListRefined = refiner(categoryNewsList);
  render();
};
