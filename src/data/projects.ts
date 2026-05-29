export interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  image: string;
  video?: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "MovieXpress",
    shortTitle: "MovieXpress",
    description:
      "AI-powered movie recommendation app featuring an intelligent chatbot for personalized film discovery and watchlist management.",
    fullDescription:
      "MovieXpress is an intelligent movie discovery platform that leverages AI to provide personalized film recommendations. The app features a conversational chatbot that understands user preferences, suggests movies based on mood and viewing history, and helps manage watchlists. Built with a focus on smooth animations and intuitive UX, it demonstrates the power of AI integration in everyday applications.",
    techStack: ["Flutter", "Supabase", "AI", "Dart"],
    image: "/images/movieexpress.png",
    video: "/videos/movieexpress.mp4",
    githubUrl: "https://github.com/zorgatimedali1/Movie-Express",
  },
  {
    id: 2,
    title: "SmartSpend",
    shortTitle: "SmartSpend",
    description:
      "Real-time budget management application with expense tracking, visual analytics, and smart spending insights.",
    fullDescription:
      "SmartSpend transforms personal finance management with real-time expense tracking and intelligent budget analytics. Users can categorize spending, set budget goals, and receive smart notifications. The app features beautiful data visualizations including donut charts and trend graphs, making financial health both accessible and visually engaging.",
    techStack: ["Flutter", "Supabase", "Charts"],
    image: "/images/smpartspend.png",
    video: "/videos/smartspend.mp4",
    githubUrl: "https://github.com/zorgatimedali1/SmartSpend",
  },
  {
    id: 3,
    title: "Edo Hub",
    shortTitle: "Edo Hub",
    description:
      "Online learning marketplace platform connecting students with courses, featuring progress tracking and interactive content.",
    fullDescription:
      "Edo Hub is a comprehensive online learning marketplace that bridges the gap between educators and learners. The platform features course discovery, video streaming, progress tracking, and interactive quizzes. Built with Flutter and Supabase, it delivers a seamless cross-platform learning experience for students worldwide.",
    techStack: ["Flutter", "Supabase", "Dart"],
    image: "/images/project-eduhub.jpg",
  },
  {
    id: 4,
    title: "LWZ Voyage",
    shortTitle: "LWZ Voyage",
    description:
      "Full-stack travel agency website with destination browsing, booking management, and itinerary planning features.",
    fullDescription:
      "LWZ Voyage is a full-stack travel agency platform that simplifies trip planning from discovery to booking. Users can browse curated destinations, compare packages, manage bookings, and create personalized itineraries. The platform features a responsive design with glassmorphism UI elements and integrates with payment gateways for seamless transactions.",
    techStack: ["Angular", "node js"],
    image: "/images/lwzvoyage.png",
    video: "/videos/lwz-voyage.mp4",
    githubUrl: "https://github.com/zorgatimedali1/Agence-de-Voyage",
  },
  {
    id: 5,
    title: "RecruitPro",
    shortTitle: "RecruitPro",
    description:
      "Professional recruitment mobile app streamlining the hiring process with candidate matching and interview scheduling.",
    fullDescription:
      "RecruitPro revolutionizes the hiring process with intelligent candidate matching and streamlined interview management. The app features profile-based matching algorithms, in-app messaging, calendar integration for scheduling interviews, and comprehensive candidate tracking. Designed for both recruiters and job seekers, it makes talent acquisition efficient and enjoyable.",
    techStack: ["Flutter", "Firebase", "REST API"],
    image: "/images/project-recruitpro.jpg",
    gallery: [
      "/images/Menu principal jeune diplome 1.PNG",
      "/images/Consulter les idées de projet 1.PNG",
      "/images/figure s'authentifier.png",
    ],
  },
  {
    id: 6,
    title: "GameVault",
    shortTitle: "GameVault",
    description:
      "A gaming-focused e-commerce platform built as an academic microservices project. Uses gRPC for inter-service communication and Apache Kafka for async event-driven messaging.",
    fullDescription:
      "GameVault is a gaming-focused e-commerce platform built as an academic microservices project. It uses gRPC for inter-service communication and Apache Kafka for async event-driven messaging. Users can discover, purchase, and manage their video game collections with curated listings, reviews, ratings, wishlists, and personalized recommendations. The dark neon-accented design creates an immersive shopping experience for gaming enthusiasts.",
    techStack: ["Node.js", "gRPC", "Kafka", "Microservices"],
    image: "/images/GameVault.png",
    video: "/videos/gamevault.mp4",
    githubUrl: "https://github.com/ProjetSOAONS-Dali/mini-projet-microservices",
  },
  {
    id: 7,
    title: "AI Fighter",
    shortTitle: "AI Fighter",
    description:
      "2D fighting game with AI opponent using minimax algorithm for strategic combat and adaptive difficulty.",
    fullDescription:
      "AI Fighter is a retro-styled 2D fighting game that showcases the power of artificial intelligence in gaming. The AI opponent uses a minimax algorithm with alpha-beta pruning to make strategic combat decisions, adapting to player patterns in real-time. The game features multiple characters, special moves, and progressively challenging AI difficulty levels.",
    techStack: ["Python", "Pygame", "AI"],
    image: "/images/project-aifighter.jpg",
    video: "/videos/pygame.mp4",
  },
  {
    id: 8,
    title: "HotelMaster",
    shortTitle: "HotelMaster",
    description:
      "Hotel management and reservation system with room booking, guest management, and billing integration.",
    fullDescription:
      "HotelMaster is a comprehensive hotel management system designed to streamline operations from reservations to billing. The desktop application features room occupancy visualization, guest check-in/check-out management, automated billing, and reporting dashboards. Built with a focus on reliability and ease of use, it serves as a complete solution for hotel administration.",
    techStack: ["Java", "SQL", "Swing"],
    image: "/images/HotelMaster.png",
    video: "/videos/HotelMaster.mp4",
    githubUrl: "https://github.com/zorgatimedali1/GestionHotel",
  },
];
