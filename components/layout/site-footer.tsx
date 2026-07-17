import Link from "next/link";
import { Globe, MessageCircle, Users } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { getCategories } from "@/lib/data/categories";

const socials = [
  { href: "#", label: "Website", icon: Globe },
  { href: "#", label: "Community", icon: MessageCircle },
  { href: "#", label: "Team", icon: Users },
];

export async function SiteFooter() {
  const categories = await getCategories();

  const footerLinks = {
    Product: [
      { href: "/categories", label: "Categories" },
      { href: "/search", label: "Explore tools" },
    ],
    Categories: categories.slice(0, 4).map((category) => ({
      href: `/category/${category.slug}`,
      label: category.name,
    })),
    Company: [
      { href: "#", label: "About" },
      { href: "#", label: "Submit a tool" },
      { href: "#", label: "Contact" },
    ],
  };

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              The directory for discovering, comparing, and choosing the
              right AI agent or tool for whatever you&apos;re building.
            </p>
            <div className="mt-2 flex items-center gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-foreground">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Agentory. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for people trying to find the right AI tool, faster.
          </p>
        </div>
      </div>
    </footer>
  );
}
