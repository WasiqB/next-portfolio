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
};
