# Introduction

English | [简体中文](./README_CN.md)

This project is built with **Vue 3.5, TypeScript, Vite, Element Plus, and UnoCSS**, aiming to provide a **clean, maintainable, and efficient** admin dashboard template.

While there are many admin templates available, I chose to build a new one for several key reasons:

1. **Outdated dependencies**\
   Many templates rely on old versions of Vue/Vite, making upgrades difficult and risky.\
   This project may also become outdated in the future, but its simplicity ensures smooth upgrading.

2. **Over-engineering**\
   Excessive abstraction limits flexibility.\
   In the age of AI, complex logic can be generated on demand instead of being locked behind heavy wrappers.

3. **Unnecessary configurations**\
   Many templates include numerous plugins and settings that most developers never use.\
   When you actually need something, simply ask AI to help you add it.

4. **Opinionated design**\
   Some open-source templates impose strong personal preferences.\
   This project avoids that and stays lightweight and generic.

A modern project should start simple:\
**minimal dependencies, consistent formatting tools, and clean Git workflows.**\
All business logic belongs entirely to the developer.

---

# Dependencies

### **axios + @tanstack/vue-query**

A powerful combination for requests and caching, removing the need for custom axios wrappers.

### **lodash-es**

A reliable utility library that prevents duplicated work.

### **vueuse**

Check VueUse before writing your own Hooks — chances are, it already exists.

### **Element Plus**

A stable and flexible UI library.

### **echarts**

Used only in the dashboard; safe to remove if unnecessary.

---

# vite.config.ts Overview

- **vue()** – Core Vue support
- **vueJsx()** – Enables JSX/TSX
- **UnoCSS()** – Utility-first CSS (remember to import `virtual:uno.css` in `main.ts`)
- **envParse()** – Improved environment variable hints
- **AutoImport()** – Auto-imports common Vue APIs
- **Components()** – Auto-registers Element Plus and local components
- **ElementPlus()** – Loads source styles to avoid missing styles
- **createSvgIconsPlugin()** – Auto-registers SVG icons in `assets/icons`
- **VueDevTools()** – Better development experience
- **viteMockServe()** – Local mock server support

Designed to be lightweight, predictable, and easy to extend.

---

# Code Formatting Tools

- **prettier** – Vue formatting
- **dprint** – High-performance formatter for multiple file types
- **stylelint** – CSS/SCSS validation
- **eslint** – Code quality checks
- **commitlint** – Commit convention enforcement (`pnpm cz` recommended)

---

# VS Code Extensions

## Recommended

- Vue (Official)
- ESLint
- Prettier
- Dprint Code Formatter
- Tailwind CSS IntelliSense
- GitLens

## Optional

- One Dark Pro
- Auto Close Tag
- Code Spell Checker
- Color Highlight
- vscode-icons
- Indent-Rainbow

---

# Conclusion

If you need a more feature-rich version — such as RBAC, permission buttons, theme switching, or i18n — please switch to the `full-dev` branch.\
That version is also written with clarity and simplicity in mind.

Remember:\
**A starter template is a reference, not a rule.\
Your project should follow your style, not someone else’s.**\

As I mentioned before, the `full-dev` branch is indeed fully featured, but it also imposes my own ideas. So it’s best to use it as a reference and make sure you really need to use it in full.

---

# A Friendly Reminder

- **Without proper code review, avoid creating global components lightly.**\
  Redundant implementations will accumulate quickly.

- **Don’t start a new project from an outdated one.**\
  Old code, old dependencies, and old design patterns will slow you down.

I’ve learned these lessons the hard way. Hopefully you won’t have to.
