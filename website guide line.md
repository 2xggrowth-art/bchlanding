# BCH Store Website Guidelines

This document serves as the comprehensive style and technical guide for the BCH Store Landing Page.

## 1. Project Overview
**Name**: BCH Store (Bicycle Home Test Ride)
**Tech Stack**:
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Styled Components, Framer Motion
- **Backend/Service**: Firebase (likely, based on package.json details)
- **Payment**: Razorpay Integration

## 2. Design System

### Colors
Defined in `tailwind.config.js`.

| Color Name | Hex Code | Utility Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#DC2626` | `bg-primary`, `text-primary` | Main CTA buttons, highlights, accents |
| **Primary Dark** | `#991B1B` | `bg-primary-dark` | Hover states for primary buttons |
| **Dark** | `#0A0A0A` | `bg-dark`, `text-dark` | Backgrounds for dark sections, main headings |
| **Gray Text** | `#737373` | `text-gray-text` | Body text, descriptions |
| **Neon Blue** | `#00D4FF` | `text-neon-blue` | Accents, special effects |
| **Neon Green** | `#39FF14` | `text-neon-green` | Success indicators, eco-friendly accents |

### Typography
- **Headings**: `Bebas Neue`, `Impact`, `sans-serif` (Utility: `font-display`)
- **Body**: `Work Sans`, `system-ui`, `sans-serif` (Utility: `font-sans`)

### Spacing & Layout
- **Standard Section Padding**: `py-16 sm:py-24` (Recently adjusted to `py-8` for compact sections like Video Testimonials)
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6`

## 3. UI Components

### Buttons
**Unified CTA Button** (`CTAButton.jsx`)
Used for all secondary and primary actions (except Hero).
- **Style**: White background, bold text, styled hover effects.
- **Import**: `import CTAButton from './CTAButton';`
- **Usage**:
  ```jsx
  <CTAButton onClick={handleClick}>
    Test Ride
  </CTAButton>
  ```

### Animations
- **Library**: `framer-motion`
- **Common Effects**: Fade in up (`initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`)

## 4. Key Sections & Files

| Section | Component File | Description |
| :--- | :--- | :--- |
| **Hero** | `Hero.jsx` | Main landing area with Hero CTA. |
| **Products** | `ProductShowcase.jsx` | Display of e-cycles with "Test Ride" buttons. |
| **Video Stories** | `VideoTestimonials.jsx` | Horizontal scroll of customer stories. (Compacted layout) |
| **Insurance** | `BicycleInsurance.jsx` | Information about theft and damage protection. |
| **Process** | `ProcessVideo.jsx` | "How it works" steps and video. |
| **Safety** | `SafetyFeatures.jsx` | GPS, Speed control, and safety gear info. |
| **Community** | `Community.jsx` | Group rides and community stats. |
| **Final CTA** | `TestRideLandingPage.jsx` | Bottom of page conversion section. |

## 5. Deployment & Build
- **Dev Server**: `npm run dev` (Runs on `localhost:5173` typically)
- **Build**: `npm run build` (Generates `dist` folder)
- **Preview**: `npm run preview`

## 6. Maintenance Notes
- **CTA Updates**: When updating CTA buttons, ensure `CTAButton` is used for consistency unless specific custom styling is required (like the Hero button).
- **Responsive Design**: Always check changes on mobile (`sm:` breakpoint) and desktop (`lg:` breakpoint).
- **Images**: Use optimized images (WebP prefered) or high-quality Unsplash URLs for placeholders.
