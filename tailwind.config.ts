import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#080B12", navy: "#101828", lime: "#B8F05A", cyan: "#68E1FD" }, boxShadow: { glow: "0 0 35px rgba(184,240,90,.25)" } } }, plugins: [] };
export default config;
