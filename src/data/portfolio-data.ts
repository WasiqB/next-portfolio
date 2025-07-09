import { PortfolioData } from "@/types/portfolio-types";

export const Data: PortfolioData = {
  url: "https://wasiqbhamla.com",
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
      {
        platform: "truth",
        url: "https://www.truthsocial.com/@WasiqBhamla",
        ariaLabel: "Truth Social",
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
    bookCallButton: {
      text: "Book Free Discovery Call",
      href: "https://cal.com/wasiqbhamla/discussion-with-wasiq",
    },
    services: [
      {
        title: "Test Automation Consulting",
        description: "Transform Your Testing Workflows.",
        icon: "Settings2",
        features: [
          "Audit and optimize your test automation frameworks",
          "Test suites, CI/CD pipelines, and tooling strategies.",
        ],
      },
      {
        title: "Technical Blogging & Content",
        description: "Engaging Content for Tech Audiences.",
        icon: "Pen",
        features: [
          "Craft tutorials",
          "Use cases and tips and tricks for Test Automation",
          "Drive traffic and trust.",
        ],
      },
      {
        title: "Freelance Automation Development",
        description: "Build Scalable Test Solutions.",
        icon: "Terminal",
        features: [
          "Fix flaky scripts",
          "Design E2E test frameworks",
          "Technical support",
          "Help in automating your products along with CI/CD pipelines.",
        ],
      },
      {
        title: "Technical Support",
        description: "Resolve Tooling Challenges Fast.",
        icon: "Headphones",
        features: [
          "Get expert support for Selenium WebDriver",
          "Appium, Rest-Assured, WebDriverIO, CI/CD pipelines, or custom frameworks.",
        ],
      },
      {
        title: "Mentorship",
        description: "Accelerate Your Testing Career.",
        icon: "LifeBuoy",
        features: [
          "1:1 coaching on your Test automation journey",
          "Open source contributions.",
        ],
      },
      {
        title: "Custom Tool Development",
        description: "Solve Unique Testing Problems.",
        icon: "Code2",
        features: [
          "Build proprietary tools for testing and Test Automation",
          "Reporting dashboards for your testing needs.",
        ],
      },
    ],
    deliverables: [
      {
        step: "01",
        title: "Free Discovery Call",
        description:
          "We'll discuss your project goals, requirements, and vision in a 30-minute consultation call.",
        details: [
          "Understand your business needs",
          "Discuss technical requirements",
          "Explore design preferences",
          "No commitment required",
        ],
        icon: "💬",
        duration: "30 minutes",
        cost: "Free",
      },
      {
        step: "02",
        title: "Custom Proposal & Quote",
        description:
          "Receive a detailed proposal with timeline, deliverables, and transparent pricing within 24 hours.",
        details: [
          "Detailed project breakdown",
          "Clear timeline and milestones",
          "Transparent pricing",
          "Revision rounds included",
        ],
        icon: "📋",
        duration: "Within 24 hours",
        cost: "Free",
      },
      {
        step: "03",
        title: "Project Kickoff",
        description:
          "Once approved, we'll start with project setup, planning, and initial design concepts.",
        details: [
          "Project setup and planning",
          "Initial wireframes/mockups",
          "Development environment setup",
          "Regular communication established",
        ],
        icon: "🚀",
        duration: "1-2 days",
        cost: "25% deposit",
      },
      {
        step: "04",
        title: "Development & Updates",
        description:
          "I'll build your project with regular updates, feedback sessions, and milestone reviews.",
        details: [
          "Weekly progress updates",
          "Live preview access",
          "Feedback incorporation",
          "Quality assurance testing",
        ],
        icon: "⚡",
        duration: "Project timeline",
        cost: "Progress payments",
      },
      {
        step: "05",
        title: "Launch & Support",
        description:
          "Final testing, deployment, and 30 days of free support to ensure everything runs smoothly.",
        details: [
          "Final testing and optimization",
          "Live deployment assistance",
          "30 days free support",
          "Documentation and training",
        ],
        icon: "🎉",
        duration: "1-2 days",
        cost: "Final payment",
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
    channelUrl: "https://www.youtube.com/@WasiqBhamla",
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
          "https://media.licdn.com/dms/image/v2/D5635AQHc5Db9OfxBLw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1694605884037?e=1751731200&v=beta&t=Tyjqi6KsfF1ZUiPL5yWAa8TgRsTicM1OSseuZjFFqt8",
        testimonial:
          "I worked with Wasiq and he is very knowledgeable of Automation. He have grate skill on any Automation topic you ask.",
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
          "Wasiq is hard working and intelligent person with the initiative and willingness to grow.He was the key member of my Testing team in FTIL. I would recommend Wasiq as a competent and skilled Testing professional and very good team player.",
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
          "Wasiq is a technology buff and would be inclined to learn anything and everything under the sun in any technology. Wouldn't be scared to explore anything new. I wish him all the very best for all his future endeavors.",
        category: "colleague",
      },
    ],
  },
  about: {
    name: "Wasiq Amjad Bhamla",
    email: "wasbhamla2005@gmail.com",
    title: "Quality Assurance Specialist",
    description: [
      "I'm a passionate Quality Assurance Engineer with expertise in manual and automated testing of Web, Desktop, API, Android and iOS applications.",
      "I thrive at the intersection of technology and process, always seeking to optimize, automate, and share knowledge with others.",
      "When I'm not testing or coding, I enjoy sharing insights through blogs, videos, and mentoring aspiring testers.",
    ],
    coreValues: [
      {
        label: "Continuous Learning",
        value:
          "Technology evolves rapidly, and I'm committed to staying at the forefront by constantly learning and experimenting with new tools and techniques.",
      },
      {
        label: "Code Quality",
        value:
          "Whenever I am writing any code for Test Automation, I'm passionate about writing clean, maintainable, and well-documented code that stands the test of time.",
      },
      {
        label: "Collaboration",
        value:
          "The best results come from diverse perspectives and effective teamwork.",
      },
      {
        label: "Knowledge Sharing",
        value:
          "I'm dedicated to giving back to the community through mentorship, open-source contributions, and educational content.",
      },
    ],
    experiences: [
      {
        title: "Senior Testing Specialist",
        company: "Kafaat Business Solutions",
        location: "Riyadh, Saudi Arabia",
        period: "Aug 2024 - Present",
        description: [
          "Automated 100+ test cases for a critical government application related to law enforcement for the whole city using the Boyka Framework.",
          "Planned and helped setup Katalon Studio implementation for the Manual team for Web and Mobile applications.",
          "Mentored the functional team for using the Test Automation tools.",
        ],
        skills: [
          "Selenium WebDriver",
          "Appium",
          "Java",
          "Katalon Studio",
          "Postman",
          "GitLab",
          "Jira",
          "TestRail",
          "BitBucket",
        ],
      },
      {
        title: "Manager - Projects",
        company: "Cognizant",
        location: "Mumbai, India",
        period: "Aug 2023 - Jun 2024",
        description: [
          "Supervised a team comprising 4 QA Engineers responsible for testing a Web application in the Telecom domain.",
          "Contributed to elevating the quality of the project's Test Automation process through the implementation of industry best practices.",
          "Served as a mentor for the team, facilitating their learning of Test Automation best practices and providing guidance when they encountered challenging automation issues.",
        ],
        skills: [
          "Selenium WebDriver",
          "Java",
          "Rest-Assured",
          "Postman",
          "Git",
          "Jenkins",
        ],
      },
      {
        title: "Senior QA Consultant",
        company: "Thoughtworks",
        location: "Mumbai, India",
        period: "Mar 2019 - Sep 2022",
        description: [
          "Developed an API Automation framework from the ground up, utilizing the Facade and Builder design patterns to improve test coverage at the API level of the test pyramid for an application with a user base exceeding 100,000.",
          "Acted as Test Architect for a major banking client in India, contributing to the enhancement of their test automation framework architecture and implementing visual regression testing for both Web and Mobile applications",
          "As a key team member, I assisted in the execution of both Automation and Manual testing for Web, API, and Mobile applications",
        ],
        skills: [
          "WebDriverIO",
          "Selenium WebDriver",
          "JavaScript",
          "Java",
          "Typescript",
          "Appium",
          "Rest-Assured",
          "ESLint",
          "Git",
          "GoCD",
          "Azure DevOps",
        ],
      },
      {
        title: "Lead QA Engineer",
        company: "CrossAsyst Technologies Ltd",
        location: "Mumbai, India",
        period: "Apr 2018 - Mar 2019",
        description: [
          "Demonstrated effective leadership as I guided a team of 3 QA Engineers in the Healthcare industry, devising and implementing a comprehensive QA strategy and solution for their web-based product.",
          "Developed a sturdy and user-friendly test automation framework for Web and API automation.",
          "Acted as a mentor to team members, sharing my expertise in test automation with them to enable their contributions towards the success of the team.",
        ],
        skills: [
          "Selenium WebDriver",
          "Java",
          "Rest-Assured",
          "Postman",
          "Jira",
          "Git",
          "BitBucket",
        ],
      },
      {
        title: "Senior QA Engineer",
        company: "AurionPro Solutions Pvt Ltd",
        location: "Mumbai, India",
        period: "Jan 2015 - Mar 2018",
        description: [
          "Developed and upheld test automation for both Android and iOS platforms using Appium, automating user journeys for an application with multi-device payment capability.",
          "Devised a comprehensive end-to-end test automation strategy and solution for a supply chain and warehouse management application using Selenium WebDriver's C# binding and SpecFlow's Cucumber.",
          "As a key team member, I participated in testing, automating, and maintaining more than 1000 test cases for MasterCard andDialog, a client in Sri Lanka, for their payment domain APIs.",
        ],
        skills: [
          "Selenium WebDriver",
          "Rest-Assured",
          "Appium",
          "Java",
          "C#",
          "Cucumber SpecFlow",
          "Git",
          "Jira",
          "BitBucket",
          "Bamboo",
        ],
      },
      {
        title: "Software Audit Lead",
        company: "Financial Technologies India Ltd",
        location: "Mumbai, India",
        period: "Mar 2007 - Jan 2015",
        description: [
          "Effectively guided a team of QA engineers in migrating more than 1000 IBM Rational Robot scripts to IBM RFT (Java).",
          "Developed a lightweight wrapper framework for IBM RFT, simplifying scripting and implementing the page object model",
          "As a key team member, I contributed to the development of middleware for brokerage houses, aiding them in their desktop application testing efforts through both Manual and Automation testing.",
        ],
        skills: [
          "IBM Rational Robot",
          "IBM Rational Functional Tester",
          "SQA VBA",
          "Java",
          "StarTeam",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelors of Commerce",
        institution: "University of Mumbai",
        location: "Mumbai, India",
        period: "Jun 2003 - Mar 2006",
        description:
          "Specialized in Economics, Accounts and Taxations (Direct and Indirect)",
      },
      {
        degree: "Advance Diploma inSoftware Engineering",
        institution: "Aptech Computer Education",
        location: "Mumbai, India",
        period: "Mar 2003 - Jun 2006",
        description: "Advanced Diploma in Software Engineering.",
      },
    ],
    skills: [
      "Selenium WebDriver",
      "Appium",
      "WebDriverIO",
      "Rest-Assured",
      "TestNG",
      "Mocha",
      "Java",
      "C#",
      "JavaScript",
      "Typescript",
      "Groovy",
      "Ruby",
      "Postman",
      "SoapUI",
      "GitHub",
      "Git",
      "CI / CD",
      "Maven",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Vercel",
      "Burp Suite",
      "Jira",
      "BitBucket",
      "GitLab",
      "TestRail",
      "GitHub Actions",
      "Katalon Studio",
    ],
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
      { platform: "twitter", url: "https://x.com/WasiqBhamla", ariaLabel: "X" },
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
      alt: "Wasiq Amjad Bhamla",
    },
  },
  github: {
    username: "WasiqB",
  },
  sponsors: {
    sectionTitle: "My Sponsors",
    sectionDescription:
      "These amazing sponsors support my work and help me create more content.",
    viewAllButton: {
      text: "See All Sponsors",
      href: "/sponsors",
    },
    sponsors: [
      {
        id: "1",
        name: "LambdaTest",
        avatarUrl:
          "https://media.licdn.com/dms/image/v2/D560BAQGdHpefVrdoOw/company-logo_100_100/B56Zc16NJjGQAU-/0/1748956140728/lambdatest_logo?e=1755129600&v=beta&t=K1kSokc3ks5BGdvo97A9lOeqvmGGAFLybwCZZU5lp0w",
        profileUrl: "https://www.lambdatest.com/",
        tier: "bronze",
      },
    ],
    tiers: [
      {
        name: "💪🏻 Platinum",
        slug: "platinum",
        description: "Premium support and visibility for your brand.",
        price: 1000,
        benefits: [
          "Including previous tier benefits",
          "Get 12 hour / month call with me anytime during the month for any consulting or mentorship",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=206958",
      },
      {
        name: "💎 Diamond",
        slug: "diamond",
        description: "Top-tier support with maximum visibility.",
        price: 500,
        benefits: [
          "Including previous tier benefits",
          "Get 4 hour / month of call with me anytime during the month for any consulting or mentorship",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=235804",
      },
      {
        name: "🥇 Gold",
        slug: "gold",
        description: "Enhanced support and visibility for your brand.",
        price: 350,
        benefits: [
          "Including previous tier benefits",
          "Get 1 hour / month of call with me anytime during the month for any consulting or mentorship",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=206957",
      },
      {
        name: "🥈 Silver",
        slug: "silver",
        description: "Support my work with monthly contributions.",
        price: 100,
        benefits: [
          "Including previous tier benefits",
          "Get 30 minutes / month of call with me anytime during the month for any consulting or mentorship",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=157967",
      },
      {
        name: "🥉 Bronze",
        slug: "bronze",
        description: "Support my work with monthly contributions.",
        price: 50,
        benefits: [
          "Including previous tier benefits",
          "Get special sponsor role on my Discord server with access to private sponsor channel where you will get priority over other discussion",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=157964",
      },
      {
        name: "🤝 Backer",
        slug: "backer",
        description: "Support my work with monthly contributions.",
        price: 25,
        benefits: [
          "Including previous tier benefits",
          "Get your name listed on README of all my repositories",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=157963",
      },
      {
        name: "🚶🏻 Starter",
        slug: "starter",
        description: "Support my work with monthly contributions.",
        price: 5,
        benefits: [
          "You get a shout-out on my Socials",
          "Get your name listed on my personal website",
        ],
        githubTierUrl:
          "https://github.com/sponsors/WasiqB/sponsorships?tier_id=157962",
      },
      {
        name: "Donation",
        slug: "donation",
        description: "Support my work with a one-time contribution.",
        benefits: [
          "You get a shout-out on my Socials",
          "Get your name listed on my personal website",
        ],
        githubTierUrl: "https://github.com/sponsors/WasiqB",
      },
    ],
  },
  analytics: {
    gaId: "G-1R5917Q9SG",
  },
};
