const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');
const Social = require('./models/Social');
const Testimonial = require('./models/Testimonial');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await About.deleteMany({});
    await Social.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Projects
    const projects = await Project.insertMany([
      {
        title: "College Project Showcase",
        description: "Major project showcasing college projects with advanced features",
        longDescription: "A comprehensive platform for showcasing college projects with user authentication, project submissions, and admin dashboard.",
        image: "/assets/college.jpg",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
        category: "web",
        liveLink: "https://college-project-showcase-9yta.vercel.app/",
        githubLink: "",
        featured: true,
        order: 1,
      },
      {
        title: "Eco-friendly Marketplace",
        description: "Minor project for eco products and sustainable shopping",
        longDescription: "An e-commerce platform focused on eco-friendly products with cart management and payment integration.",
        image: "/assets/eco.jpg",
        techStack: ["React", "MongoDB", "Express", "Node.js"],
        category: "web",
        liveLink: "#",
        githubLink: "",
        featured: false,
        order: 2,
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website with dynamic content",
        longDescription: "A modern, responsive portfolio website showcasing projects, skills, and achievements.",
        image: "/assets/portfolio.jpg",
        techStack: ["React", "Tailwind CSS", "Framer Motion"],
        category: "web",
        liveLink: "https://portfolio-gamma-wheat-89.vercel.app/",
        githubLink: "",
        featured: false,
        order: 3,
      },
      {
        title: "E-doctor Connect",
        description: "Major project for doctor connections and telemedicine",
        longDescription: "A telemedicine platform connecting patients with doctors for online consultations and appointments.",
        image: "/assets/doctor.jpg",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
        category: "web",
        liveLink: "#",
        githubLink: "",
        featured: true,
        order: 4,
      },
    ]);
    console.log(`✅ Seeded ${projects.length} projects`);

    // Seed Skills
    const skills = await Skill.insertMany([
      { name: "React.js", icon: "FaReact", category: "frontend", proficiency: 90, color: "#61DAFB", order: 1 },
      { name: "Node.js", icon: "FaNodeJs", category: "backend", proficiency: 85, color: "#339933", order: 2 },
      { name: "MongoDB", icon: "SiMongodb", category: "database", proficiency: 80, color: "#47A248", order: 3 },
      { name: "Express.js", icon: "SiExpress", category: "backend", proficiency: 85, color: "#000000", order: 4 },
      { name: "JavaScript", icon: "FaJs", category: "frontend", proficiency: 91, color: "#F7DF1E", order: 5 },
      { name: "HTML5", icon: "FaHtml5", category: "frontend", proficiency: 95, color: "#E34F26", order: 6 },
      { name: "CSS3", icon: "FaCss3Alt", category: "frontend", proficiency: 93, color: "#1572B6", order: 7 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", proficiency: 88, color: "#06B6D4", order: 8 },
      { name: "Git & GitHub", icon: "FaGitAlt", category: "tools", proficiency: 85, color: "#F05032", order: 9 },
      { name: "TypeScript", icon: "SiTypescript", category: "frontend", proficiency: 75, color: "#3178C6", order: 10 },
      { name: "Next.js", icon: "SiNextdotjs", category: "frontend", proficiency: 80, color: "#000000", order: 11 },
    ]);
    console.log(`✅ Seeded ${skills.length} skills`);

    // Seed About
    const about = await About.create({
      name: "Kanchan Kushwaha",
      title: "MERN Full Stack Developer",
      tagline: "Creating seamless, scalable web applications",
      bio: "I'm a MERN Full Stack Developer and an aspiring Database Administrator (DBA) with a passion for building scalable, user-friendly web applications. My expertise lies in MongoDB, Express.js, React.js, Node.js & TypeScript, and I'm always eager to explore new technologies that enhance performance.",
      shortBio: "A passionate Full Stack Developer creating seamless, scalable, and user-friendly web applications.",
      profileImage: "/assets/image.png",
      email: "kanchankushwaha65520@gmail.com",
      location: "Noida",
      degree: "B.Tech in Computer Science",
      freelance: "Available",
      highlights: [
        "Develop full-stack web applications using the MERN stack",
        "Build responsive, SEO-friendly websites with Next.js",
        "Continuously learning Database Administration (SQL & NoSQL)",
        "Some of my projects include an Eco-friendly Marketplace webapp, a Portfolio website, and a major project College Project Showcase Website",
      ],
    });
    console.log('✅ Seeded about data');

    // Seed Socials
    const socials = await Social.insertMany([
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/kanchan-kushwaha-09476325a/", icon: "FaLinkedin", color: "#0e76a8", order: 1, active: true },
      { platform: "GitHub", url: "https://github.com/kanchan8874", icon: "FaGithub", color: "#f0f6fc", order: 2, active: true },
      { platform: "Instagram", url: "https://www.instagram.com/k_o_m_a_l_l_l/", icon: "FaInstagram", color: "#E4405F", order: 3, active: true },
    ]);
    console.log(`✅ Seeded ${socials.length} social links`);

    // Seed Testimonials (optional)
    const testimonials = await Testimonial.insertMany([
      {
        name: "Manisha Upadhyay",
        role: "Operations Head",
        company: "GreenCart",
        content: "Kanchan joined us right when our inventory dashboard was stuck. She sat with the store managers, noted their complaints, and shipped fixes in plain English updates every evening. The team now trusts the dashboard for daily planning.",
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        name: "Smita Rawat",
        role: "Product Manager",
        company: "ClinicBridge",
        content: "We had just two weeks to show a working telemedicine MVP. Kanchan set up the video consult flow, wired the appointment reminders and even helped our support folks record demos. She behaves like a teammate, not a vendor.",
        rating: 5,
        featured: true,
        order: 2,
      },
      {
        name: "Rahul Dev Singh",
        role: "Founder",
        company: "Craftfolio",
        content: "I had a Notion doc full of copy and zero design sense. Kanchan converted it into a neat portfolio, kept every section editable for me, and nudged me with reminders so content actually went live. Clients now mention my site in calls.",
        rating: 5,
        featured: true,
        order: 3,
      },
    ]);
    console.log(`✅ Seeded ${testimonials.length} testimonials`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

