// import { Resource } from '../models';

// export const resources: Resource[] = [
//   {
//     resouce_id: 1,
//     name: 'freeCodeCamp',
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS'],
//     description: `Offering some amazing tracks, freeCodeCamp is one of the top resources for learning HTML, CSS and JavaScript online. Plus...it's free! Can't really argue with that.`,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Ffreecodecamp.png&w=640&q=75',
//     href: 'https://www.freecodecamp.org/',
//   },
//   {
//     resouce_id: 2,
//     name: 'Beginner Javascript',
//     techStacks: ['JS'],
//     resourceType: 'Online Courses',
//     description: `
//     A fun, exercise heavy approach to learning modern JavaScript from scratch taught by Wes Bos.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fbeginner-js.png&w=640&q=75',
//     href: 'https://beginnerjavascript.com/',
//   },
//   {
//     resouce_id: 3,
//     name: 'Egghead',
//     resourceType: 'Online Courses',
//     techStacks: ['JS', 'HTML', 'CSS', 'GENERAL'],
//     description: `
//     A fun, exercise heavy approach to learning modern JavaScript from scratch taught by Wes Bos.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fegghead.png&w=1080&q=75',
//     href: 'https://egghead.io/',
//   },

//   {
//     resouce_id: 4,
//     name: 'Codecademy',
//     price: 'FREE - $19.99/MO',
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS'],
//     description: `
//     Codecademy offers a number of free lessons for a variety of languages. To get the full courses, you typically need to sign up to the pro membership. But you can get a lot of learning done for free.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fcodecademy.png&w=1080&q=75',
//     href: 'https://www.codecademy.com/',
//   },

//   {
//     resouce_id: 5,
//     name: 'Treehouse',
//     price: '$24/MO+',
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS', 'GENERAL'],
//     description: `Treehouse offers a wide range of high-quality learning tracks. You can learn anything from front-end development to UX design to back-end development and lots more in between!`,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Ftreehouse.png&w=1080&q=75',
//     href: 'https://teamtreehouse.com/',
//   },

//   {
//     resouce_id: 6,
//     name: 'Udacity',
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS'],
//     description: `
//     Udacity offers an incredible array of free individual courses. They also offer paid nanodegree programmes if you're looking for something with more structure.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fudacity-1.png&w=1080&q=75',
//     href: 'https://udacity.com/',
//   },

//   {
//     resouce_id: 7,
//     name: 'Frontend Masters Bootcamp',
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS'],
//     description: `
//     The free Frontend Masters Bootcamp is a great way to get up and running with HTML, CSS, and JavaScript.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Ffrontend-masters-bootcamp.png&w=640&q=75',
//     href: 'https://frontendmasters.com/bootcamp/',
//   },

//   {
//     resouce_id: 8,
//     name: 'React for Beginners',
//     price: '$89+',
//     isAffiliate: true,
//     resourceType: 'Online Courses',
//     techStacks: ['HTML', 'CSS', 'JS'],
//     description: `
//     The free Frontend Masters Bootcamp is a great way to get up and running with HTML, CSS, and JavaScript.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Freact-for-beginners.png&w=640&q=75',
//     href: 'https://reactforbeginners.com/friend/FRONTENDMENTOR',
//   },

//   {
//     resouce_id: 9,
//     name: 'Advanced React & GraphQL',
//     price: '$89+',
//     isAffiliate: true,
//     resourceType: 'Online Courses',
//     techStacks: ['JS'],
//     description: `
// Wes Bos teaches you how to build full-stack JavaScript applications using React & GraphQL.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Ffullstack-advanced-react.png&w=640&q=75',
//     href: 'https://advancedreact.com/friend/FRONTENDMENTOR',
//   },

//   {
//     resouce_id: 10,
//     name: 'Wes Bos: CSS Grid',
//     resourceType: 'Online Courses',
//     techStacks: ['CSS'],
//     description: `
//      CSS Grid will change how you create website layouts. Learn how for free from Wes Bos in this brilliant CSS Grid course.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fcss-grid.png&w=640&q=75',
//     href: 'https://cssgrid.io/friend/FRONTENDMENTOR',
//   },

//   {
//     resouce_id: 11,
//     name: 'Wes Bos: JavaScript 30',
//     resourceType: 'Online Courses',
//     techStacks: ['CSS'],
//     description: `
//      Wes Bos offers another amazing (and free) course to help you develop your JavaScript skills.
//     `,
//     image:
//       'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fapi.frontendmentor.io%2Fwp-content%2Fuploads%2F2018%2F09%2Fjavascript30.png&w=640&q=75',
//     href: 'https://javascript30.com/friend/FRONTENDMENTOR',
//   },
// ];
