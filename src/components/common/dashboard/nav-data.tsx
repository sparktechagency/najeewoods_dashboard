

export const navItems = [
    { icon:"overview",active_i:"overview", text: "Dashboard", href: "/dashboard" },
    { icon:"users",active_i:"users", text: "Users", href: "/dashboard/users" },
    { icon: "moods",active_i:"moods", text: "Modds", href: "/dashboard/moods" },
    { icon: "vides",active_i:"vides", text: "Vibes", href: "/dashboard/vibes" },
    { icon: "music",active_i:"music", text: "Music", href: "/dashboard/music" },
    { icon: "podcast",active_i:"podcast", text: "Podcasts", href: "/dashboard/podcasts" },
    { icon: "subscriber",active_i:"subscriber", text: "Subscribers", href: "/dashboard/subscribers" },
      {
      icon: "settings",
      active_i:"settings",
      text:"setting",
      submenu: [
        { icon:"about",active_i:"about", text: "About us", href: "/dashboard/settings/about-us" },
        { icon:"terms",active_i:"terms", text: "Terms & Conditions", href: "/dashboard/settings/terms" },
        { icon:"privacy",active_i:"privacy", text: "Privacy", href: "/dashboard/settings/privacy" },
      ],
    },

  ];