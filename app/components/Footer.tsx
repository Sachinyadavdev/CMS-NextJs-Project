"use client";

import Link from "next/link";
import { Linkedin, X, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "Real Estate & Construction", slug: "real-estate-construction" },
    { name: "Strategic Consulting", slug: "strategic-consulting" },
    { name: "Project Coordination", slug: "project-coordination" },
    { name: "Digital Transformation", slug: "digital-transformation" },
    {
      name: "Environment & Sustainability",
      slug: "environment-sustainability",
    },
    { name: "Infrastructure & Resources", slug: "infrastructure-resource" },
    { name: "Projects", slug: "projects" },
    { name: "Strategic Advantage", slug: "strategic-advantages" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
      color: "hover:bg-[#0077B5]",
    },
    {
      name: "X",
      icon: X,
      url: "https://x.com",
      color: "hover:bg-[#000000]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:bg-[#E4405F]",
    },
  ];

  return (
    <footer className="bg-[#3d3d3d] text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
          {/* Useful Links */}
          <div className="w-full lg:w-auto">
            <h3 className="text-lg font-semibold mb-4 md:mb-6">Useful Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
              {usefulLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/${link.slug}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="w-full lg:w-auto flex flex-col items-start lg:items-end">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white group`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#EF4130] group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="text-center md:text-left">
            © {currentYear} RAUS. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            Designed by{" "}
            <a
              href="https://imaginetventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#EF4130] transition-colors"
            >
              ImagiNET Ventures
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
