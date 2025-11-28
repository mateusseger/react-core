// LOGOS
import logoHervalDark from "./logos/herval-dark.png"
import logoHervalLight from "./logos/herval-light.png"
import logoIplaceDark from "./logos/iplace-dark.svg"
import logoIplaceLight from "./logos/iplace-light.svg"
import logoTaqiDark from "./logos/taqi-dark.svg"
import logoTaqiLight from "./logos/taqi-light.svg"

export const logos = {
    herval: {
        dark: logoHervalDark,
        light: logoHervalLight,
    },
    iplace: {
        dark: logoIplaceDark,
        light: logoIplaceLight,
    },
    taqi: {
        dark: logoTaqiDark,
        light: logoTaqiLight,
    },
} as const

// Export individual logos for direct imports
export {
    logoHervalDark,
    logoHervalLight,
    logoIplaceDark,
    logoIplaceLight,
    logoTaqiDark,
    logoTaqiLight,
}
