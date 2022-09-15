//Form
let elForm = document.querySelector(".js-search-form");
let elSearchInp = document.querySelector(".js-form-input-search");
let elTypeSelect = document.querySelector(".js-form-type");

//SearchList
let elRenderList = document.querySelector(".js-search-list");

//Template
let elTemplate = document.querySelector("#template-item").content;

//Modal
let elmodalTitle = document.querySelector(".modal-title");
let elmodalContent = document.querySelector(".modal-body");

//Spiner
let elSpinner = document.querySelector(".movies__spinner");

//Page
let elBtnsPege = document.querySelectorAll(".js-btns-page");
let elResultPage = document.querySelector(".result-page");
let page = 1;

//ApiLink
let dataFilms = async (films, p, type) => {
  try {
    let response = await fetch(`https://www.omdbapi.com/?s=${films}&page=${page}&type=${type}&apikey=962e287c`)
    let data = await response.json();
    renderSearch(data.Search);
  } catch {
    error("Film topilmadi!!");
  }
  finally {
    spinnerAdd()
  }
}

//error

function error(err) {
  elRenderList.innerHTML = "";

  elRenderList.innerHTML = `
  <li class="alert alert-info">
  <p class="m-0">${err}</p>
  </li>
  `;
}

//SPINNER
function spinnerRemove() {
  elSpinner.classList.remove("d-none");
}
//SPINNER
function spinnerAdd() {
  elSpinner.classList.add("d-none");
}
spinnerRemove()


//RenferMovie
const renderSearch = datum => {
  elRenderList.innerHTML = "";

  let documentFragmet = document.createDocumentFragment();
  renderModal(datum)
  datum.forEach(data => {

    let elTemp = elTemplate.cloneNode(true);
    elTemp.querySelector(".js-card").dataset.imdbID = data.imdbID
    elTemp.querySelector(".js-card-img").src = data.Poster;
    elTemp.querySelector(".card-title").textContent = data.Title;
    elTemp.querySelector(".card-year").textContent = `Year: ${data.Year}`;
    elTemp.querySelector(".card-category").textContent = `Category: ${data.Type}`;

    documentFragmet.append(elTemp);
  })
  elRenderList.appendChild(documentFragmet);
};

//Page ==
let inputValue = "madagascar";
let selectValue = "movie"
spinnerRemove()
dataFilms(inputValue, page, selectValue);


//SearchSubmit
elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  elRenderList.innerHTML = ""
  spinnerRemove()

  page = 1;

  inputValue = elSearchInp.value.trim().toLowerCase();
  selectValue = elTypeSelect.value;


  dataFilms(inputValue, page, selectValue)

  elSearchInputValue = "";
});



//Modall

function renderModal(data) {
  elRenderList.addEventListener("click", (evt) => {
    if (evt.target.matches(".js-btn-card")) {
      let imdbId = evt.target.closest(".js-card").dataset.imdbID;

      let find = data.find(movie => movie.imdbID === imdbId);

      elmodalTitle.textContent = find.Title

      elmodalContent.innerHTML = `
      <div class="d-flex">
       <img src="${find.Poster} width="500" height="300">
       <div class="ms-3">
        <p class="h5 m-0 p-2 alert alert-secondary">Year: "${find.Year}"</p>
        <p class="h5 my-3 m-0 p-2 alert alert-secondary">Type: "${find.Type}"</p>
        <a href="https://www.imdb.com/title/${find.imdbID}/?ref_=hm_fanfav_tt_i_2_pd_fp1" target="blank">${find.Title} link</a>
       </div>
      </div>
      `
    }
  })
};

//page
elBtnsPege.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent == "Back") {
      if (page > 1) {
        --page;
        elResultPage.textContent = page;
        dataFilms(inputValue, page, selectValue);
      }
    }
    else {
      ++page
      elResultPage.textContent = page;
      dataFilms(inputValue, page, selectValue);
    }
  })
})

