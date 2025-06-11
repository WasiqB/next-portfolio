import { PortfolioData } from "@/types/portfolio-types";

export const Data: PortfolioData = {
  hero: {
    name: "Wasiq Amjad Bhamla",
    typingSequences: [
      "Quality Assurance Specialist",
      2000,
      "Open Source Contributor",
      2000,
      "YouTuber",
      2000,
      "Blogger",
      2000,
    ],
    typingDelay: 2000,
    bio: "I'm a passionate and experienced Quality Assurance Engineer with expertise in manual and automated testing of Web, Desktop, API, Android and iOS applications.",
    buttons: {
      primary: {
        text: "My Projects",
        href: "#projects",
      },
      secondary: {
        text: "My Services",
        href: "#services",
      },
    },
    socialLinks: [
      {
        platform: "github",
        url: "https://github.com/WasiqB",
        ariaLabel: "GitHub",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/wasiqbhamla",
        ariaLabel: "LinkedIn",
      },
      {
        platform: "twitter",
        url: "https://x.com/WasiqBhamla",
        ariaLabel: "X",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/@WasiqBhamla",
        ariaLabel: "YouTube",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/WasiqBhamla",
        ariaLabel: "Instagram",
      },
      {
        platform: "facebook",
        url: "https://www.facebook.com/wasiqb",
        ariaLabel: "Facebook",
      },
    ],
    profileImage: {
      src: "/images/wasiq-1.jpg",
      alt: "Profile",
    },
  },
  projects: {
    sectionTitle: "My Projects",
    sectionDescription:
      "Here are some of my recent projects that showcase my skills and expertise.",
    allProjectsButton: {
      text: "See All Projects",
      href: "/projects",
    },
    projects: [
      "https://github.com/BoykaFramework/boyka-framework",
      "https://github.com/WasiqB/multiple-cucumber-html-reporter",
      "https://github.com/WasiqB/coteafs-selenium",
      "https://github.com/WasiqB/coteafs-appium",
      "https://github.com/BoykaFramework/boyka-cli",
      "https://github.com/WasiqB/maven-publish-action",
    ],
  },
  services: {
    sectionTitle: "My Services",
    sectionDescription:
      "Here are the services I offer to help you achieve your digital goals.",
    viewAllButton: {
      text: "View All Services",
      href: "/services",
    },
    services: [
      {
        title: "Test Automation Consulting",
        description: "Transform Your Testing Workflows.",
        icon: "Settings2",
        longDescription:
          "Audit and optimize your test automation frameworks, CI/CD pipelines, and tooling strategies.",
      },
      {
        title: "Technical Blogging & Content",
        description: "Engaging Content for Tech Audiences.",
        icon: "Pen",
        longDescription:
          "Craft tutorials, case studies, and thought leadership articles that drive traffic and trust.",
      },
      {
        title: "Freelance Automation Development",
        description: "Build Scalable Test Solutions.",
        icon: "Terminal",
        longDescription:
          "Fix flaky scripts, design E2E frameworks, or integrate AI into your testing pipelines.",
      },
      {
        title: "Technical Support",
        description: "Resolve Tooling Challenges Fast.",
        icon: "Headphones",
        longDescription:
          "Get expert support for Selenium, Playwright, Cypress, or custom frameworks.",
      },
      {
        title: "Mentorship",
        description: "Accelerate Your Testing Career.",
        icon: "LifeBuoy",
        longDescription:
          "1:1 coaching on automation, freelancing, or transitioning to tech leadership.",
      },
      {
        title: "Custom Tool Development",
        description: "Solve Unique Testing Problems.",
        icon: "Code2",
        longDescription:
          "Build proprietary tools for performance testing, reporting dashboards, or workflow automation.",
      },
    ],
  },
  blogs: {
    sectionTitle: "My Blogs",
    sectionDescription: "Check out my latest articles and insights.",
    sources: [
      { source: "Medium", username: "WasiqB" },
      {
        source: "custom",
        urls: [
          "https://www.lambdatest.com/blog/appium-with-testng-tutorial/",
          "https://www.lambdatest.com/blog/locators-in-appium/",
          "https://www.lambdatest.com/blog/appium-2-migration-guide/",
          "https://www.lambdatest.com/blog/appium-capabilities/",
          "https://www.lambdatest.com/blog/how-to-automate-android-apps-using-appium/",
          "https://www.lambdatest.com/blog/appium-architecture/",
        ],
      },
    ],
  },
  videos: {
    sectionTitle: "My Videos",
    sectionDescription: "Check out my latest video tutorials and tech talks.",
    youtubeChannelId: "UC5dVxwIGl4xfY4gjkWuMspA",
  },
  testimonials: {
    sectionTitle: "My Testimonials",
    sectionDescription: "Here's what people have to say about working with me.",
    viewAllButton: {
      text: "View All Testimonials",
      href: "/testimonials",
    },
    testimonials: [
      {
        id: "1",
        name: "Himanshu Sheth",
        title:
          "Lead [Developer Evangelism] & Senior Manager [Technical Content Marketing]",
        company: "LambdaTest",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQFBkGbPNVSNzQ/profile-displayphoto-shrink_100_100/B56Zb2ZWYkH4AU-/0/1747890563408?e=1755129600&v=beta&t=Ls9XTb0ewtPLfLs4fS2wVrZnfr5QfRMbJ76G7SJsltA",
        testimonial:
          "Wasiq has worked on 3-4 blogs on Automation with Appium and Selenium. He is a proven expert in the area since he is a seasoned engineer and open-sourcer. He is proactive in communication, resolving comments. Definitely recommend him for blog writing!",
        category: "client",
        featured: true,
      },
      {
        id: "2",
        name: "Mohammad Faisal Khatri",
        title: "Senior Test Specialist",
        company: "Kafaat Business Solutions شركة كفاءات حلول الأعمال",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQE_ofNeGhyqgg/profile-displayphoto-shrink_100_100/B4DZaHunGeGcAc-/0/1746033866334?e=1755129600&v=beta&t=V_7lT1fpQP1_YoJ2Y1pUzDnDFLw0pMYpw9QAoQX8BSo",
        testimonial:
          "it was awesome experience getting trained by Wasiq on java, selenium, rest assured and Appium! He has very sound knowledge on test automation tools and frameworks.",
        category: "client",
        featured: true,
      },
      {
        id: "3",
        name: "Hasmukh Patel",
        title: "Sr. QA Lead",
        company: "Kinship",
        image:
          "https://media.licdn.com/dms/image/v2/D5635AQHc5Db9OfxBLw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1694605884037?e=1750194000&v=beta&t=RQk8ju5QXhOwkizAK4My3pWMgq4hh6ik-X4QPslHzmg",
        testimonial:
          "I worked with Wasiq and he is very knowledgable of Automation. He have grate skill on any Automation topic you ask.",
        category: "client",
        featured: true,
      },
      {
        id: "4",
        name: "Hosna Aunjun",
        title: "Software Development Engineer In Test",
        company: "Walmart Global Tech",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQFmw1b_ePlI8w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1696973702503?e=1755129600&v=beta&t=DNwUs15w7CXSgVF9Gyvq6fxnZEgM8xw0RdS71FC8R8s",
        testimonial:
          "Simply an amazing personality with profound knowledge of Automation in the IT industry. One of the best mentors so far, I have seen and meet. I definitely recommend him for his great leading and mentorship skills.",
        category: "general",
      },
      {
        id: "5",
        name: "Mrunmayee Bhagwat",
        company: "Vertex Inc.",
        title: "Software Developer II",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQGxLC6lk4w74A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1712153121756?e=1755129600&v=beta&t=8VLmNjwSvV1Cy7zBPpF4Bcf4YZbQeYpiWn7pg9q8pLk",
        testimonial: `I have worked with Wasiq in the same team and I admire him for his consistent commitment and dedication towards the project.
He is fluent in setting up automation frameworks and well versed with programming languages. He is always thinking one step ahead and one can easily make out the passion he has for Automation. His willingness to learn and keen attention towards detail has been a value addition to our team. I strongly believe Wasiq would be a great asset to any team he joins.`,
        category: "colleague",
      },
      {
        id: "6",
        name: "Mohammad Faisal Khatri",
        title: "Senior Test Specialist",
        company: "Kafaat Business Solutions شركة كفاءات حلول الأعمال",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQE_ofNeGhyqgg/profile-displayphoto-shrink_100_100/B4DZaHunGeGcAc-/0/1746033866334?e=1755129600&v=beta&t=V_7lT1fpQP1_YoJ2Y1pUzDnDFLw0pMYpw9QAoQX8BSo",
        testimonial:
          "A fully focused guy who never lets you down. Has an awesome technical knowledge. It is a pleasure working wih him, a person who never lets you down. A good mentor, learner, programmer and obviously the best in automation testing.",
        category: "colleague",
      },
      {
        id: "7",
        name: "Basant Kumar Varshney",
        title: "Associate Vice President",
        company: "360 ONE Wealth",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQEzw2gnT1MnkA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710081133249?e=1755129600&v=beta&t=ZM1Q_muX3UGqFh9HYVvtKGEVKmNkmFCAK05DsJqK-_Y",
        testimonial:
          "Working with Wasiq Bhamla was a pleasure. He has always spoken with his work and not with the words. A good self learner and enthusiastic personality. Being non technical Graduate, his technical grasping and implementation has left the technical graduates behind. Wishing him success in his all endeavors.",
        category: "colleague",
      },
      {
        id: "8",
        name: "Vijaykumar Utadia",
        title: "General Manager",
        company: "Paytm Money",
        image:
          "https://media.licdn.com/dms/image/v2/C4E03AQE9YnUNs557gg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1605787823163?e=1755129600&v=beta&t=4qc4Cx6mBw5_uFwPY9QDsmq2wyaXfrIKUYiFU4mMJVs",
        testimonial:
          "Wasiq is hard working and intelligent person with the initiative and willingness to grow.He was the key member of my Testing team in FTIL.I would recommend Wasiq as a competent and skilled Testing professional and very good team player.",
        category: "colleague",
      },
      {
        id: "9",
        name: "Mahendra Mayekar",
        title: "Delivery Head - Vice President",
        company: "Synapsewave Innovations Private Limited",
        image:
          "https://media.licdn.com/dms/image/v2/C4E03AQEzmhAIOcBMLA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1560604263902?e=1755129600&v=beta&t=tePaUE4JLS5aKRq0siIoXuCCDnIRSgGgEFgwXhq2Hh4",
        testimonial:
          "It was my pleasure to work with Wasiq. A silent and workaholic team member. He was always rigorous in his queries, insightful in his analysis and a very good QA Engineer. He is through professional and knows what exactly is expected from him. Wasiq is the person I would like to reach out to if I had an urgent quality delivery to be done.",
        category: "colleague",
        featured: true,
      },
      {
        id: "10",
        name: "Karna Patel",
        title: "Senior Specialist",
        company: "Dubai Electricity & Water Authority - DEWA",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQHxF5VezZVkXw/profile-displayphoto-shrink_100_100/B4DZZmo1QBG4AU-/0/1745478703223?e=1755129600&v=beta&t=bTuWbUozMAkU5V1rgyPIHmpCINVCL3m39Q2HOo4WGB0",
        testimonial:
          "Wasiq is a technology buff and would be inclined to learn anything and everything under the sun in any technology. Wouldn't be scared to explore anything new. I wish him all the very best for all his future endeavours.",
        category: "colleague",
      },
    ],
  },
};
