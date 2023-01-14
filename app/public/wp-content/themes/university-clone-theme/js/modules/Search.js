import $ from "jquery";
class Search {
  constructor() {
    this.addSearch();
    this.resultsDiv = $("#search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.typingTimer;
    this.previousValue;
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typing.bind(this));
  }

  typing() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }

  getResults() {
    $.getJSON(
      uniData.root_url +
        "/wp-json/university/v1/search?term=" +
        this.searchField.val(),
      (results) => {
        this.resultsDiv.html(
          `
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${
              results.generalInfo.length
                ? '<ul class="min-list link-list">'
                : "<p>No general information.</p>"
            }
            ${results.generalInfo
              .map(
                (result) =>
                  `<li>
                    <a href="${result.permalink}">${result.title}</a>
                    ${result.type == "post" ? `by: ${result.authorName}` : ""}
                  </li>`
              )
              .join("")}
            ${results.generalInfo.length ? "</ul>" : ""}
          </div>
          <div class="one-third">
            <h2>Programs</h2>
            ${
              results.programs.length
                ? '<ul class="min-list link-list">'
                : "<p>No Programs information.</p>"
            }
            ${results.programs
              .map(
                (result) =>
                  `<li>
                    <a href="${result.permalink}">${result.title}</a>
                  </li>`
              )
              .join("")}
            ${results.programs.length ? "</ul>" : ""}
            <h2>Professors</h2>
            ${
              results.professors.length
                ? '<ul class="professor-cards">'
                : "<p>No Professors information.</p>"
            }
            ${results.professors
              .map(
                (result) =>
                  `<li class="professor-card__list-item">
                    <a class="professor-card"  href="${result.permalink}">
                    <img class="professor-card__image" src="${result.thumbnail_url}" />
                    <span class="professor-card__name">
                        ${result.title}
                    </span>
                    </a>
                  </li>`
              )
              .join("")}
            ${results.professors.length ? "</ul>" : ""}
          </div>
          <div class="one-third">
            <h2>Campuses</h2>
            ${
              results.campuses.length
                ? '<ul class="min-list link-list">'
                : "<p>No Campuses information.</p>"
            }
            ${results.campuses
              .map(
                (result) =>
                  `<li>
                    <a href="${result.permalink}">${result.title}</a>
                  </li>`
              )
              .join("")}
            ${results.campuses.length ? "</ul>" : ""}
            <h2>Events</h2>
            ${
              results.events.length
                ? '<ul class="min-list link-list">'
                : "<p>No Event information.</p>"
            }
            ${results.events
              .map(
                (result) =>
                  `
                  <div class="event-summary">
                    <a class="event-summary__date t-center" href="${
                      result.permalink
                    }">
                        <span class="event-summary__month">
                            ${result.eventMonth}
                        </span>
                        <span class="event-summary__day">
                            ${result.eventDay}
                        </span>
                    </a>
                    <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a
                                href="${result.permalink}">${
                    result.title
                  }</a></h5>
                        <p>
                           ${result.excerpt ? result.excerpt : result.content}
                            <a href="${
                              result.permalink
                            }" class="nu gray">Learn more</a>
                        </p>
                    </div>
                </div>
                  `
              )
              .join("")}
            ${results.events.length ? "</ul>" : ""}
          </div>
        </div>
        `
        );
      }
    );

    /* $.when(
      $.getJSON(
        uniData.root_url +
          "/wp-json/wp/v2/posts?search=" +
          this.searchField.val()
      ),
      $.getJSON(
        uniData.root_url +
          "/wp-json/wp/v2/pages?search=" +
          this.searchField.val()
      )
    )
      .then((posts, pages) => {
        var combine = posts[0].concat(pages[0]);
        this.resultsDiv.html(
          `
          <h2>General Information</h2>

            ${
              combine.length
                ? '<ul class="min-list link-list">'
                : "<p>No general information.</p>"
            }
            ${combine
              .map(
                (result) =>
                  `<li>
                    <a href="${result.link}">${result.title.rendered}</a>
                    ${result.type == "post" ? `by: ${result.authorName}` : ""}
                  </li>`
              )
              .join("")}
            ${combine.length ? "</ul>" : ""}
          `
        );
        this.isSpinnerVisible = false;
      })
      .catch(() => {
        this.resultsDiv.html(
          "<p>Unexpected error; Please try again later.</p>"
        );
      }); */
    /* $.getJSON(
      uniData.root_url +
        "/wp-json/wp/v2/posts?search=" +
        this.searchField.val(),
      (posts) => {
        $.getJSON(
          uniData.root_url +
            "/wp-json/wp/v2/pages?search=" +
            this.searchField.val(),
          (pages) => {
            var combine = posts.concat(pages);
            this.resultsDiv.html(
              `
          <h2>General Information</h2>

            ${
              combine.length
                ? '<ul class="min-list link-list">'
                : "<p>No general information.</p>"
            }
            ${combine
              .map(
                (result) =>
                  `<li>
                    <a href="${result.link}">${result.title.rendered}</a>
                  </li>`
              )
              .join("")}
            ${combine.length ? "</ul>" : ""}
          `
            );
            this.isSpinnerVisible = false;
          }
        );
      }
    ); */
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
    }
    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.trigger("focus"), 301);
    this.isOverlayOpen = true;
    return false;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  addSearch() {
    $("body").append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
          <div class="container">
              <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
              <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
              <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
      </div>
      <div class="container">
          <div id="search-overlay__results"></div>
      </div>
  </div>
    `);
  }
}

export default Search;
