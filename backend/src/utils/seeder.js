import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Application from '../models/Application.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import { getDbStatus } from '../config/db.js';

// Pre-seeded in-memory store for autonomous operation
export const inMemoryStore = {
  users: [
    {
      _id: 'user_admin_001',
      id: 'user_admin_001',
      name: 'Dr. Faculty Admin / Core Council',
      email: 'admin@csivcet.org',
      password: '', // will be hashed upon initialization
      plainPassword: 'CsiVcet@2026',
      role: 'admin',
      chapterDesignation: 'CSI VCET Chapter Lead Administrator',
      createdAt: new Date().toISOString(),
    },
  ],
  applications: [
    {
      _id: 'app_001',
      id: 'app_001',
      name: 'Ronit Sharma',
      email: 'ronit.sharma@vcet.edu.in',
      phone: '+91 98201 12345',
      rollNumber: '24CMP042',
      year: 'SE',
      department: 'Computer Engineering',
      domainPreference: 'Technical',
      skills: ['React', 'Node.js', 'Python', 'Git'],
      statementOfPurpose: 'Passionate about full-stack web development and excited to contribute to CSI VCET technical hackathons and peer mentoring.',
      portfolioUrl: 'https://github.com/ronit-sharma',
      status: 'Accepted',
      interviewSlot: '2026-10-12 11:30 AM',
      adminNotes: 'Strong React fundamentals, cleared live coding challenge with top rank.',
      dateApplied: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      _id: 'app_002',
      id: 'app_002',
      name: 'Priya Nair',
      email: 'priya.nair@vcet.edu.in',
      phone: '+91 98334 54321',
      rollNumber: '23IT019',
      year: 'TE',
      department: 'Information Technology',
      domainPreference: 'Web & App',
      skills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Figma'],
      statementOfPurpose: 'Lead frontend architect for departmental project; want to build impactful portals for college technical festivals.',
      portfolioUrl: 'https://priyanair.dev',
      status: 'Interviewed',
      interviewSlot: '2026-10-08 02:00 PM',
      adminNotes: 'Excellent UI/UX eye and design system experience. Second round pending with Tech Head.',
      dateApplied: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      _id: 'app_003',
      id: 'app_003',
      name: 'Ananya Kulkarni',
      email: 'ananya.kulkarni@vcet.edu.in',
      phone: '+91 99200 67890',
      rollNumber: '25AID012',
      year: 'FE',
      department: 'Artificial Intelligence & Data Science',
      domainPreference: 'Technical',
      skills: ['Python', 'Data Structures', 'C++', 'SQL'],
      statementOfPurpose: 'First year student eager to learn enterprise software development and volunteer in AI workshops organized by CSI.',
      portfolioUrl: 'https://github.com/ananyakulkarni',
      status: 'Pending',
      interviewSlot: null,
      adminNotes: '',
      dateApplied: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      _id: 'app_004',
      id: 'app_004',
      name: 'Tanmay Patil',
      email: 'tanmay.patil@vcet.edu.in',
      phone: '+91 97654 32109',
      rollNumber: '24CMP088',
      year: 'SE',
      department: 'Computer Engineering',
      domainPreference: 'Event Management',
      skills: ['Public Speaking', 'Event Logistics', 'Sponsorship Outreach'],
      statementOfPurpose: 'Handled technical symposium logistics in first year; eager to manage HackVCET 2026 operations and national attendee liaison.',
      portfolioUrl: '',
      status: 'Pending',
      interviewSlot: null,
      adminNotes: 'Prior experience in inter-collegiate fest logistics.',
      dateApplied: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      _id: 'app_005',
      id: 'app_005',
      name: 'Sahil Mehta',
      email: 'sahil.mehta@vcet.edu.in',
      phone: '+91 98111 22334',
      rollNumber: '23EXTC05',
      year: 'TE',
      department: 'Electronics & Telecommunication',
      domainPreference: 'Sponsorship',
      skills: ['Negotiation', 'Pitch Decks', 'Canva'],
      statementOfPurpose: 'Seeking to bridge industry sponsors with VCET tech fests.',
      portfolioUrl: '',
      status: 'Declined',
      interviewSlot: null,
      adminNotes: 'Applicant accepted an alternative internship conflicting with mandatory chapter hours.',
      dateApplied: new Date(Date.now() - 6 * 86400000).toISOString(),
    },
    {
      _id: 'app_006',
      id: 'app_006',
      name: 'Sneha Desai',
      email: 'sneha.desai@vcet.edu.in',
      phone: '+91 98700 99887',
      rollNumber: '24IT033',
      year: 'SE',
      department: 'Information Technology',
      domainPreference: 'Creatives & Design',
      skills: ['Figma', 'Illustrator', 'Video Editing', 'After Effects'],
      statementOfPurpose: 'Created branding kits for college clubs; looking forward to spearheading CSI VCET digital media campaigns.',
      portfolioUrl: 'https://behance.net/snehadesai',
      status: 'Accepted',
      interviewSlot: '2026-10-14 10:00 AM',
      adminNotes: 'Outstanding visual portfolio and typography skills. Approved for Design Lead position.',
      dateApplied: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      _id: 'app_007',
      id: 'app_007',
      name: 'Aditya Joshi',
      email: 'aditya.joshi@vcet.edu.in',
      phone: '+91 91234 56789',
      rollNumber: '25CMP018',
      year: 'FE',
      department: 'Computer Engineering',
      domainPreference: 'Web & App',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
      statementOfPurpose: 'Keen to join the CSI web committee to learn backend development and contribute to chapter open-source repositories.',
      portfolioUrl: 'https://github.com/adityajoshi-dev',
      status: 'Interviewed',
      interviewSlot: '2026-10-10 03:30 PM',
      adminNotes: 'Good understanding of frontend basics, scheduled for follow-up code review.',
      dateApplied: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      _id: 'app_008',
      id: 'app_008',
      name: 'Pooja Varma',
      email: 'pooja.varma@vcet.edu.in',
      phone: '+91 99887 76655',
      rollNumber: '23AID045',
      year: 'TE',
      department: 'Artificial Intelligence & Data Science',
      domainPreference: 'Technical',
      skills: ['PyTorch', 'TensorFlow', 'FastAPI', 'Docker'],
      statementOfPurpose: 'Interested in mentoring students on Machine Learning and leading workshop sessions on Generative AI applications.',
      portfolioUrl: 'https://github.com/poojavarma-ml',
      status: 'Accepted',
      interviewSlot: '2026-10-11 04:00 PM',
      adminNotes: 'Strong ML research background, published paper in IEEE student conference.',
      dateApplied: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
  ],
  members: [
    {
      _id: 'mem_001',
      id: 'mem_001',
      name: 'Dr. Swapna Borde',
      role: 'Branch Counselor & Faculty Sponsor',
      category: 'Faculty Coordinators',
      department: 'Computer Engineering',
      year: 'Faculty',
      email: 'swapna.borde@vcet.edu.in',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: 'Ph.D. in Computer Engineering with 18+ years of academic research and student mentorship excellence at VCET.',
      priorityOrder: 1,
    },
    {
      _id: 'mem_002',
      id: 'mem_002',
      name: 'Prof. Chandan Kolvankar',
      role: 'Staff Advisor & Technical Mentor',
      category: 'Faculty Coordinators',
      department: 'Information Technology',
      year: 'Faculty',
      email: 'chandan.kolvankar@vcet.edu.in',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      bio: 'Senior Assistant Professor guiding student technical bodies, hackathon delegations, and industry collaboration.',
      priorityOrder: 2,
    },
    {
      _id: 'mem_003',
      id: 'mem_003',
      name: 'Aarav Patel',
      role: 'Chapter Chairperson',
      category: 'Core Council',
      department: 'Computer Engineering',
      year: 'BE',
      email: 'aarav.patel@csivcet.org',
      linkedin: 'https://linkedin.com/in/aarav-patel-vcet',
      github: 'https://github.com/aaravpatel',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio: 'Final year Computer Engineering student directing overall chapter strategy, university representation, and national CSI liaison.',
      priorityOrder: 3,
    },
    {
      _id: 'mem_004',
      id: 'mem_004',
      name: 'Ishita Shah',
      role: 'Vice Chairperson',
      category: 'Core Council',
      department: 'Information Technology',
      year: 'BE',
      email: 'ishita.shah@csivcet.org',
      linkedin: 'https://linkedin.com/in/ishita-shah',
      github: 'https://github.com/ishitashah',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      bio: 'Oversees internal chapter operations, member welfare, and collaborative inter-collegiate hackathons.',
      priorityOrder: 4,
    },
    {
      _id: 'mem_005',
      id: 'mem_005',
      name: 'Rohan Deshmukh',
      role: 'General Secretary',
      category: 'Core Council',
      department: 'Computer Engineering',
      year: 'TE',
      email: 'rohan.deshmukh@csivcet.org',
      linkedin: 'https://linkedin.com/in/rohan-deshmukh',
      github: 'https://github.com/rohandeshmukh',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      bio: 'Manages chapter correspondence, official meeting documentation, university records, and institutional compliance.',
      priorityOrder: 5,
    },
    {
      _id: 'mem_006',
      id: 'mem_006',
      name: 'Neha Gupta',
      role: 'Technical Head',
      category: 'Technical Team',
      department: 'Information Technology',
      year: 'TE',
      email: 'neha.gupta@csivcet.org',
      linkedin: 'https://linkedin.com/in/nehagupta-dev',
      github: 'https://github.com/nehagupta-dev',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      bio: 'Leads student technical workshops, hands-on bootcamps, and oversees the CSI VCET development and GitHub organization.',
      priorityOrder: 6,
    },
    {
      _id: 'mem_007',
      id: 'mem_007',
      name: 'Siddharth Rao',
      role: 'Events & Operations Head',
      category: 'Events & Operations',
      department: 'Artificial Intelligence & Data Science',
      year: 'TE',
      email: 'siddharth.rao@csivcet.org',
      linkedin: 'https://linkedin.com/in/siddharth-rao',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      bio: 'Directs logistics, venue setups, guest hospitality, and event scheduling for over 15+ annual flagship events.',
      priorityOrder: 7,
    },
    {
      _id: 'mem_008',
      id: 'mem_008',
      name: 'Rhea Menon',
      role: 'Creatives & PR Head',
      category: 'Creatives & PR',
      department: 'Computer Engineering',
      year: 'SE',
      email: 'rhea.menon@csivcet.org',
      linkedin: 'https://linkedin.com/in/rheamenon',
      imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
      bio: 'Heads digital creative branding, promotional trailers, social media marketing, and visual design assets.',
      priorityOrder: 8,
    },
  ],
  events: [
    {
      _id: 'ev_001',
      id: 'ev_001',
      title: 'HackVCET 2026: 36-Hour National Hackathon',
      subtitle: 'Igniting Technological Solutions for Real-World Problems',
      description: 'VCET’s flagship hackathon in association with CSI India. Over ₹1,00,000 in cash prizes, mentors from top tech companies, and tracks covering AI/ML, Web3, FinTech, and Smart Automation.',
      category: 'Hackathon',
      date: new Date('2026-11-14T09:00:00Z'),
      time: '09:00 AM - Next Day 09:00 PM IST',
      venue: 'VCET Main Auditorium & Advanced Computing Labs, Vasai',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      registrationUrl: '#apply',
      status: 'Upcoming',
      speakers: ['Tech Mentors from Google', 'AWS Community Builders'],
      seatsTotal: 250,
      seatsFilled: 198,
    },
    {
      _id: 'ev_002',
      id: 'ev_002',
      title: 'Full-Stack MERN Mastery Bootcamp',
      subtitle: 'Hands-on project building with React, Node, Express & MongoDB',
      description: 'An intensive two-day hands-on workshop guiding students through REST API design, JWT authentication, state management, and modern cloud deployment pipelines.',
      category: 'Workshop',
      date: new Date('2026-10-25T10:00:00Z'),
      time: '10:00 AM - 04:30 PM IST',
      venue: 'Lab 402, Department of Computer Engineering, VCET',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      registrationUrl: '#apply',
      status: 'Upcoming',
      speakers: ['CSI VCET Senior Core Developers'],
      seatsTotal: 80,
      seatsFilled: 68,
    },
    {
      _id: 'ev_003',
      id: 'ev_003',
      title: 'Demystifying Generative AI & LLM Systems',
      subtitle: 'Expert Seminar on RAG, Agents, and Production AI Architecture',
      description: 'Distinguished guest lecture featuring industry AI architects detailing the evolution of LLMs, embedding search, vector databases, and real-world enterprise adoption.',
      category: 'Technical Seminar',
      date: new Date('2026-10-18T11:00:00Z'),
      time: '11:00 AM - 01:30 PM IST',
      venue: 'Seminar Hall 1, VCET Campus',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      registrationUrl: '#apply',
      status: 'Upcoming',
      speakers: ['Industry AI Staff Engineer'],
      seatsTotal: 150,
      seatsFilled: 135,
    },
    {
      _id: 'ev_004',
      id: 'ev_004',
      title: 'CodeSprint: Intra-College Algorithmic Challenge',
      subtitle: 'Fast-paced algorithmic problem-solving sprint',
      description: 'Annual competitive programming contest hosted on HackerEarth. Tests data structures, algorithms, and rapid problem-solving skills across all engineering departments.',
      category: 'Coding Contest',
      date: new Date('2026-09-20T14:00:00Z'),
      time: '02:00 PM - 05:00 PM IST',
      venue: 'VCET Cloud Labs',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      registrationUrl: '#apply',
      status: 'Completed',
      speakers: ['CSI Coding Council'],
      seatsTotal: 100,
      seatsFilled: 100,
    },
  ],
};

// Initialize in-memory admin password hash
export const initInMemoryPasswords = async () => {
  if (inMemoryStore.users[0] && !inMemoryStore.users[0].password) {
    const salt = await bcrypt.genSalt(10);
    inMemoryStore.users[0].password = await bcrypt.hash(inMemoryStore.users[0].plainPassword, salt);
  }
};

// Seed MongoDB if connected
export const seedDatabase = async () => {
  await initInMemoryPasswords();
  const { connected } = getDbStatus();
  if (!connected) {
    console.log('[Seeder] In-memory store ready with sample CSI VCET data.');
    return;
  }

  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Seeder] Seeding default Admin user into MongoDB...');
      for (const u of inMemoryStore.users) {
        await User.create({
          name: u.name,
          email: u.email,
          password: u.plainPassword,
          role: u.role,
          chapterDesignation: u.chapterDesignation,
        });
      }
    }

    const appCount = await Application.countDocuments();
    if (appCount === 0) {
      console.log('[Seeder] Seeding initial student applications into MongoDB...');
      for (const a of inMemoryStore.applications) {
        const { _id, id, ...rest } = a;
        await Application.create(rest);
      }
    }

    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      console.log('[Seeder] Seeding chapter council members into MongoDB...');
      for (const m of inMemoryStore.members) {
        const { _id, id, ...rest } = m;
        await Member.create(rest);
      }
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      console.log('[Seeder] Seeding flagship events into MongoDB...');
      for (const e of inMemoryStore.events) {
        const { _id, id, ...rest } = e;
        await Event.create(rest);
      }
    }

    console.log('[Seeder] Database initialized successfully!');
  } catch (error) {
    console.error('[Seeder Error]', error.message);
  }
};
