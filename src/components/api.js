const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "d01a5d98-e7ac-4056-9f10-13cce3bc45d8",
    "Content-Type": "application/json",
  },
};


function get(uri) {
  return fetch(config.baseUrl + uri, {
    headers: config.headers,
  }).then(handleResponse);
}


function post(uri, data, method = "POST") {
  return fetch(config.baseUrl + uri, {
    method,
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}


const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
};


export function deleteCardRequest(cardId) {
  return post(`/cards/${cardId}`, {}, "DELETE");
}


export function addCardRequest(cardName, cardLink) {
  return post("/cards", {
    name: cardName,
    link: cardLink,
  });
}


export function changeProfileInfoRequest(profileName, profileDescription) {
  return post(
    "/users/me",
    {
      name: profileName,
      about: profileDescription,
    },
    "PATCH"
  );
}


export function changeAvatarRequest(inputLink) {
  return post(
    "/users/me/avatar",
    {
      avatar: inputLink,
    },
    "PATCH"
  );
}


export function getMyInfoRequest() {
  return get("/users/me");
}


export function getCardsRequest() {
  return get("/cards");
}


export function deleteLikeRequest(card) {
  return post(`/cards/likes/${card["_id"]}`, {}, "DELETE");
}


export function addLikeRequest(card) {
  return post(`/cards/likes/${card["_id"]}`, {}, "PUT");
}
