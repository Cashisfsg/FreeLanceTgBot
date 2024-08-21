import { withTV } from "tailwind-variants/transformer";

/** @type {import('tailwindcss').Config} */
export default withTV({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    corePlugins: {
        container: false
    },
    theme: {
        extend: {
            colors: {
                background: {
                    primary: "var(--bg-color)",
                    secondary: "var(--secondary_bg_color)",
                    section: "var(--section_bg_color)",
                    header: "var(--header_bg_color)",
                    button: "var(--button_color)"
                },
                typography: {
                    primary: "var(--text-color)",
                    hint: "var(--hint_color)",
                    link: "var(--link_color)",
                    button: "var(--button_text_color)",
                    accent: "var(--accent_text_color)",
                    "section-header": "var(--section_header_text_color)",
                    subtitle: "var(--subtitle_text_color)",
                    destructive: "var(--destructive_text_color)"
                },
                separator: "var(--section-separator_color)"
            }
        }
    },
    plugins: []
});
