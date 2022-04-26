import { Challenge } from '../models';

export const challenges: Challenge[] = [
  {
    challenge_id: 1,
    name: 'Intro section with dropdown navigation',
    isNew: true,
    isFree: true,
    description:
      'This challenge will test your ability to create dropdown navigation menus, a common pattern on larger sites. It will also provide some nice basic layout challenges.',
    level: 'Junior',
    techStacks: ['HTML', 'CSS', 'JS'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/rlaxdjplmeul4qe1qvh6.jpg',
  },
  {
    challenge_id: 2,
    name: 'In-browser markdown editor',
    isPremium: true,
    description:
      "In this project, you'll build a fully-functional in-browser markdown editor application with a light/dark mode toggle. It's also perfect to build as a full-stack app!",
    level: 'Intermediate',
    techStacks: ['HTML', 'CSS', 'JS'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/r2w3h15oximza3p1baqt.jpg',
  },
  {
    challenge_id: 3,
    isFree: true,
    name: 'Interactive rating component',
    description:
      'This is a nice, small project to practice handling user interactions and updating the DOM. Perfect for anyone who has learned the basics of JavaScript!',
    level: 'Newbie',
    techStacks: ['HTML', 'CSS', 'JS'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/hxx2bhmtmeelt0a98zos.jpg',
  },

  {
    challenge_id: 4,
    isPremium: true,
    name: 'Entertainment web app',
    description:
      'This multi-page entertainment web app will have you working with JSON data, routing, state management, and search functionality.',
    level: 'Advanced',
    techStacks: ['HTML', 'CSS', 'JS'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/maz79cid0jllq0js0qyi.jpg',
  },

  {
    challenge_id: 5,
    isFree: true,
    name: 'Advice generator app',
    description:
      "The perfect project if you're learning how to interact with 3rd-party APIs. This challenge uses the Advice Slip API to generate random quotes of advice.",
    level: 'Junior',
    techStacks: ['HTML', 'CSS', 'JS', 'API'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/sfl8uqvq75wnnr559ksp.jpg',
  },

  {
    challenge_id: 6,
    name: 'Suite landing page',
    isPremium: true,
    description:
      'This small-ish HTML and CSS only landing page includes some interesting layout decisions. Perfect if you want to put your layout and responsive skills to the test!',
    level: 'Junior',
    techStacks: ['HTML', 'CSS'],
    image:
      'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/mflwrbyf8kjvqvpxq9uj.jpg',
  },
];
