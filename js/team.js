const openItem = item => {
  const container = item.closest(".humans__item");
  const contentBlock = container.find(".human__desc-class");
  const textBlock = contentBlock.find(".human__desc-class-block");
  const reqHeigh = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeigh);
}

const closedEveryItem = container => {
  const items = container.find('.human__desc-class');
  const itemContainer = container.find(".humans__item");

  itemContainer.removeClass("active")
  items.height(0);
}

$('.human__desc-name').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.humans');
  const elemContainer = $this.closest(".humans__item");

  if (elemContainer.hasClass("active")) {
    closedEveryItem(container);
  } 
   else {
    closedEveryItem(container);
    openItem($this);
    }
});