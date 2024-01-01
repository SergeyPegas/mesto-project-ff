import { addLikeRequest, deleteLikeRequest } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  card,
  deleteFunc,
  openPopupCardFunc,
  likeFunc,
  myId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.id = card["_id"];

  if (myId !== card.owner["_id"]) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteFunc(card);
    });
  }

  if (checkMyLike(card, myId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  cardImage.addEventListener("click", openPopupCardFunc);

  cardLikeButton.addEventListener("click", () => {
    likeFunc(card, myId, cardElement);
  });

  return cardElement;
}


export function likeCard(card, myId, cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-counter");

  if (checkMyLike(card, myId)) {
    deleteLikeRequest(card)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
        card.likes = res.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeRequest(card)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.add("card__like-button_is-active");
        card.likes = res.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


function checkMyLike(card, myId) {
  return card.likes.some((item) => item["_id"] === myId);
}
