"use client";

import React, { JSX, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Code2,
  CodeXml,
  ExternalLink,
  FileDown,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Easing, Transition } from "framer-motion";

const EASE: Easing = [0.22, 1, 0.36, 1];
const SPRING_SOFT: Transition = { type: "spring", stiffness: 220, damping: 22 };
const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 340, damping: 20 };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
} as const;

type Project = {
  title: string;
  summary: string;
  impact: string;
  image: string;
  tags: string[];
  links: {
    live?: string;
    repo?: string;
  };
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

type Highlight = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const profile = {
  name: "Abiral Panta",
  role: "Full-Stack Developer focused on real business systems",
  intro:
    "I build production-ready web applications with strong backend thinking, clean UI, and systems that solve actual operational problems.",
  about:
    "I am a full-stack developer from Kathmandu who enjoys turning messy business workflows into usable software. My strongest work sits at the intersection of product thinking, backend logic, database design, and polished frontend implementation. I do not just build pages—I design flows, permissions, APIs, data models, and operational tools that help teams work faster and with less friction.",
  niche:
    "Most of my recent work has been around management systems, pharmacy workflows, OCR and AI-assisted tools, and scalable Next.js applications with real business rules.",
  location: "Kathmandu, Nepal",
  socials: {
    github: "https://github.com/Abiral12",
    linkedin: "https://linkedin.com/in/abiral-panta-89704b272/",
    email: "mailto:abiralpanta39@gmail.com",
    resume: "/resume.pdf",
    website: "#",
  },
} as const;

const highlights: Highlight[] = [
  {
    label: "Primary stack",
    value: "Next.js, TypeScript, PostgreSQL, Prisma, Supabase",
    icon: Code2,
  },
  {
    label: "What I build",
    value: "SaaS dashboards, internal tools, OCR and AI workflows",
    icon: Workflow,
  },
  {
    label: "What I care about",
    value: "Maintainability, performance, access control, product clarity",
    icon: ShieldCheck,
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
  "REST APIs",
  "RBAC",
  "OCR workflows",
  "AI integration",
  "System design",
  "GitHub Actions",
  "Docker",
] as const;

const projects: Project[] = [
  {
    title: "MyPharmaCity / Pharmacy Management System",
    summary:
      "A pharmacy operations platform built for real business use, covering inventory, sales, rack management, AI medicine scanning, and multi-step subscription onboarding.",
    impact:
      "This project reflects my backend and product strength most clearly: database design, business rules, multi-tenant thinking, API structure, and admin workflows.",
    image: "/image3.png",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "OCR",
      "AI Integration",
      "RBAC",
    ],
    links: {
      live: "#",
      repo: "#",
    },
  },
  {
    title: "PCOMS — Office Management System",
    summary:
      "An internal office system for managing employee work visibility, task tracking, and scheduled notifications with a practical business-first approach.",
    impact:
      "Demonstrates my ability to build clean operational tools that are useful for teams, not just visually polished demos.",
    image: "/image.png",
    tags: ["Next.js", "Prisma", "PostgreSQL", "QStash", "Task Systems"],
    links: {
      live: "https://pcoms.vercel.app/",
      repo: "",
    },
  },
  {
    title: "Stock Management System",
    summary:
      "A full-stack inventory platform with reporting, role-aware access, import/export flows, and administrative controls.",
    impact:
      "Highlights my ability to work across frontend, backend, data handling, and business reporting in one product.",
    image: "/image1.png",
    tags: [
      "Next.js",
      "Express",
      "Node.js",
      "MongoDB",
      "Chart.js",
      "Tailwind",
    ],
    links: {
      live: "https://foreveryoung8848.vercel.app/",
      repo: "https://github.com/Abiral12/Stock-Management-system",
    },
  },
  {
    title: "Medicine Scanner",
    summary:
      "A mobile-friendly scanner flow for extracting medicine information using OCR, AI models, and fallback parsing logic.",
    impact:
      "Shows that I can combine modern frontend UX with applied AI and error-tolerant backend workflow design.",
    image: "/image2.jpg",
    tags: [
      "Next.js",
      "Tesseract.js",
      "Workers",
      "OpenRouter",
      "Regex Fallback",
      "PostgreSQL",
    ],
    links: {
      live: "#",
      repo: "#",
    },
  },
];

const experience: ExperienceItem[] = [
  {
    company: "Paradox City Inc",
    role: "Intern Full-Stack Developer / Team Lead",
    period: "Aug 2025 — Present",
    bullets: [
      "Built production-grade Next.js applications with modern UX patterns, structured APIs, and maintainable component systems.",
      "Worked on pharmacy-oriented business systems involving OCR, AI-assisted data extraction, rack logic, and subscription workflows.",
      "Led implementation decisions across frontend, backend, and database layers while coordinating delivery with practical product goals.",
    ],
  },
  {
    company: "Independent and open-source work",
    role: "Developer / Debugger",
    period: "2023 — Present",
    bullets: [
      "Built and debugged full-stack projects spanning authentication, dashboards, forms, CRUD systems, and database integration.",
      "Improved DX, fixed architecture issues, and shipped reusable UI and TypeScript-based solutions across multiple projects.",
    ],
  },
];

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 flex items-start gap-3">
      <div className="rounded-2xl border bg-background p-2.5 shadow-sm">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function ThemeToggle(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      transition={SPRING_SOFT}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </motion.a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <CodeXml className="size-5" />
          <span>{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={profile.socials.resume}>
              <FileDown className="mr-2 size-4" /> Resume
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <Github className="mr-2 size-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function MotionButton(props: React.ComponentProps<typeof Button>) {
  const { children, className, ...rest } = props;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING_SNAPPY}
      className="inline-block"
    >
      <Button {...rest} className={className}>
        {children}
      </Button>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--muted))_0,transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--muted))_0,transparent_35%)]" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.25fr_0.95fr] md:py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <BadgeCheck className="size-4" />
            Full-stack developer building real-world systems
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          >
            I build software that solves operational problems, not just pretty screens.
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <MotionButton asChild>
              <a href="#projects">
                View projects <ArrowRight className="ml-2 size-4" />
              </a>
            </MotionButton>
            <MotionButton asChild variant="outline">
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 size-4" /> LinkedIn
              </a>
            </MotionButton>
            <MotionButton asChild variant="outline">
              <a href={profile.socials.email}>
                <Mail className="mr-2 size-4" /> Contact me
              </a>
            </MotionButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <Card key={highlight.label} className="border-border/70 bg-background/70">
                  <CardContent className="p-4">
                    <Icon className="mb-3 size-5 text-muted-foreground" />
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {highlight.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6">{highlight.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
        >
          <div className="rounded-[28px] border bg-gradient-to-br from-muted/80 to-background p-3 shadow-sm">
            <div className="overflow-hidden rounded-[22px] border bg-background">
              <div className="relative aspect-[4/4.4]">
                <Image
                  src="/images/hero2.jpg"
                  alt="Portrait of Abiral Panta"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-5">
                  <div className="rounded-2xl border bg-background/85 p-4 backdrop-blur">
                    <p className="text-sm font-semibold">{profile.role}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        icon={Sparkles}
        title="About"
        subtitle="A developer who thinks in products, workflows, and systems"
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>What I bring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>{profile.about}</p>
            <p>{profile.niche}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Focus</p>
              <p className="mt-1 font-medium">Full-stack product engineering</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Strengths</p>
              <p className="mt-1 font-medium">Backend logic, database design, polished frontend delivery</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Based in</p>
              <p className="mt-1 font-medium">Kathmandu, Nepal</p>
            </div>
            <div className="pt-2 text-sm">
              <a href={profile.socials.email} className="flex items-center gap-2 py-1 hover:underline">
                <Mail className="size-4" /> abiralpanta39@gmail.com
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-1 hover:underline"
              >
                <Github className="size-4" /> github.com/Abiral12
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-1 hover:underline"
              >
                <Linkedin className="size-4" /> linkedin.com/in/abiral-panta-89704b272/
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        icon={Star}
        title="Skills"
        subtitle="Tools are useful, but the value is in how I apply them"
      />

      <Card>
        <CardContent className="p-6">
          <div className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            I am strongest when a project needs both implementation and thinking: database structure, backend flow, frontend delivery, role-based permissions, and product logic that matches real use cases.
          </div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {skills.map((skill) => (
              <motion.li key={skill} variants={item}>
                <motion.div whileHover={{ y: -2, scale: 1.03 }} transition={SPRING_SOFT}>
                  <Badge className="rounded-full px-3 py-1.5 text-sm" variant="secondary">
                    {skill}
                  </Badge>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        icon={Briefcase}
        title="Selected Projects"
        subtitle="Projects that reflect my actual engineering potential"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div whileHover={{ y: -6 }} transition={SPRING_SOFT}>
              <Card className="group h-full overflow-hidden border-border/70">
                <div className="relative aspect-[16/9] overflow-hidden border-b bg-muted/40">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl tracking-tight">{project.title}</CardTitle>
                    <div className="flex shrink-0 items-center gap-3 text-sm">
                      {project.links.live && project.links.live !== "#" ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          Live <ExternalLink className="size-3" />
                        </a>
                      ) : null}
                      {project.links.repo && project.links.repo !== "#" ? (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          Code <ExternalLink className="size-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
                  <div className="rounded-2xl border bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Why it matters
                    </p>
                    <p className="mt-2 text-sm leading-7">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        icon={Code2}
        title="Experience"
        subtitle="Evidence of ownership, delivery, and technical growth"
      />

      <div className="space-y-6">
        {experience.map((entry) => (
          <motion.div
            key={`${entry.company}-${entry.role}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <span>
                    {entry.role} <span className="text-muted-foreground">· {entry.company}</span>
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">{entry.period}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        icon={Phone}
        title="Contact"
        subtitle="For internships, freelance work, product collaboration, or technical roles"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Let’s talk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              I am especially interested in opportunities where I can work on real products, backend-heavy systems, internal tools, SaaS platforms, or business workflow software.
            </p>
            <div className="space-y-2 pt-2 text-foreground">
              <a href={profile.socials.email} className="flex items-center gap-2 hover:underline">
                <Mail className="size-4" /> abiralpanta39@gmail.com
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus(null);
                setError(null);

                try {
                  setPending(true);
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);

                  const payload = {
                    name: String(formData.get("name") || "").trim(),
                    email: String(formData.get("email") || "").trim(),
                    message: String(formData.get("message") || "").trim(),
                    botField: String(formData.get("company") || ""),
                  };

                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  const data = await res.json();
                  if (!res.ok) {
                    throw new Error(data?.error || "Failed to send message.");
                  }

                  form.reset();
                  setStatus("Message sent successfully.");
                } catch (err: unknown) {
                  const message = err instanceof Error ? err.message : "Something went wrong.";
                  setError(message);
                } finally {
                  setPending(false);
                }
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about the role, project, or collaboration..."
                  rows={6}
                  required
                />
                <input type="text" name="company" autoComplete="off" tabIndex={-1} className="hidden" />
              </div>

              <div className="md:col-span-2 flex flex-col items-start gap-3">
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending..." : "Send message"}
                </Button>

                {status ? <p className="text-sm text-green-600 dark:text-green-400">{status}</p> : null}
                {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>© {year} {profile.name}. Built with Next.js and intention.</p>
        <div className="flex items-center gap-4">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <Github className="size-4" /> GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <Linkedin className="size-4" /> LinkedIn
          </a>
          <a href={profile.socials.email} className="inline-flex items-center gap-1 hover:underline">
            <Mail className="size-4" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioPage(): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
