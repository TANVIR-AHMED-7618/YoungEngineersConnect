/* =====================================================================
   Young Engineers Connect — panel and candidate data
   ---------------------------------------------------------------------
   Names, ballot numbers (SL. No.) and membership numbers (F/M No.) are taken
   from the IEB Election-2026 Final Candidates List (Young Engineers Chapter).
   ⚠ Everything else (bio, pledges, education, career, contact, photos) is still
   SAMPLE content. Replace it with each candidate's real details, then set
   sampleNotice to "" below.
   The whole site (home page + all 9 profile pages) is built from this file.

   Photos: the 9 photos in images/ are AI-generated demo portraits.
   Put each real photo in images/ with the same file name
   (e.g. images/president.jpg) or change the photo path below.
   Card photo shape: height : width = 0.9 : 1 (e.g. 900×810 px), head and shoulders,
   face near the top-centre, under 200 KB.
   Leave photo as "" to show a neutral silhouette instead.

   Icons you can use in pledges:
   handshake, student, briefcase, shield-check, scales, solar-panel,
   chalkboard-teacher, laptop, megaphone, chats-circle, first-aid, leaf,
   users-three, users, factory, wrench, hand-fist, bridge, book-open,
   globe-hemisphere-east, certificate, network, rocket-launch,
   chart-line-up, seal-check, drop, lightbulb, heartbeat, gear-six,
   buildings, lightning, compass-tool, circuitry, plant, code, cpu
   ===================================================================== */

window.YEC = {
  panel: {
    name: "Young Engineers Connect",
    election: "IEB Election 2027-28",
    slogan: "A stronger voice for young engineers",
    intro:
      "Nine of us are standing together for professional dignity, skills development and fair opportunities for young engineers. Each candidate's profile and ballot number is below.",
    date: "Friday, 20 November 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Central Auditorium, Dhaka",
    // Shown in the footer (leave empty to hide)
    contactPhone: "+880 1711-000400",
    contactEmail: "panel@example.com",
    // Credit for the demo portraits. Delete this line (or set it to "") once you use real photos.
    photoCredit: "Demo portraits are AI-generated (Stable Diffusion Face Dataset by tobecwb, CC BY 4.0).",
    // Shown at the top of every profile page while the bios are still sample text. Set to "" once real details are in.
    sampleNotice: "Preview: the photo and profile details on this page are sample content and will be replaced with the candidate's own information."
  },

  /* role: "president" | "vice-president" | "secretary" | "member"
     page: file name of this candidate's profile page (do not change) */
  candidates: [
    {
      id: "president",
      page: "president.html",
      role: "president",
      name: "Engr. Shafiul Azam (Fahim)",
      photo: "images/president.jpg",
      membershipNo: "F/16300",
      ballotNo: "2",
      tagline: "A respectful workplace for young engineers and leadership that answers to its members. That is my commitment.",
      discipline: "Civil Engineering",
      designation: "Senior Structural Engineer",
      workplace: "StrucTech Consultants Ltd.",
      experience: "14 years",
      district: "Chattogram",
      about:
        "A BUET civil engineering graduate, he has spent fifteen years designing and supervising bridges, high-rise buildings and infrastructure projects. He has long been involved in mentoring young engineers and running professional training programmes. His focus for the association is transparency, regular contact with members, and a bigger say for young engineers in its decisions.",
      education: [
        { degree: "MSc in Structural Engineering", institute: "Bangladesh University of Engineering and Technology (BUET)", year: "2015" },
        { degree: "BSc in Civil Engineering", institute: "Bangladesh University of Engineering and Technology (BUET)", year: "2012" }
      ],
      career: [
        { role: "Senior Structural Engineer", org: "StrucTech Consultants Ltd.", period: "2019 – Present", text: "Leads structural design and quality review for high-rise building and bridge projects." },
        { role: "Structural Engineer", org: "Nirman Design Associates", period: "2012 – 2019", text: "Residential and commercial building design, site inspection and project coordination." }
      ],
      achievements: [
        "Former convener of the association's Young Engineers Forum (2022–24)",
        "Organised more than 20 technical workshops for young engineers",
        "Presented a paper on earthquake-resistant building design at a national seminar"
      ],
      pledges: [
        { icon: "handshake", title: "Transparent, accountable leadership", text: "Activity and financial reports published to members every quarter." },
        { icon: "student", title: "Mentorship for young engineers", text: "A regular programme pairing young engineers with experienced professionals." },
        { icon: "briefcase", title: "Career support", text: "An online portal with job and internship openings for members." },
        { icon: "shield-check", title: "Protecting professional dignity", text: "Dialogue with policymakers on fair pay structures and safe workplaces." }
      ],
      expertise: ["Structural Design", "ETABS & SAFE", "Project Management", "Earthquake Engineering", "Team Leadership"],
      contact: { phone: "+880 1711-000401", email: "candidate1@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "vice-president",
      page: "vice-president.html",
      role: "vice-president",
      name: "Engr. Abdullah Al Shams",
      photo: "images/vice-president.jpg",
      membershipNo: "M/42015",
      ballotNo: "3",
      tagline: "I will work to make sure every member gets an equal opportunity.",
      discipline: "Electrical & Electronic Engineering",
      designation: "Deputy Manager, Grid Operations",
      workplace: "PowerGrid Solutions Ltd.",
      experience: "11 years",
      district: "Rajshahi",
      about:
        "A RUET electrical engineering graduate, he has worked for more than a decade on power transmission and renewable energy projects. He has built several networks and training initiatives for young engineers in the power sector.",
      education: [
        { degree: "MSc in Renewable Energy", institute: "Rajshahi University of Engineering & Technology (RUET)", year: "2017" },
        { degree: "BSc in Electrical & Electronic Engineering", institute: "Rajshahi University of Engineering & Technology (RUET)", year: "2014" }
      ],
      career: [
        { role: "Deputy Manager, Grid Operations", org: "PowerGrid Solutions Ltd.", period: "2020 – Present", text: "Operations and maintenance planning for national grid substations." },
        { role: "Project Engineer", org: "Sunrise Solar Technologies", period: "2014 – 2020", text: "Design, installation and commissioning of solar power projects." }
      ],
      achievements: [
        "Co-founder of a training network for young power engineers",
        "Member of the commissioning team for a 50 MW solar power plant",
        "Member of the association's training sub-committee (2023–25)"
      ],
      pledges: [
        { icon: "scales", title: "Equal opportunity and inclusion", text: "A dedicated help desk and leadership training for women engineers." },
        { icon: "solar-panel", title: "Green engineering", text: "Certificate courses on renewable energy and sustainable design." },
        { icon: "chalkboard-teacher", title: "Skills development", text: "Regular technical training in every divisional city." }
      ],
      expertise: ["Power Systems", "Substation Operations", "Solar Power", "SCADA", "Training & Presenting"],
      contact: { phone: "+880 1711-000412", email: "candidate2@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "secretary",
      page: "secretary.html",
      role: "secretary",
      name: "Engr. Asif Hossain",
      photo: "images/secretary.jpg",
      membershipNo: "M/44741",
      ballotNo: "2",
      tagline: "Every service the association offers should be digital, fast and within every member's reach.",
      discipline: "Computer Science & Engineering",
      designation: "Lead Software Engineer",
      workplace: "NexusWare Technologies",
      experience: "9 years",
      district: "Khulna",
      about:
        "A KUET CSE graduate, he has spent nearly ten years building software for local and international companies. He is standing for Secretary with a plan to move membership registration, fee payment and certificate verification online.",
      education: [
        { degree: "AWS Certified Solutions Architect", institute: "Amazon Web Services", year: "2022" },
        { degree: "BSc in Computer Science & Engineering", institute: "Khulna University of Engineering & Technology (KUET)", year: "2016" }
      ],
      career: [
        { role: "Lead Software Engineer", org: "NexusWare Technologies", period: "2021 – Present", text: "Leads a 12-person engineering team and manages cloud infrastructure." },
        { role: "Software Engineer", org: "DataBridge Ltd.", period: "2016 – 2021", text: "Backend development for banking and e-commerce software." }
      ],
      achievements: [
        "Volunteer lead for digitising the association's member database",
        "Served as a judge at a national hackathon",
        "Runs free coding workshops for young programmers"
      ],
      pledges: [
        { icon: "laptop", title: "Online member services", text: "Registration, renewal and fee payment straight from your phone." },
        { icon: "megaphone", title: "Regular updates", text: "Meeting decisions and minutes shared with members quickly." },
        { icon: "chats-circle", title: "Members' voice", text: "An online survey before every major decision." }
      ],
      expertise: ["Software Architecture", "Cloud (AWS)", "Database Design", "Team Management", "Digital Transformation"],
      contact: { phone: "+880 1711-000421", email: "candidate3@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-1",
      page: "member-1.html",
      role: "member",
      name: "Engr. Anik Islam Nirjher",
      photo: "images/member-1.jpg",
      membershipNo: "M/44797",
      ballotNo: "4",
      tagline: "I want engineers to play a bigger role in factory safety and cleaner production.",
      discipline: "Chemical Engineering",
      designation: "Process Engineer",
      workplace: "Greenfield Fertilizer Ltd.",
      experience: "7 years",
      district: "Sylhet",
      about:
        "A SUST chemical engineering graduate, he works on process optimisation in the fertiliser and chemical industry. He has a particular interest in factory safety practice and waste management.",
      education: [
        { degree: "BSc in Chemical Engineering", institute: "Shahjalal University of Science and Technology (SUST)", year: "2018" }
      ],
      career: [
        { role: "Process Engineer", org: "Greenfield Fertilizer Ltd.", period: "2019 – Present", text: "Production efficiency and energy-saving projects." }
      ],
      achievements: [
        "Team member on a project that cut plant energy costs by 12%",
        "Certified trainer in industrial safety"
      ],
      pledges: [
        { icon: "first-aid", title: "Workplace safety", text: "Safety training and awareness programmes for industrial engineers." },
        { icon: "leaf", title: "Greener industry", text: "Technical seminars on sustainable production." },
        { icon: "users-three", title: "Networking", text: "Regular meet-ups for young engineers in industry." }
      ],
      expertise: ["Process Design", "Industrial Safety", "Waste Management", "Aspen HYSYS"],
      contact: { phone: "+880 1711-000433", email: "candidate4@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-2",
      page: "member-2.html",
      role: "member",
      name: "Engr. Md. Muktadir Billah",
      photo: "images/member-2.jpg",
      membershipNo: "M/45000",
      ballotNo: "6",
      tagline: "From the factory floor to policymaking, engineers' voices need to be heard everywhere.",
      discipline: "Mechanical Engineering",
      designation: "Maintenance Manager",
      workplace: "AutoMech Industries Ltd.",
      experience: "10 years",
      district: "Gazipur",
      about:
        "A CUET mechanical engineering graduate, he works on machinery maintenance and automation in manufacturing. He is active in organising industrial engineers across the Gazipur area.",
      education: [
        { degree: "BSc in Mechanical Engineering", institute: "Chittagong University of Engineering & Technology (CUET)", year: "2015" }
      ],
      career: [
        { role: "Maintenance Manager", org: "AutoMech Industries Ltd.", period: "2020 – Present", text: "Introduced preventive maintenance that reduced machine breakdowns." },
        { role: "Mechanical Engineer", org: "Prime Steel Mills", period: "2015 – 2020", text: "Installation and supervision of production line equipment." }
      ],
      achievements: [
        "Coordinator of the Gazipur Industrial Engineers Forum",
        "Ran 10 workshops on industrial automation"
      ],
      pledges: [
        { icon: "factory", title: "Services in industrial zones", text: "Association service desks and regional meetings in industrial areas." },
        { icon: "wrench", title: "Hands-on training", text: "Practical training on automation and maintenance." },
        { icon: "hand-fist", title: "Fair rights", text: "Job security for engineers in the private sector." }
      ],
      expertise: ["Plant Maintenance", "PLC Automation", "Lean Manufacturing", "AutoCAD"],
      contact: { phone: "+880 1711-000437", email: "candidate5@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-3",
      page: "member-3.html",
      role: "member",
      name: "Engr. Abu Zafar Ansari Bin Kayes",
      photo: "images/member-3.jpg",
      membershipNo: "M/46435",
      ballotNo: "10",
      tagline: "I want to bring young engineers to the front of climate-resilient infrastructure.",
      discipline: "Civil Engineering",
      designation: "Project Engineer",
      workplace: "Urban Infra Consultants",
      experience: "6 years",
      district: "Barishal",
      about:
        "A DUET civil engineering graduate, he works on coastal road and drainage projects. His research on climate-resilient infrastructure has been presented at several conferences.",
      education: [
        { degree: "BSc in Civil Engineering", institute: "Dhaka University of Engineering & Technology (DUET)", year: "2019" }
      ],
      career: [
        { role: "Project Engineer", org: "Urban Infra Consultants", period: "2019 – Present", text: "Design and supervision of coastal roads, culverts and drainage." }
      ],
      achievements: [
        "Presented a paper on climate-resilient infrastructure at an international conference",
        "Former president of his university's civil engineering club"
      ],
      pledges: [
        { icon: "bridge", title: "Sustainable infrastructure", text: "A research forum on climate-resilient design." },
        { icon: "globe-hemisphere-east", title: "Members beyond Dhaka", text: "Online access to meetings for members outside the capital." },
        { icon: "book-open", title: "Knowledge library", text: "Codes, standards and technical guides in one place." }
      ],
      expertise: ["Road Design", "Hydrology", "AutoCAD Civil 3D", "Site Supervision"],
      contact: { phone: "+880 1711-000441", email: "candidate6@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-4",
      page: "member-4.html",
      role: "member",
      name: "Engr. Md. Zurais Ibne Ashraf",
      photo: "images/member-4.jpg",
      membershipNo: "M/48168",
      ballotNo: "14",
      tagline: "I want to bring the skills and certifications of tech-sector engineers up to international standard.",
      discipline: "Electrical & Electronic Engineering",
      designation: "Senior Network Engineer",
      workplace: "LinkNet Telecommunications",
      experience: "8 years",
      district: "Cumilla",
      about:
        "A BUET EEE graduate, he works on mobile network planning and optical fibre infrastructure. He runs regular certification prep sessions for young telecom engineers.",
      education: [
        { degree: "BSc in Electrical & Electronic Engineering", institute: "Bangladesh University of Engineering and Technology (BUET)", year: "2017" }
      ],
      career: [
        { role: "Senior Network Engineer", org: "LinkNet Telecommunications", period: "2021 – Present", text: "4G/5G network planning and optimisation." },
        { role: "Network Engineer", org: "FiberLink Bangladesh", period: "2017 – 2021", text: "Optical fibre network installation and maintenance." }
      ],
      achievements: [
        "Helped more than 200 young engineers earn networking certifications",
        "Published two papers in a telecom technical journal"
      ],
      pledges: [
        { icon: "certificate", title: "International certification", text: "Member discounts on certification courses." },
        { icon: "network", title: "Tech network", text: "A dedicated forum for ICT and telecom engineers." },
        { icon: "rocket-launch", title: "Support for founders", text: "Advice and mentor connections for engineer entrepreneurs." }
      ],
      expertise: ["Radio Network Planning", "Optical Fibre", "5G", "Training"],
      contact: { phone: "+880 1711-000446", email: "candidate7@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-5",
      page: "member-5.html",
      role: "member",
      name: "Engr. Md. Abdullah Al Mamun",
      photo: "images/member-5.jpg",
      membershipNo: "M/53553",
      ballotNo: "19",
      tagline: "I want to raise both the skills and the standing of engineers in the garment sector.",
      discipline: "Industrial & Production Engineering",
      designation: "Productivity Manager",
      workplace: "SmartWeave Apparels Ltd.",
      experience: "6 years",
      district: "Narayanganj",
      about:
        "A KUET IPE graduate, he works on productivity and quality control in the ready-made garment industry. He has led several initiatives to bring data-driven decisions to the factory floor.",
      education: [
        { degree: "BSc in Industrial & Production Engineering", institute: "Khulna University of Engineering & Technology (KUET)", year: "2019" }
      ],
      career: [
        { role: "Productivity Manager", org: "SmartWeave Apparels Ltd.", period: "2022 – Present", text: "Production line efficiency analysis and lean implementation." },
        { role: "Industrial Engineer", org: "TexPro Ltd.", period: "2019 – 2022", text: "Time and motion studies and line balancing." }
      ],
      achievements: [
        "Led a project that raised production efficiency by 18%",
        "Lean Six Sigma Green Belt certified"
      ],
      pledges: [
        { icon: "chart-line-up", title: "Skills development", text: "Short courses in industrial engineering and data analytics." },
        { icon: "users", title: "Mentorship in industry", text: "A mentorship network for young engineers in industry." },
        { icon: "seal-check", title: "Professional recognition", text: "Policy work on the rank and status of IPE engineers." }
      ],
      expertise: ["Lean Manufacturing", "Six Sigma", "Data Analytics", "Quality Control"],
      contact: { phone: "+880 1711-000452", email: "candidate8@example.com", facebook: "", linkedin: "" }
    },

    {
      id: "member-6",
      page: "member-6.html",
      role: "member",
      name: "Engr. Ali Ammar Mowaz",
      photo: "images/member-6.jpg",
      membershipNo: "M/54020",
      ballotNo: "20",
      tagline: "In a land of rivers, young engineers need more room to research and work on water management.",
      discipline: "Water Resources Engineering",
      designation: "Hydraulic Engineer",
      workplace: "Delta Water Consultants",
      experience: "7 years",
      district: "Faridpur",
      about:
        "A BUET water resources engineering graduate, he works on hydraulic modelling for river training, embankment and irrigation projects. He is keen to combine field experience in flood management with research.",
      education: [
        { degree: "MSc in Water Resources Engineering", institute: "Bangladesh University of Engineering and Technology (BUET)", year: "2021" },
        { degree: "BSc in Water Resources Engineering", institute: "Bangladesh University of Engineering and Technology (BUET)", year: "2018" }
      ],
      career: [
        { role: "Hydraulic Engineer", org: "Delta Water Consultants", period: "2018 – Present", text: "Hydraulic modelling for riverbank protection and irrigation projects." }
      ],
      achievements: [
        "Published research on flood forecasting models",
        "Coordinator of a volunteer engineers' disaster response team"
      ],
      pledges: [
        { icon: "drop", title: "Water and climate", text: "Research grants for water resources and climate work." },
        { icon: "lightbulb", title: "Research support", text: "Help for young engineers to publish papers and attend conferences." },
        { icon: "heartbeat", title: "Standing by in disasters", text: "A volunteer engineers' team for disaster response." }
      ],
      expertise: ["Hydraulic Modelling", "HEC-RAS", "Flood Management", "GIS"],
      contact: { phone: "+880 1711-000458", email: "candidate9@example.com", facebook: "", linkedin: "" }
    }
  ]
};
