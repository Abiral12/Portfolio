"use client";

import React, { useMemo, useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Mail, ExternalLink, FileDown, ArrowRight, Sparkles, Code2, Briefcase, Phone, Globe, Star, Moon, Sun, CodeXml} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeProvider, useTheme } from "next-themes";
import Image from "next/image";
import { Code } from 'lucide-react';
import Link from "next/link";
import type { Transition, Easing } from "framer-motion";

const EASE: Easing = [0.22, 1, 0.36, 1];

const SPRING_SOFT: Transition = { type: "spring", stiffness: 220, damping: 22 };
const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 340, damping: 18 };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } }
} as const;

const profile = {
  name: "Abiral Panta",
  role: "Full‑Stack Developer | Next.js • Prisma • AI",
  blurb:
    "I craft fast, elegant web apps with delightful UX, strong systems design, and pragmatic attention to detail.",
  location: "Kathmandu, Nepal",
  social: {
    github: "https://github.com/Abiral12",
    linkedin: "https://linkedin.com/in/abiral-panta-89704b272/",
    email: "mailto:abiralpanta39@gmail.com",
    website: "https://example.com",
    resume: "/resume.pdf"
  }
} as const;

const skills: string[] = [
  "Next.js 15 (App Router)",
  "TypeScript",
  "shadcn/ui",
  "Tailwind CSS",
  "Framer Motion",
  "Prisma + PostgreSQL",
  "MongoDB",
  "tRPC / REST",
  "Vercel",
  "Playwright / Vitest",
  "CI/CD",
  "System Design"
];

interface Project {
  title: string;
  desc: string;
  tags: string[];
  image?: string;
  links?: { live?: string; repo?: string };
}

const projects: Project[] = [
  {
    title: "PCOMS — Office Management System",
    desc: " office management system to check what employees are doing and manage their tasks. Built with Next.js, Prisma, Postgres, and QStash for notification schedules.",
    image: "/image.png",
    tags: ["Next.js", "Prisma", "Postgres", "QStash"],
    links: { live: "https://pcoms.vercel.app/", repo: "" }
  },
  {
    title: "Stock Management System",
    desc: "A full‑stack inventory and order management app with role‑based access, reporting, and CSV import/export.",
    image: "/image1.png",
    tags: ["Next.js", "ExpressJs", "NodeJs", "MongoDB", "Chart.js", "Tailwind", "Framer Motion", "Vercel"],
    links: { live: "https://foreveryoung8848.vercel.app/", repo: "https://github.com/Abiral12/Stock-Management-system" }
  },
  {
    title: "Medicine Scanner",
    desc: "A mobile‑friendly web app to scan medicine barcodes and retrieve drug information using a open router API with regex fallback .",
    image: "/image2.jpg",
    tags: ["Next.js", "Tesseractjs", "Workers", "openAi", "qwenAi", "NemotronAi", "prisma", "PostgreSQL"],
    links: { live: "#", repo: "#" }
  },
    {
    title: "Pharmacy Management System",
    desc: "A comprehensive pharmacy management system with inventory tracking, Ai Medicine scanner, Rack management, sales processing, and reporting features. Built with Next.js, Prisma, and PostgreSQL.",
    image: "/image3.png",
    tags: ["Next.js", "Tesseractjs", "Workers", "openAi", "qwenAi", "NemotronAi", "prisma", "PostgreSQL", "Tailwind", "Framer Motion", "Vercel"],
    links: { live: "#", repo: "#" }
  }
];

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

const experience: ExperienceItem[] = [
  {
    company: "Paradox City Inc",
    role: "Intern Full‑Stack Developer/Team Lead",
    period: "Aug 2025 — Present",
    bullets: [
      "Designed and shipped production Next.js apps with modern UI patterns (drag/drop, resizable windows, advanced tables).",
      "Built OCR and AI‑assisted workflows to reduce manual pharmacy intake time by 60%.",
      "Implemented rack FEFO allocation logic and shelf‑capacity planning for multi‑tenant orgs."
    ]
  },
  {
    company: "open‑source projects",
    role: "Freelance Developer / Debugger",
    period: "2023 — Present",
    bullets: [
      "Auth UI components, data‑viz, and DX tooling in TypeScript.",
      "Maintainer of small libraries and CLI utilities."
    ]
  }
];

function SectionTitle({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="rounded-2xl p-2 border shadow-sm">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function ThemeToggle(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light" : "Switch to dark"}
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
      className="relative inline-block px-1 py-0.5"
    >
      <span className="relative z-10">{children}</span>
      {/* underline grows from center */}
      <motion.span
        layoutId="nav-underline" // shared ID = buttery transitions between links
        className="absolute left-1/2 -bottom-[2px] h-[2px] w-0 bg-foreground/50"
        initial={false}
        whileHover={{ left: 0, width: "100%" }}
        transition={{ duration: 0.22, ease: EASE }}
      />
    </motion.a>
  );
}


function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight flex items-center gap-2">
          <Code className="size-5" /> {profile.name} <CodeXml className="size-5" />
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
  <NavLink href="#about">About</NavLink>
  <NavLink href="#skills">Skills</NavLink>
  <NavLink href="#projects">Projects</NavLink>
  <NavLink href="#experience">Experience</NavLink>
  <NavLink href="#contact">Contact</NavLink>
</nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={profile.social.resume}>
              <FileDown className="mr-2 size-4" /> Resume
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={profile.social.github} target="_blank" rel="noreferrer">
              <Github className="mr-2 size-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function MButton(props: React.ComponentProps<typeof Button>) {
  const { children, className, ...rest } = props;
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING_SNAPPY}
      className="inline-block"
    >
      <Button {...rest} className={className}>{children}</Button>
    </motion.div>
  );
}


function Hero(): JSX.Element {
  return (
    <section id="home" className="relative overflow-clip">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item} className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Building delightful, high‑performance web experiences
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-base md:text-lg text-muted-foreground">
            {profile.blurb}
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
           <MButton asChild>
  <a href="#projects">
    View Projects <ArrowRight className="ml-2 size-4" />
  </a>
</MButton>
            <MButton asChild>
  <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
    <Linkedin className="mr-2 size-4" /> LinkedIn
  </a>
</MButton>

<MButton asChild>
  <a href={profile.social.website} target="_blank" rel="noreferrer">
    <Globe className="mr-2 size-4" /> Website
  </a>
</MButton>
          </motion.div>
        </motion.div>

        <div className="aspect-[4/3] w-full rounded-3xl border bg-gradient-to-br from-muted to-background p-2 group">
  <motion.div
    whileHover={{ scale: 1.01 }}
    transition={SPRING_SOFT}
    className="h-full w-full rounded-2xl border bg-background overflow-hidden relative"
  >
            <div className="h-full w-full rounded-2xl border bg-background grid place-items-center text-center ">
              
                <Image
                  src="/images/hero2.jpg"
                  alt="Profile picture"
                  width={300} height={300}
                  className="rounded-2xl object-cover"
                ></Image>
              
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
         style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.25)" }} />
            </div>
             </motion.div>
          </div>
       
      </div>
    </section>
  );
}

function About(): JSX.Element {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle icon={Sparkles} title="About" subtitle={profile.location} />
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Who am I?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              I’m a product‑minded engineer who enjoys clean architecture, accessible UI, and animation that serves purpose.
              I partner with teams to ship end‑to‑end: from discovery and design to data modeling, testing, and delivery.
            </p>
            <p>
              Recently, I’ve been building AI‑powered tools for pharmacies and analytics dashboards for sports data.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href={profile.social.email} className="flex items-center gap-2 text-sm hover:underline">
              <Mail className="size-4"/> abiralpanta39@gmail.com
            </a>
            <a href={profile.social.github} className="flex items-center gap-2 text-sm hover:underline" target="_blank" rel="noreferrer">
              <Github className="size-4"/> github.com/Abiral12
            </a>
            <a href={profile.social.linkedin} className="flex items-center gap-2 text-sm hover:underline" target="_blank" rel="noreferrer">
              <Linkedin className="size-4"/> linkedin.com/in/abiral-panta-89704b272/
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Skills(): JSX.Element {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle icon={Star} title="Skills" subtitle="Strong foundations, practical patterns" />
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {skills.map((s) => (
          <motion.li key={s} variants={item}>
  <motion.div
    whileHover={{ y: -2, scale: 1.03 }}
    transition={SPRING_SOFT}
    className="rounded-full"
  >
    <Badge
      variant="secondary"
      className="rounded-full px-3 py-1 text-sm shadow-sm hover:shadow transition-shadow"
    >
      {s}
    </Badge>
  </motion.div>
</motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

function Projects(): JSX.Element {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle icon={Briefcase} title="Selected Projects" subtitle="Quality over quantity" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.div
  key={p.title}
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <motion.div
    whileHover={{ y: -6 }}
    transition={SPRING_SOFT}
    className="rounded-xl"
  >
    <Card className="h-full overflow-hidden group relative">
      {/* animated gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ boxShadow: "0 0 0 1px hsl(var(--ring)) inset" }} />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="tracking-tight">{p.title}</span>
          <span className="flex gap-3">
            {p.links?.live && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="text-sm inline-flex items-center gap-1 hover:underline"
                href={p.links.live}
                target="_blank"
                rel="noreferrer"
              >
                Live <ExternalLink className="size-3" />
              </motion.a>
            )}
            {p.links?.repo && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="text-sm inline-flex items-center gap-1 hover:underline"
                href={p.links.repo}
                target="_blank"
                rel="noreferrer"
              >
                Code <ExternalLink className="size-3" />
              </motion.a>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-[16/9] w-full rounded-xl border overflow-hidden bg-gradient-to-br from-muted to-background">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="h-full w-full"
          >
            <Image
              src={p.image || "/fallback.png"}
              alt="Project screenshot"
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
        <p className="text-sm text-muted-foreground">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <motion.div key={t} whileHover={{ y: -2 }} transition={SPRING_SOFT}>
              <Badge variant="outline" className="rounded-full">{t}</Badge>
            </motion.div>
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

function Experience(): JSX.Element {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle icon={Code2} title="Experience" subtitle="Impact and responsibilities" />
      <div className="space-y-6">
        {experience.map((e) => (
          <motion.div key={e.company} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{e.role} · <span className="text-muted-foreground">{e.company}</span></span>
                  <span className="text-sm text-muted-foreground">{e.period}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {e.bullets.map((b) => (<li key={b}>{b}</li>))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact(): JSX.Element {
  const [pending, setPending] = useState<boolean>(false);
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle icon={Phone} title="Contact" subtitle="Let’s build something great" />
      <Card>
        <CardContent className="pt-6">
          <form
            onSubmit={async (e) => {
  e.preventDefault();
  try {
    setPending(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      botField: String(formData.get("company") || ""), // honeypot
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to send");
    form.reset();
    alert("Thanks! Your message is on its way ✉️");
  } catch (err: any) {
    alert(err?.message || "Something went wrong.");
  } finally {
    setPending(false);
  }
}}

            className="grid gap-4 md:grid-cols-2"
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
              <Textarea id="message" name="message" placeholder="Tell me about your project…" rows={5} />
              <input type="text" name="company" autoComplete="off" tabIndex={-1} className="hidden" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default function PortfolioPage(): JSX.Element {
  const year = useMemo<number>(() => new Date().getFullYear(), []);

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
        <footer className="border-t mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
            <p>© {year} {profile.name}. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a className="inline-flex items-center gap-1 hover:underline" href={profile.social.github} target="_blank" rel="noreferrer">
                <Github className="size-4"/> GitHub
              </a>
              <a className="inline-flex items-center gap-1 hover:underline" href={profile.social.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-4"/> LinkedIn
              </a>
              <a className="inline-flex items-center gap-1 hover:underline" href={profile.social.email}>
                <Mail className="size-4"/> Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
