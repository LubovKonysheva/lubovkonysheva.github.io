let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.751285, 37.600766],
    zoom: 14,
    controls: [],
});

const coords = [
  [55.758696, 37.582344],
  [55.757849, 37.626111],
  [55.749427, 37.605511],
  [55.744596, 37.581264],
];

const myCollection = new ymaps.GeoObjectCollection({}, {
  draggable: false,
  iconLayout: 'default#image',
  iconImageHref: "img/design/marker.png",
  iconImageSize: [46, 57],
  iconImageOffset: [-35, -52],
});

coords.forEach(coord => {
  myCollection.add(new ymaps.Placemark(coord));
});

myMap.geoObjects.add(myCollection);

myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);