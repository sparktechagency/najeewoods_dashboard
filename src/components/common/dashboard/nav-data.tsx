

export const navItems = [
    { icon:"overview", text: "Dashboard", href: "/dashboard" },
    { icon:"users", text: "Users", href: "/dashboard/users" },
    { icon: "moods", text: "Modds", href: "/dashboard/moods" },
    { icon: "vides", text: "Vibes", href: "/dashboard/vibes" },
    { icon: "music", text: "Music", href: "/dashboard/music" },
    { icon: "podcast", text: "Podcasts", href: "/dashboard/podcasts" },
    { icon: "subscriber", text: "Subscribers", href: "/dashboard/subscribers" },
      {
      icon: "settings",
      text:"setting",
      submenu: [
        { icon:"about", text: "About us", href: "/dashboard/settings/about-us" },
        { icon:"terms", text: "Terms & Conditions", href: "/dashboard/settings/terms" },
        { icon:"privacy", text: "Privacy", href: "/dashboard/settings/privacy" },
      ],
    },

  ];