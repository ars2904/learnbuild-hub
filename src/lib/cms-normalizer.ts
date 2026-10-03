import { CMSBlog, CMSWorkshop, CMSCourse, CMSSolution, CMSInstructor, CMSSiteSettings } from "./data/cmsStore";

export function isUuid(str: string): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

// ================= BLOG NORMALIZERS =================
export function normalizeBlogFromDb(row: any): CMSBlog {
  if (!row) return {} as CMSBlog;
  return {
    id: row.id,
    slug: row.slug || "",
    title: row.title || "",
    excerpt: row.excerpt || "",
    content: row.content || "",
    category: row.category || "Engineering",
    authorName: row.author_name || row.authorName || "LearnBuild Hub Tech Team",
    authorAvatar: row.author_avatar || row.authorAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    coverImage: row.cover_image || row.coverImage || row.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    readTime: row.read_time || row.readTime || "5 min read",
    publishedAt: row.published_at || row.publishedAt || new Date().toISOString(),
    featured: Boolean(row.featured),
  };
}

export function normalizeBlogToDb(item: any): any {
  if (!item) return {};
  const payload: any = {
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `blog-${Date.now()}`),
    title: item.title || "",
    excerpt: item.excerpt || "",
    content: item.content || "",
    category: item.category || "Engineering",
    author_name: item.authorName || item.author_name || "LearnBuild Hub Tech Team",
    author_avatar: item.authorAvatar || item.author_avatar || null,
    cover_image: item.coverImage || item.cover_image || item.image || null,
    read_time: item.readTime || item.read_time || "5 min read",
    external_url: item.externalUrl || item.external_url || null,
    published_at: item.publishedAt || item.published_at || new Date().toISOString(),
    featured: Boolean(item.featured),
  };
  if (isUuid(item.id)) {
    payload.id = item.id;
  }
  return payload;
}

// ================= WORKSHOP NORMALIZERS =================
export function normalizeWorkshopFromDb(row: any): CMSWorkshop {
  if (!row) return {} as CMSWorkshop;
  let parsedAgenda: string[] = [];
  if (Array.isArray(row.agenda)) {
    parsedAgenda = row.agenda;
  } else if (typeof row.agenda === "string") {
    try { parsedAgenda = JSON.parse(row.agenda); } catch { parsedAgenda = []; }
  }

  let parsedLearn: string[] = [];
  const rawLearn = row.what_you_will_learn || row.whatYouWillLearn;
  if (Array.isArray(rawLearn)) {
    parsedLearn = rawLearn;
  } else if (typeof rawLearn === "string") {
    try { parsedLearn = JSON.parse(rawLearn); } catch { parsedLearn = []; }
  }

  return {
    id: row.id,
    slug: row.slug || "",
    title: row.title || "",
    tagline: row.tagline || "",
    description: row.description || "",
    category: row.category || "Engineering",
    eventDate: row.event_date || row.eventDate || new Date().toISOString(),
    duration: row.duration || "2 Hours",
    mode: row.mode || "Live Online Masterclass",
    price: Number(row.price) || 0,
    speakerName: row.speaker_name || row.speakerName || "Saurabh Upadhyay",
    speakerRole: row.speaker_role || row.speakerRole || "Senior Software Architect",
    speakerAvatar: row.speaker_avatar || row.speakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverImage: row.cover_image || row.coverImage || "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    agenda: parsedAgenda,
    whatYouWillLearn: parsedLearn,
    status: row.status || "upcoming",
    createdAt: row.created_at || row.createdAt,
  };
}

export function normalizeWorkshopToDb(item: any): any {
  if (!item) return {};
  const payload: any = {
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `workshop-${Date.now()}`),
    title: item.title || "",
    tagline: item.tagline || "",
    description: item.description || "",
    category: item.category || "Engineering",
    event_date: item.eventDate || item.event_date || new Date().toISOString(),
    duration: item.duration || "2 Hours",
    mode: item.mode || "Live Online Masterclass",
    price: Number(item.price) || 0,
    speaker_name: item.speakerName || item.speaker_name || "Saurabh Upadhyay",
    speaker_role: item.speakerRole || item.speaker_role || "Senior Software Architect",
    speaker_avatar: item.speakerAvatar || item.speaker_avatar || null,
    cover_image: item.coverImage || item.cover_image || null,
    agenda: Array.isArray(item.agenda) ? item.agenda : [],
    what_you_will_learn: Array.isArray(item.whatYouWillLearn) ? item.whatYouWillLearn : (Array.isArray(item.what_you_will_learn) ? item.what_you_will_learn : []),
    status: item.status || "upcoming",
  };
  if (isUuid(item.id)) {
    payload.id = item.id;
  }
  return payload;
}

// ================= COURSE NORMALIZERS =================
export function normalizeCourseFromDb(row: any): CMSCourse {
  if (!row) return {} as CMSCourse;
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title || "",
    category: row.category || "Web Engineering",
    description: row.description || "",
    price: Number(row.price) || 0,
    originalPrice: Number(row.original_price || row.originalPrice || 0),
    duration: row.duration || "12 Weeks",
    badge: row.badge || "Popular",
    rating: Number(row.rating) || 4.9,
    studentsCount: Number(row.students_count || row.studentsCount || 1000),
    image: row.image || "",
    instructorName: row.instructor_name || row.instructorName || "Senior Engineer",
    syllabus: Array.isArray(row.syllabus) ? row.syllabus : [],
    skills: Array.isArray(row.skills) ? row.skills : [],
    featured: Boolean(row.featured),
  };
}

export function normalizeCourseToDb(item: any): any {
  if (!item) return {};
  const payload: any = {
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `course-${Date.now()}`),
    title: item.title || "",
    category: item.category || "Web Engineering",
    description: item.description || "",
    price: Number(item.price) || 0,
    original_price: Number(item.originalPrice || item.original_price || 0),
    duration: item.duration || "12 Weeks",
    badge: item.badge || "Popular",
    rating: Number(item.rating) || 4.9,
    students_count: Number(item.studentsCount || item.students_count || 1000),
    image: item.image || "",
    instructor_name: item.instructorName || item.instructor_name || "Senior Engineer",
    syllabus: Array.isArray(item.syllabus) ? item.syllabus : [],
    skills: Array.isArray(item.skills) ? item.skills : [],
    featured: Boolean(item.featured),
  };
  if (isUuid(item.id)) {
    payload.id = item.id;
  }
  return payload;
}

// ================= SOLUTION NORMALIZERS =================
export function normalizeSolutionFromDb(row: any): CMSSolution {
  if (!row) return {} as CMSSolution;
  return {
    id: row.id,
    title: row.title || "",
    category: row.category || "Software Suite",
    tag: row.tag || "Enterprise Grade",
    description: row.description || "",
    image: row.image || "",
    demoUrl: row.demo_url || row.demoUrl || "/admin/demos",
    priceEstimate: row.price_estimate || row.priceEstimate || "₹1,49,000",
    features: Array.isArray(row.features) ? row.features : [],
    techStack: Array.isArray(row.tech_stack || row.techStack) ? (row.tech_stack || row.techStack) : [],
    featured: Boolean(row.featured),
  };
}

export function normalizeSolutionToDb(item: any): any {
  if (!item) return {};
  const payload: any = {
    title: item.title || "",
    category: item.category || "Software Suite",
    tag: item.tag || "Enterprise Grade",
    description: item.description || "",
    image: item.image || "",
    demo_url: item.demoUrl || item.demo_url || "/admin/demos",
    price_estimate: item.priceEstimate || item.price_estimate || "₹1,49,000",
    features: Array.isArray(item.features) ? item.features : [],
    tech_stack: Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.tech_stack) ? item.tech_stack : []),
    featured: Boolean(item.featured),
  };
  if (isUuid(item.id)) {
    payload.id = item.id;
  }
  return payload;
}

// ================= INSTRUCTOR NORMALIZERS =================
export function normalizeInstructorFromDb(row: any): CMSInstructor {
  if (!row) return {} as CMSInstructor;
  return {
    id: row.id,
    name: row.name || "",
    role: row.role || "Architect & Mentor",
    bio: row.bio || "",
    avatar: row.avatar || "",
    expertise: Array.isArray(row.expertise) ? row.expertise : [],
    experienceYears: Number(row.experience_years || row.experienceYears || 5),
    rating: Number(row.rating || 4.9),
    studentsCount: Number(row.students_count || row.studentsCount || 500),
  };
}

export function normalizeInstructorToDb(item: any): any {
  if (!item) return {};
  const payload: any = {
    name: item.name || "",
    role: item.role || "Architect & Mentor",
    bio: item.bio || "",
    avatar: item.avatar || "",
    expertise: Array.isArray(item.expertise) ? item.expertise : [],
    experience_years: Number(item.experienceYears || item.experience_years || 5),
    rating: Number(item.rating || 4.9),
    students_count: Number(item.studentsCount || item.students_count || 500),
  };
  if (isUuid(item.id)) {
    payload.id = item.id;
  }
  return payload;
}

// ================= SITE SETTINGS NORMALIZERS =================
export function normalizeSiteSettingsFromDb(row: any): CMSSiteSettings {
  if (!row) return {} as CMSSiteSettings;
  return {
    heroTitle: row.hero_title || row.heroTitle || "",
    heroSubtitle: row.hero_subtitle || row.heroSubtitle || "",
    announcementBanner: row.announcement_banner || row.announcementBanner || "",
    contactEmail: row.contact_email || row.contactEmail || "",
    contactPhone: row.contact_phone || row.contactPhone || "",
    whatsappPhone: row.whatsapp_phone || row.whatsappPhone || "",
    studentsTrainedCount: row.students_trained_count || row.studentsTrainedCount || "",
    placementRate: row.placement_rate || row.placementRate || "",
    projectsDeliveredCount: row.projects_delivered_count || row.projectsDeliveredCount || "",
    satisfactionRate: row.satisfaction_rate || row.satisfactionRate || "",
  };
}

export function normalizeSiteSettingsToDb(item: any): any {
  if (!item) return {};
  return {
    hero_title: item.heroTitle || item.hero_title || "",
    hero_subtitle: item.heroSubtitle || item.hero_subtitle || "",
    announcement_banner: item.announcementBanner || item.announcement_banner || "",
    contact_email: item.contactEmail || item.contact_email || "",
    contact_phone: item.contactPhone || item.contact_phone || "",
    whatsapp_phone: item.whatsappPhone || item.whatsapp_phone || "",
    students_trained_count: item.studentsTrainedCount || item.students_trained_count || "",
    placement_rate: item.placementRate || item.placement_rate || "",
    projects_delivered_count: item.projectsDeliveredCount || item.projects_delivered_count || "",
    satisfaction_rate: item.satisfactionRate || item.satisfaction_rate || "",
  };
}
