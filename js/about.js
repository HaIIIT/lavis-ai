export function init() {
  const cards = document.querySelectorAll(".team-card");
  cards.forEach(card => {
    const activate = () => {
      cards.forEach(item => item.classList.remove("selected"));
      card.classList.add("selected");
    };
    card.addEventListener("click", activate);
    card.querySelector(".team-more")?.addEventListener("click", activate);
  });
}
