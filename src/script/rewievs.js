const findBlockByAlias = alias => {
  return $(".rewievs__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  })
}

$(".interactive-avatar__link").click(e=> {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias (target);
  const curItem = $this.closest(".rewievs__switcher-item");

  itemToShow.addClass("active--class").siblings().removeClass("active--class")
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");

});