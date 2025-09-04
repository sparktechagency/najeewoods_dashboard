

export const navItems = [
    { icon:"overview", text: "Dashboard", href: "/" },
    { icon:"users", text: "Users", href: "/users" },
    { icon: "moods", text: "Modds", href: "/moods" },
    { icon: "vides", text: "Vibes", href: "/vibes" },
    { icon: "music", text: "Music", href: "/music" },
    { icon: "podcast", text: "Podcasts", href: "/podcasts" },
    { icon: "subscriber", text: "Subscribers", href: "/subscribers" },
      {
      icon: "settings",
      text:"setting",
      submenu: [
        { icon:"about", text: "About us", href: "/settings/about-us" },
        { icon:"terms", text: "Terms & Conditions", href: "/settings/terms" },
        { icon:"privacy", text: "Privacy", href: "/settings/privacy" },
      ],
    },

  ];