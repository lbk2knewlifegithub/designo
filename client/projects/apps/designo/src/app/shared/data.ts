import { Link } from '@lbk/models';
import { ProjectsGallery, ProjectSlug, Location } from './models';

export const projectsGalleryMap: Map<ProjectSlug, ProjectsGallery> = new Map([
  //   App Design
  [
    'app-design',
    {
      slug: 'app-design',
      name: 'App Design',
      description:
        'Our mobile designs bring intuitive digital solutions to your customers right at their fingertips.',
      projects: [
        {
          name: 'Airfilter',
          description:
            'Solving the problem of poor indoor air quality by filtering the air',
          image: 'assets/app-design/desktop/image-airfilter.jpg',
        },
        {
          name: 'Eyecam',
          description:
            'Product that lets you edit your favorite photos and videos at any time',
          image: 'assets/app-design/desktop/image-eyecam.jpg',
        },
        {
          name: 'Faceit',
          description:
            'Get to meet your favorite internet superstar with the faceit app ',
          image: 'assets/app-design/desktop/image-faceit.jpg',
        },
        {
          name: 'Todo',
          description:
            'A todo app that features cloud sync with light and dark mode',
          image: 'assets/app-design/desktop/image-todo.jpg',
        },
        {
          name: 'Loopstudios',
          description: 'A VR experience app made for Loopstudios',
          image: 'assets/app-design/desktop/image-loopstudios.jpg',
        },
      ],
    },
  ],
  //   Web Design
  [
    'web-design',
    {
      slug: 'web-design',
      name: 'Web Design',
      description:
        'We build websites that serve as powerful marketing tools and bring memorable brand experiences.',
      projects: [
        {
          name: 'Express',
          description:
            'A multi-carrier shipping website for ecommerce businesses',
          image: 'assets/web-design/desktop/image-express.jpg',
        },
        {
          name: 'Transfer',
          description:
            'Site for low-cost money transfers and sending money within seconds',
          image: 'assets/web-design/desktop/image-transfer.jpg',
        },
        {
          name: 'Photon',
          description:
            'A state-of-the-art music player with high-resolution audio and DSP effects',
          image: 'assets/web-design/desktop/image-photon.jpg',
        },
        {
          name: 'Builder',
          description:
            'Connects users with local contractors based on their location',
          image: 'assets/web-design/desktop/image-builder.jpg',
        },
        {
          name: 'Blogr',
          description:
            'Blogr is a platform for creating an online blog or publication',
          image: 'assets/web-design/desktop/image-blogr.jpg',
        },

        {
          name: 'Camp',
          description:
            'Get expert training in coding, data, design, and digital marketing',
          image: 'assets/web-design/desktop/image-camp.jpg',
        },
      ],
    },
  ],
  //   Graphic Design
  [
    'graphic-design',
    {
      slug: 'graphic-design',
      name: 'Graphic Design',
      description:
        'We deliver eye-catching branding materials that are tailored to meet your business objectives.',
      projects: [
        {
          name: 'Tim Brown',
          description:
            'A book cover designed for Tim Brown’s new release, ‘Change’ ',
          image: 'assets/graphic-design/desktop/image-change.jpg',
        },
        {
          name: 'Boxed water',
          description: 'A simple packaging concept made for Boxed Water',
          image: 'assets/graphic-design/desktop/image-boxed-water.jpg',
        },
        {
          name: 'Science!',
          description:
            'A poster made in collaboration with the Federal Art Project',
          image: 'assets/graphic-design/desktop/image-science.jpg',
        },
      ],
    },
  ],
]);

export const projectLinks: Link[] = [
  /// Web Design
  {
    href: '/projects-gallery/web-design',
    name: 'Web Design',
    image: {
      mobile: 'assets/home/mobile/image-web-design.jpg',
      tablet: 'assets/home/tablet/image-web-design.jpg',
      desktop: 'assets/home/desktop/image-web-design-large.jpg',
      alt: 'Web Design Desktop',
    },
  },

  /// App Design
  {
    href: '/projects-gallery/app-design',
    name: 'App Design',
    image: {
      mobile: 'assets/home/mobile/image-app-design.jpg',
      tablet: 'assets/home/tablet/image-app-design.jpg',
      desktop: 'assets/home/desktop/image-app-design.jpg',
      alt: 'App Design Desktop',
    },
  },

  /// Graphic Design
  {
    href: '/projects-gallery/graphic-design',
    name: 'Graphic Design',
    image: {
      mobile: 'assets/home/mobile/image-graphic-design.jpg',
      tablet: 'assets/home/tablet/image-graphic-design.jpg',
      desktop: 'assets/home/desktop/image-graphic-design.jpg',
      alt: 'Graphic Design',
    },
  },
];

export const locations: Location[] = [
  // Canada Location
  {
    location: 'Canada',
    office: ' Designo Central Office ',
    address: '3886 Wellington Street <br> Toronto, Ontario M9C 3J5 ',
    phone: '+1 253-863-8967',
    email: 'contact@designo.co',
    coordinate: {
      lat: 51.297826,
      lng: 9.52723,
    },
  },

  // Australia Location
  {
    location: 'Australia',
    office: ' Designo AU Office ',
    address: '19 Balonne Street <br> New South Wales 2443',
    phone: '(02) 6720 9092',
    email: 'contact@designo.au',
    coordinate: {
      lat: 35.123483,
      lng: -97.625375,
    },
  },

  // United Kingdom
  {
    location: 'United Kingdom',
    office: 'Designo UK Office',
    address: '13 Colorado Way <br> Rhyd-y-fro SA8 9GA',
    phone: '078 3115 1400',
    email: 'contact@designo.uk',
    coordinate: {
      lat: 51.835612,
      lng: 8.955941,
    },
  },
];
