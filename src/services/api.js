export const BASE_URL = "https://animeland.appanimeplus.tk/videoweb";

export const Controller = {
  createImageURL: ({ uri }) => "https://cdn.appanimeplus.tk/img/" + uri,
  searchAnime: ({ query }) =>
    fetch(BASE_URL + `/api.php?action=searchvideo&searchword=${query}`).then(
      (res) => res.json()
    ),
  getTrendingCategory: () =>
    fetch(BASE_URL + "/api.php?action=trendingcategory&items=10").then((res) =>
      res.json()
    ),
  getReleases: () =>
    fetch(BASE_URL + "/api.php?action=latestvideos").then((res) => res.json()),
  getDubbed: () =>
    fetch(
      BASE_URL + "/api.php?action=searchgenre&searchword=dublado&items=10"
    ).then((res) => res.json()),
  getMoovies: () =>
    fetch(
      BASE_URL + "/api.php?action=searchgenre&searchword=filme&items=10"
    ).then((res) => res.json()),
  getAnimeDetail: ({ categoryId }) =>
    fetch(
      BASE_URL + `/api.php?action=viewcategory&categoryid=${categoryId}`
    ).then((res) => res.json()),
  getAnimeEpisodes: ({ categoryId }) =>
    fetch(
      BASE_URL + `/api.php?action=category_videos&category_id=${categoryId}`
    ).then((res) => res.json()),
};
