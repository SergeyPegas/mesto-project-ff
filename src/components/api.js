const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "d01a5d98-e7ac-4056-9f10-13cce3bc45d8",
    "Content-Type": "application/json",
  },
};

// отправка GET запроса к серверу
function get(uri) {
  return fetch(config.baseUrl + uri, {
    headers: config.headers,
  }).then(handleResponse);
}

// запрос на получение информации о пользователе, используя функцию get() и метод GET
export function getMyInfoRequest() {
  return get("/users/me");
}

// запрос на получение информации о карточках, используя функцию get() и метод GET.
export function getCardsRequest() {
  return get("/cards");
}

// отправка POST запроса к серверу
function post(uri, data, method = "POST") {
  return fetch(config.baseUrl + uri, {
    method,
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

// обработка ответа от сервера, возвращает объект JSON если ответ успешен и промис с ошибкой в противном случае.
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
};

// запрос на удаление карточки, используя функцию post()
export function deleteCardRequest(cardId) {
  return post(`/cards/${cardId}`, {}, "DELETE");
}

// запрос на добавление новой карточки, используя функцию post()
export function addCardRequest(cardName, cardLink) {
  return post("/cards", {
    name: cardName,
    link: cardLink,
  });
}

// запрос на изменение данных профиля, используя функцию post() и метод PATCH.
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

// запрос на изменение аватара, используя функцию post() и метод PATCH.
export function changeAvatarRequest(inputLink) {
  return post(
    "/users/me/avatar",
    {
      avatar: inputLink,
    },
    "PATCH"
  );
}

// запрос на удаление лайка карточке, используя функцию post() и метод DELETE.
export function deleteLikeRequest(card) {
  return post(`/cards/likes/${card["_id"]}`, {}, "DELETE");
}

// запрос на добавление лайка карточке, используя функцию post() и метод PUT.
export function addLikeRequest(card) {
  return post(`/cards/likes/${card["_id"]}`, {}, "PUT");
}
