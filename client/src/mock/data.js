import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: '无忧面经', // e.g: 'Name | Developer'
  lang: '', // e.g: en, es, fr, jp
  description: '', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'FANG面经集合',
  //name: 'Fang机经',
  subtitle: '梦想开始的地方',
  cta: '',
};

// ABOUT DATA
export const aboutData = {
  img: 'hiring1.png',
  paragraphOne: '本网站主要目的是帮助大家准备FANG公司的面试。',
  paragraphTwo: '网站内容来自互联网。更新频率为每天。请大家好好珍惜。',
  paragraphThree: '祝大家面试愉快。',
  //resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'google.png',
    title: 'Google',
    company: 'Google',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'facebook.png',
    title: 'Facebook',
    company: 'Facebook',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'amazon.png',
    title: 'Amazon',
    company: 'Amazon',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'netflix.png',
    title: 'Netflix',
    company: 'Netflix',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  }
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: '',
  email: '',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: '',
    },
    {
      id: nanoid(),
      name: 'codepen',
      url: '',
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: '',
    },
    {
      id: nanoid(),
      name: 'github',
      url: '',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
