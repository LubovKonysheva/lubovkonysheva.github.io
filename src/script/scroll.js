const sections = $(".section");
const display = $(".maincontent");
const sideMenus = $(".fixed-menu");
const body = document.body;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobiles = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  return sectionEq * -100;
}

const changeMenuThemeForSection = (sectionEq) => {
  const currentSections = sections.eq(sectionEq);
  const menuTheme = currentSections.attr("data-sidemenu-theme");
  const activeClasssideMenu = "fixed-menu--shadowed";

  if (menuTheme === "white") {
    sideMenus.addClass(activeClasssideMenu);
  } else {
    sideMenus.removeClass(activeClasssideMenu);
  }
};

const performTransition = (sectionEq) => {

  if (inScroll === false) {
    inScroll = true;
    const position = countSectionPosition(sectionEq);

    const transitionOver = 1000;
    const mouseInertialOver = 300;


    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`,
    });

    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

    setTimeout(() => {
      inScroll = false;
      sideMenus.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
    }, transitionOver + mouseInertialOver);
  }
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next () {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev () {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }

}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38: //prev
      scroller.prev();
      break;
  
      case 40: //next
      scroller.next();
      break;
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target =$this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

 performTransition(reqSection.index()); 
});

if (isMobiles) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe({
  swipe: function (event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction === "up") scrollDirection = "next";
    if (direction === "down") scrollDirection = "prev";

    scroller[scrollDirection]();
  },
});
};

