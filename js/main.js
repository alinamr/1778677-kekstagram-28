const FOTO_DESCRIPTION_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_ID_FOTO = 1;
const MAX_ID_FOTO = 25;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const NAMES = [
  'Илья',
  'Ульяна',
  'Мария',
  'Игорь',
  'Виктор',
  'Юлия',
  'Светлана',
  'Владимир',
  'Михаил',
  'Егор',
  'Виктория',
];

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ',
  'В конце концов это просто непрофессионально. ',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. ',
  'Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION = [
  'Если смогу, я сделаю это. Конец истории',
  'Смейтесь как только умеете, любите столько, сколько живете',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон',
  'Улыбка — единственный тренд в моде, который актуален всегда',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой',
  'Всегда начинайте свой день с хороших людей и кофе',
  'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе',
  'Живите во всех тех моментах, которые вы не можете выразить словами.',
  'Не ждите идеального момента. Берите каждый момент и делайте его идеальным',
  'Я пыталась заниматься йогой, но в позе лотоса уснула',
  'Я, возможно, никогда не буду лучшей, но я стараюсь быть лучшей твоей',
  'Никогда не позволяйте никому скучать',
  'Все только начинает становиться действительно хорошим',
  'Утром, только одна хорошая мысль меняет смысл целого дня',
  'Мне нравится и улыбаюсь!',
  'Не заботьтесь ни о чем, больше улыбайтесь',
  'Я не ленивый. Просто у меня нет мотивации',
  'Лучшее еще впереди',
  'Мне нравится думать, что я на диете. Как же это ужасно!',
  'Выходные, пожалуйста, не оставляйте меня сейчас!',
  'В простоте есть удивительная красота.',
  'Правило жизни: никогда не проверяйте глубину воды обеими ногами',
  'Доброе утро, всем! Теперь давайте начнем стресс!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedID = 0;
  return () => {
    lastGeneratedID += 1;
    return lastGeneratedID;
  };
};
const generateCommentId = createIdGenerator();

const createFotoDescriptionObject = () => ({
  id: createRandomIdFromRangeGenerator(MIN_ID_FOTO, MAX_ID_FOTO)(),
  url: `photos/${createRandomIdFromRangeGenerator(MIN_ID_FOTO, MAX_ID_FOTO)()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  },
});


const getFotoDescriptionObjects = () => Array.from({length: FOTO_DESCRIPTION_COUNT}, createFotoDescriptionObject);

getFotoDescriptionObjects();
