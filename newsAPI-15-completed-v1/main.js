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
let mode = 'default';
let url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
  `https://noona-times-v2.netlify.app/top-headlines`
);
buttons.forEach((item) =>
  item.addEventListener('click', function (event) {
    // console.log(event.target.innerHTML);
    console.log(event);
    mode = event.target.innerHTML;
    // console.log('mode: ', mode);
    //#1수정 시작
    // filter(event);
    getLatestNews(event);
    //#1수정 끝
  })
);
let category = 'default';
const API_KEY = `6a22436237a543f48ec9da4da2559d40`;
let newsList = [];
//수정이 시작되는 부분#2
let newsListRefined = [];
let categoryNewsList = [];
//수정이 끝나는 부분#2

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search.');
      }
      totalResults = data.totalResults;
      newsListRefined = refiner(data.articles);

      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
    // console.log('키워드 데이터: ', data);
    // console.log('키워드 데이터 아티클들: ', data.articles);
  } catch (e) {
    console.log('에러가 뭘까: ', e.message);
    errorRender(e);
  }
};
//

//

//

//

const getLatestNews = async (event) => {
  url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `https://noona-times-v2.netlify.app/top-headlines`
  );
  if (mode != 'default') {
    category = event.target.innerHTML.toLowerCase();
    // console.log('-----------------category 값: ', category);
    url += `?category=${category}`;
  } else {
  }
  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  // const url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  //   );

  //#4[v]수정이 끝나는 부분#4 누나API로 변경중 -> 변경완료
  // console.log('uuu1', url);
  getNews();
};

//

//

//

//

function refiner(array) {
  // console.log('refiner 안의 array: ', array);
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

//

//

//

//

//

//

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  // console.log('키워드: ', keyword);
  url = new URL( //이 URL을 인스턴스라고 부른다. URL에 필요한 함수와 변수들을 제공함
    `https://noona-times-v2.netlify.app/top-headlines?q=${keyword}`
  );
  getNews();
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
              ${news.description}
            </p>
            <div>${news.source.name} * ${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join('');
  // console.log('HTML 어떻게 생겼나 보자: ', newsListRefined);
  document.getElementById('news-board').innerHTML = newsHTML;
};

//

//

const paginationRender = () => {
  //totalResult = data.article.length
  //totalPage = Math.ceil????(totalResult/pageSize)
  //page = page
  //pageSize = 10
  //groupSize = 5
  //pageGroup = Math.ceil(page/groupSize)
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage = page
  const lastPage = pageGroup * groupSize;
  //fistPage
  const firstPage = lastPage - groupSize + 1;

  let paginationHTML = ``;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  document.querySelector('.pagination').innerHTML = paginationHTML;

  //   let reffer = `<nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  // </nav>`;
};

//

//

getLatestNews();

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>
`;
  document.getElementById('news-board').innerHTML = errorHTML;
};