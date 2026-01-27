# BCH Landing Page Optimization - Claude CLI Implementation Prompt

## Context & Background

You are working on the **Bharath Cycle Hub (BCH)** landing page - an e-cycle test ride booking service based in Bangalore. This is a React (Vite) + JavaScript + Tailwind CSS project that needs strategic optimization based on the StoryBrand framework.

---

## Project Understanding

### Business Model
BCH is NOT just a children's bike store. The target market is BROADER:

**Target Audience Segments:**
1. **Parents** - Looking to buy e-cycles for their children (3-6 years, 7-12 years, teenagers)
2. **Working Adults** - Want to breakthrough Bangalore traffic, commute efficiently
3. **Elderly Citizens** - Seeking travel convenience without physical strain
4. **Environmentalists** - Want to travel green, reduce carbon footprint
5. **General Fitness Enthusiasts** - Looking for active transportation

**Core Value Proposition:**
- Home test ride service for ₹99
- Expert brings 5+ curated e-cycles to customer's doorstep
- User selects cycles they want to test (personalized selection)
- Zero pressure buying environment
- Professional consultation included

**Key Differentiation:**
- Service business (selling appointments), not e-commerce (selling bikes directly)
- Local expertise (Bangalore only, positioned as a feature not limitation)
- Consultation-based approach (educated, expert-guided decisions)

---

## Current State Analysis

### Page Structure (18 Sections - TOO LONG)
Based on Gemini's screen recording analysis:

1. Hero (1.0 VH)
2. Trust Bar - Brand logos (0.2 VH)
3. Product Grid - 3 bike cards (1.5 VH)
4. Problem/Solution - Screen Time vs Green Time (1.0 VH)
5. Safety Features - Speed control, GPS (1.0 VH)
6. Video Social Proof - YouTube/Instagram stats (0.8 VH)
7. Consultation Value - Why ₹99? (0.5 VH)
8. Community - Group rides, calendar (1.0 VH)
9. Process - How Home Test Ride Works (0.8 VH)
10. Commitment - 4 pillars (0.8 VH)
11. Showroom/Map - Bangalore address (0.5 VH)
12. Happy Riders - Kids with bikes grid (1.0 VH)
13. Insurance/Care - Theft, damage, breakdown (1.0 VH)
14. Evaluation Process - 4-step professional approach (0.8 VH)
15. Text Testimonials - 3 Google reviews (0.7 VH)
16. Massive Trust Stat - 2.35 Lakh+ banner (0.4 VH)
17. FAQ - Accordion style (0.8 VH)
18. Footer (0.5 VH)

**Critical Issues:**
- Page is too long (scroll fatigue by section 12)
- Trust signals fragmented across 4+ sections
- Important sections buried (e.g., "Why ₹99?" at position 7)
- Missing post-payment confirmation screen
- Video section exists but needs optimization

### Current Booking Flow (Multi-Step Form)

**Step 1: Contact Details**
- Name (text input, required)
- Mobile Number (with country code, required)
- Security disclaimer shown

**Step 2: "Find Your Perfect Bike" - 10 Profiling Questions**
1. Who is the bicycle for? (Child 3-6/7-12/Teen/Adult)
2. Approximate height? (Under 3ft/3-4ft/4-5ft/Above 5ft)
3. Purchase window? (Immediate/Planned/Researching)
4. Primary requirement? (Durability/Safety/Performance/Aesthetics)
5. Cycling experience? (Beginner/Training Wheels/Confident/Enthusiast)
6. Primary terrain? (Gated Community/Paved Roads/Off-road/Versatile)
7. Usage frequency? (Everyday/Weekend/Occasional)
8. Braking preference? (Coaster/Hand Brakes/Disc/Recommended)
9. Important accessory? (Safety gear/Training wheels/Basket/Lock)
10. Importance of adjustability? (Critical/Moderate/Not a concern)

**Step 3: Payment**
- Visual summary of ₹99 fee breakdown
- User details recap
- Razorpay payment gateway
- "PAY ₹99" button

**Current Gap:** No explicit "Select 5 cycles you want to test" step (needs to be added)

### What's Working Well ✅
- Zero cognitive load in hero (clear headline)
- Consistent CTA color system (red = ₹99 booking)
- Professional tone (Tesla-like, not bubbly/kidish)
- Strong trust signals (2.35 Lakh+ users, 10K+ families)
- Clean product cards with good structure
- Multi-step form reduces cognitive load per step
- Typeform-style "one question at a time" UI

### Critical Gaps 🚨
1. Post-payment confirmation screen missing (user doesn't know "we'll call in 5 mins")
2. Form doesn't let users select specific 5 bikes they want to test
3. Page messaging focused heavily on "children" despite broader target audience
4. Process video exists but may need enhancement
5. Trust sections scattered (appears 4+ times)
6. Page too long (18 sections causing scroll fatigue)

---

## Strategic Framework: StoryBrand Principles

### The Five Core Soundbites (MUST BE DEVELOPED)

Currently undefined. Need to create based on broader target audience:

**Suggested Structure:**
1. **Problem/Hole:** "It's hard to find the perfect e-cycle without wasting time visiting multiple stores"
2. **Empathy:** "We know buying online is risky and choosing the wrong model is expensive"
3. **Answer:** "Our ₹99 home test ride brings 5+ expert-selected bikes to your doorstep"
4. **Change:** "You'll confidently choose the perfect bike with hands-on experience, zero pressure"
5. **End Result:** "You get the perfect e-cycle and we get peace of mind knowing you made the right choice"

These need to be tested for ZERO cognitive load with 5 people outside the industry.

### Three-Phase Campaign Structure

**Phase 1: CURIOSITY (Front Porch) - 0-3 seconds**
- Goal: Get attention, trigger "tell me more" response
- Use: Problem-focused headline (Soundbite #1)
- Location: Hero section only
- Current status: Working well

**Phase 2: ENLIGHTENMENT (Front Door) - 3-60 seconds**
- Goal: Educate on solution, build trust
- Use: Soundbites #2-3 (Empathy + Answer)
- Location: Product grid, process video, how it works, social proof
- Current status: Scattered, needs consolidation

**Phase 3: COMMITMENT (Inside House) - 60+ seconds**
- Goal: Convert to customers
- Use: Soundbites #4-5 (Change + End Result)
- Location: FAQ, final CTA, commitment pillars
- Current status: Working but buried under too much content

### Cognitive Load Principle
- Lower cognitive load = More orders (ALWAYS)
- Current page has medium-high load (18 sections, scattered trust signals)
- Target: Zero cognitive load on every section

---

## 23-Point Requirements Checklist

Reference the original requirements image. Key priorities:

**HIGH PRIORITY (Must implement in Phase 1):**
- ✅ Point 1: Product cards similar to emotorrad (clean, white backgrounds)
- ✅ Point 2: Viral video testimonials (Alok Kumar style)
- ⚠️ Point 3: Review landing page flow (needs consolidation from 18→12 sections)
- ✅ Point 4: Google Maps integration with reviews
- ✅ Point 5: Hide exclusive offer section (if exists)
- ⚠️ Point 6: 5+ CTA buttons after sections (currently 6, good but optimize placement)
- ✅ Point 7: Change text to formal/trust-gaining (already done)
- ✅ Point 10: Less text, more images
- 🚨 Point 11: Process video section (exists, may need enhancement)
- 🚨 Point 14: Form flow - KYC before payment (needs clarification on legal requirement)
- 🚨 Point 19: Post-payment "we'll call in 5 mins" screen (MISSING - CRITICAL)
- ✅ Point 20: Mobile UI/UX optimization
- ⚠️ Point 21: Target 30% conversion rate (need analytics setup)
- ✅ Point 22: "Bangalore only" messaging
- ✅ Point 23: Promote 0% EMI option

**MEDIUM PRIORITY (Phase 2):**
- Points 8, 9, 13, 16, 17, 18

**UNCLEAR (Need clarification):**
- Point 12: "On pot booking section" - meaning unclear
- Point 15: "10 top friction creations - 5ved" - meaning unclear

---

## Implementation Strategy

### Phase 1: Core Consolidation (Week 1-2)

**Objective:** Reduce page from 18 sections to 12 sections while maintaining all critical information.

**Sections to KEEP:**
1. Hero
2. Trust Bar (brands)
3. Product Grid (with enhanced selection UI)
4. **MOVE UP:** Why ₹99? (from position 7 to position 4)
5. Problem/Solution (but EXPAND messaging for all audiences)
6. Safety Features (make more visual)
7. **NEW:** Consolidated Social Proof (merge sections 6+12+15+16)
8. Process/Video Section (keep, enhance)
9. How It Works (4-step process)
10. Commitment (4 pillars)
11. FAQ
12. Footer

**Sections to HIDE/REMOVE (move to Phase 2):**
- Showroom/Map (Section 11) - secondary info, footer link sufficient
- Happy Riders detailed grid (Section 12) - merge highlights into consolidated social proof
- Insurance/Care detailed section (Section 13) - move to FAQ or footer
- Evaluation Process (Section 14) - key points merge into "Why ₹99?"
- Separate testimonials section (Section 15) - merge into consolidated social proof
- Separate trust stat banner (Section 16) - merge into consolidated social proof
- Community section (Section 8) - move to Phase 2 or merge into social proof

**Critical Additions:**
1. Post-payment confirmation screen with countdown timer
2. Cycle selection step in booking form
3. Sticky mobile CTA
4. Enhanced mobile responsiveness

### Phase 2: Optimization & Expansion (Week 3-4)

**Objectives:**
- A/B testing framework
- Real process video (if not ready in Phase 1)
- Full bike inventory display
- Advanced features (EMI calculator, interactive maps)
- Analytics and heatmap setup

---

## Detailed Implementation Tasks

### TASK 1: Expand Target Audience Messaging

**Problem:** Current copy is child-focused. Need to speak to ALL 5 audience segments.

**Changes Needed:**

**In Hero Section:**
- Current headline likely: "Give Your Child The Perfect E-Cycle"
- New headline (more inclusive): "Find Your Perfect E-Cycle - Try Before You Buy"
- Or: "Bangalore's Expert Home Test Ride Service"
- Subheadline: "For Kids, Commuters, Seniors & Everyone Between"

**In Problem/Solution Section:**
- Current: Focuses on "screen time" problem (child-centric)
- Expand to address:
  - Traffic congestion (adults)
  - Parking hassles (urban professionals)
  - Physical limitations (elderly)
  - Environmental impact (eco-conscious)
  - Exercise goals (fitness enthusiasts)

**Suggested Section Layout:**
```
Headline: "One Size Doesn't Fit All - That's Why We Bring Options to You"

5 Audience Cards:
1. "For Kids" - Active lifestyle, screen time alternative
2. "For Commuters" - Beat traffic, save money, stay fit
3. "For Seniors" - Easy mobility, pedal assist, safety features
4. "For Eco Warriors" - Zero emissions, green transportation
5. "For Fitness Buffs" - Active commuting, calorie burning
```

**In Product Grid:**
- Add filtering/categorization by user type
- "Show bikes for: Kids | Adults | Seniors | All"

**In Testimonials:**
- Ensure diversity: Show parent testimonial + working professional + senior citizen
- Current might be all parents - need representation

---

### TASK 2: Consolidate Social Proof Sections

**Current Scattered Trust Signals:**
- Section 6: Video Social Proof (YouTube/Instagram stats, video testimonial cards)
- Section 12: Happy Riders (grid of kids with bikes)
- Section 15: Text Testimonials (3 Google reviews)
- Section 16: Massive Trust Stat (2.35 Lakh+ banner)

**Consolidation Strategy:**

**Create ONE "Why 10,000+ Bangaloreans Trust Us" Section**

**Layout (Three Columns):**

**Column 1: Platform Stats**
- 750K Instagram followers (clickable)
- 250K YouTube subscribers (clickable)
- 10 Crore+ video views
- 4.7★ Google Rating (clickable to reviews)

**Column 2: Video Testimonials**
- 3 short video cards (15-20 seconds each)
- Autoplay on hover or click to play
- Diverse representation: Parent + Working adult + Senior
- Titles: "Father's Joy", "Beat Bangalore Traffic", "Senior Citizen's Independence"

**Column 3: Text Reviews**
- 3 Google-style review cards
- Include star rating, name, date, and 2-3 line review
- Diverse ages/use cases
- "See all reviews on Google" link

**Bottom of Section:**
- Large stat: "2.35 Lakh+ Bangalore residents trust e-cycles"
- Secondary stats: "10,000+ home test rides completed" | "98% buy after trying"

**Placement:** Position 7 (after Safety Features, before Process Video)

**Sections to Remove After This:**
- Section 12 (Happy Riders) - keep 3-4 images in consolidated section
- Section 15 (Text Testimonials) - merged
- Section 16 (Trust Stat Banner) - merged

---

### TASK 3: Restructure Booking Form - Add Cycle Selection

**Current Flow:**
Step 1: Contact Details → Step 2: 10 Profiling Questions → Step 3: Payment

**Problem:** Users answer questions but don't explicitly SELECT which 5 bikes they want to test.

**New Flow:**
Step 1: Contact Details → Step 2: Select Your 5 Bikes → Step 3: Profiling Questions (8 questions, reduced from 10) → Step 4: Payment

**Step 2: "Select 5 Bikes You Want to Test" - NEW**

**UI Design:**
- Show ALL available bikes (not just 3)
- Grid layout with bike cards
- Each card shows: Image, Name, Age/Use Category, Key specs (range, speed)
- Checkbox or heart icon to select
- Counter: "3/5 selected" (minimum 1, maximum 5)
- Filter options: "For Kids | For Adults | For Seniors | All"
- Search bar: "Search by brand, model, or feature"

**Selection Logic:**
- User must select at least 1 bike
- Can select up to 5 bikes
- "Continue" button only activates when 1-5 bikes selected
- Selected bikes are highlighted/saved

**Behind the scenes:**
- Store selected bike IDs in form state
- Pass to backend with booking data
- Technician sees selected bikes before arriving

**Step 3: Revised Profiling Questions (Reduce from 10 to 8)**

**Remove these 2 questions** (redundant after bike selection):
- "Who is the bicycle for?" (implied by bike selection)
- "Current cycling experience?" (can be inferred or asked by technician)

**Keep these 8 questions:**
1. Approximate height of rider?
2. Preferred purchase window?
3. Primary requirement?
4. Primary terrain?
5. Usage frequency?
6. Braking preference?
7. Important accessory?
8. Importance of adjustability?

**Reasoning:** Bike selection makes user intent clear, reducing need for certain profiling questions.

---

### TASK 4: Create Post-Payment Confirmation Screen

**Current Problem:** After payment, user doesn't know what happens next. Point #19 requires: "Make sure client knows we will call him within 5 mins"

**Screen Requirements:**

**Visual Elements:**
1. Success icon (large checkmark, green)
2. "Booking Confirmed!" headline
3. Order ID display
4. Countdown timer (5:00 → 0:00)
5. "What happens next" timeline
6. Action buttons (WhatsApp, Download Receipt, Add to Calendar)

**Information Architecture:**

**Section 1: Confirmation**
- Large green checkmark icon
- "Booking Confirmed!" (H1)
- "Order ID: #BCH12345"
- "Payment: ₹99 successful via Razorpay"

**Section 2: Immediate Next Step (Highlighted)**
- "Our team is calling you in: 4:32" (live countdown)
- "Please keep your phone (+91 XXXXX-XXXXX) ready"
- Phone icon animation (ringing)

**Section 3: What to Expect (Timeline)**
- Step 1 (Active): "Confirmation Call (5 mins)" - "We'll confirm your address and time slot"
- Step 2: "WhatsApp Details (10 mins)" - "Booking confirmation and preparation tips"
- Step 3: "Test Ride Day" - "Expert arrives with your 5 selected bikes"

**Section 4: Your Selected Bikes**
- Show 5 bikes user selected in Step 2
- Thumbnails + names
- "These bikes will be brought to your home"

**Section 5: Action Buttons**
- "Message Us on WhatsApp" (green button, opens WhatsApp)
- "Download Receipt" (secondary button, generates PDF)
- "Add to Google Calendar" (link, opens calendar with appointment)

**Section 6: Need Help?**
- Customer support phone number
- "Reschedule" link
- "Cancel booking" link (with refund policy)

**Technical Implementation Notes:**
- Create new route: `/confirmation/[bookingId]`
- Countdown timer: useEffect hook with setInterval
- Auto-refresh booking status every 30 seconds
- Show "Call completed ✓" when backend marks call as done
- Send WhatsApp message via API immediately after payment

---

### TASK 5: Optimize Mobile Experience

**Current Issues:**
- Page length causes excessive scrolling on mobile
- Touch targets may be too small in some sections
- Form inputs might trigger iOS zoom (if font-size < 16px)
- No sticky mobile CTA

**Mobile-Specific Changes:**

**1. Sticky Bottom CTA Bar (Mobile Only)**
- Fixed position at bottom of screen
- Visible on all pages except confirmation screen
- Design:
  - Left side: "Test Ride ₹99"
  - Right side: "Book Now" button (red, 60% width)
  - White background, shadow, border-top
- Appears after hero section (on scroll)
- Disappears when booking modal is open

**2. Mobile Hero Optimization**
- Reduce headline font size (text-3xl on mobile vs text-5xl on desktop)
- Single column layout (vs. potential two-column on desktop)
- CTA button: Full width (w-full) on mobile
- Reduce hero height (80vh mobile vs 100vh desktop)
- Remove background video on mobile (use static image for performance)

**3. Form Optimization**
- Input fields: min-height 48px, font-size 16px (prevents iOS zoom)
- Touch targets: 44px × 44px minimum
- Radio buttons/checkboxes: Large, easily tappable
- Number input: Show numeric keyboard on mobile
- Progress indicator: Larger, more visible
- "Back" button in multi-step form

**4. Product Grid Mobile Layout**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column (stacked)
- Cards: Full width on mobile, larger images
- "View Details" becomes full-width button

**5. Section Spacing**
- Reduce padding on mobile (py-8 vs py-16 on desktop)
- Smaller gaps between elements
- Compress vertical whitespace

**6. Mobile Navigation**
- Hamburger menu (if not already present)
- Sticky header with logo + menu icon + CTA
- Mobile menu slides in from side

---

### TASK 6: Move "Why ₹99?" Section Higher

**Current Position:** Section 7 (middle of page, timestamp 0:15)

**Problem:** Users see product grid → see ₹99 CTAs → wonder "why?" → have to scroll to find answer → some leave without finding it.

**Solution:** Move to Position 4 (immediately after Product Grid)

**New Page Flow:**
1. Hero
2. Trust Bar
3. Product Grid ← User sees bikes, gets interested
4. **Why ₹99?** ← User has objection, answer immediately
5. Problem/Solution
6. Safety Features
7. Consolidated Social Proof
...

**Enhanced Section Content:**

**Headline:** "Why Do We Charge ₹99 for a Test Ride?"

**Subheadline:** "This isn't just a booking fee - it's your guarantee of serious service"

**Three Key Points (Visual Cards):**
1. "Serious Commitment"
   - Icon: 🎯
   - Text: "We bring ₹2+ lakh worth of bikes to your home. ₹99 ensures you're as serious as we are."

2. "Expert Time & Service"
   - Icon: 👨‍🔧
   - Text: "45 minutes of personalized consultation, sizing, and safety briefing by certified technicians."

3. "Fully Adjustable"
   - Icon: 💰
   - Text: "₹99 is 100% adjustable against your bike purchase. You lose nothing."

**Visual Enhancement:**
- Large "₹99" in center with arrows pointing to 3 benefits
- Testimonial quote: "The ₹99 was the best investment - saved me from buying the wrong bike online" - Priya M., Whitefield

**CTA:** "Book Your Expert Home Visit - ₹99" (red button)

---

### TASK 7: Enhance Safety Features Section for All Audiences

**Current State:** Section 5 focuses on kid safety (speed control, GPS tracking)

**Problem:** Doesn't speak to adult/senior/commuter concerns

**Solution:** Expand to cover safety for ALL user types

**New Section Structure:**

**Headline:** "Safety Features That Matter to You"

**Tabbed Interface or Accordion:**

**Tab 1: "For Kids & Parents"**
- Speed limit controls (15 km/h, 20 km/h, 25 km/h settings)
- GPS tracking (live location sharing)
- Geofencing alerts (notifies if child leaves safe zone)
- Emergency SOS button
- Reflective safety strips
- Automatic headlights

**Tab 2: "For Commuters"**
- Disc brakes (all-weather stopping)
- Anti-theft GPS tracking
- Puncture-resistant tires
- Built-in lights (front/rear)
- Horn and bell
- Rearview mirrors

**Tab 3: "For Seniors"**
- Low step-through frame (easy mounting)
- Adjustable pedal assist (1-5 levels)
- Anti-slip pedals
- Comfortable wide saddle
- Shock absorption
- Walk assist mode

**Visual:** Interactive mockup showing safety features on actual bike image

---

### TASK 8: Problem/Solution Section - Multi-Audience Approach

**Current State:** Section 4 focuses on "Screen Time vs Green Time" (child-only problem)

**Problem:** Doesn't resonate with adults, seniors, commuters

**Solution:** Create problem/solution cards for each audience segment

**New Section Structure:**

**Headline:** "Your E-Cycle Journey Starts With a Real Problem"

**5 Problem Cards (User selects/hovers to see solution):**

**Card 1: Parents**
- Problem: "Kids spend 6+ hours on screens daily"
- Solution: "93% of kids using e-cycles show improved mental wellbeing"
- Visual: Phone screen → E-cycle outdoor scene

**Card 2: Commuters**
- Problem: "Bangalore traffic costs you 2+ hours daily"
- Solution: "E-cycle commuters save 40 mins per day + ₹3000/month on fuel"
- Visual: Traffic jam → Open road on e-cycle

**Card 3: Seniors**
- Problem: "Walking is hard, driving is stressful"
- Solution: "Pedal assist makes cycling 70% easier than walking"
- Visual: Person struggling → Smiling senior on e-cycle

**Card 4: Environmentalists**
- Problem: "Your car emits 4.6 tons of CO2 annually"
- Solution: "E-cycles reduce your carbon footprint by 80%"
- Visual: Car exhaust → Green leaf

**Card 5: Fitness Seekers**
- Problem: "No time for gym, commute is wasted time"
- Solution: "Burn 300 calories during your daily commute"
- Visual: Gym → Outdoor cycling

**Interaction:** Cards flip or expand on hover (desktop) or tap (mobile)

---

### TASK 9: Product Grid Enhancement

**Current State:** 3 bike cards shown (EM Doodle, EM Ranger, Wattson Wheelz)

**Problems:**
- Only 3 bikes visible (Point #18 wants all profiles shown)
- Not categorized by audience type
- No filtering options

**Solution:** Enhanced grid with filtering and expansion

**New Structure:**

**Filter Bar (Above Grid):**
- "All Bikes" (default)
- "For Kids (3-6)"
- "For Kids (7-12)"
- "For Teens"
- "For Adults"
- "For Seniors"
- Sort by: Price | Range | Popularity

**Grid Display:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Initial State:** Show 6 bikes (2 rows)

**Expansion:** "View All [X] E-Cycles" button → Expands to show full inventory

**Card Design Enhancement:**
- Add "Recommended for: [Age/Type]" badge
- Add "Most Popular" or "Best Seller" badge (if applicable)
- Show 0% EMI availability prominently
- Add "Quick View" button (opens specs modal without leaving page)
- Add "Add to Test Ride" button (adds to selection for booking)

**"Add to Test Ride" Feature:**
- User can add bikes from product grid
- Counter in header: "3 bikes added to test ride"
- Clicking counter opens mini-cart showing selected bikes
- "Book Test Ride" button in mini-cart

**Benefits:**
- Users can pre-select bikes before opening booking form
- Reduces friction in booking flow
- Answers Point #18 (show all profiles)

---

### TASK 10: Create Implementation Plan Document Structure

Before making any code changes, create a comprehensive documentation structure:

**Directory Structure to Create:**
```
/docs
  /implementation-plans
    01-page-consolidation.md
    02-target-audience-expansion.md
    03-social-proof-consolidation.md
    04-booking-form-enhancement.md
    05-post-payment-screen.md
    06-mobile-optimization.md
    07-section-repositioning.md
    08-safety-features-enhancement.md
    09-problem-solution-expansion.md
    10-product-grid-enhancement.md
  /storybrand-framework
    soundbites.md
    three-phase-campaign.md
    cognitive-load-audit.md
  /analytics
    conversion-goals.md
    heatmap-setup.md
    ab-test-plans.md
  /component-specs
    PostPaymentConfirmation.md
    ConsolidatedSocialProof.md
    EnhancedProductGrid.md
    MultiAudienceProblemSolution.md
    CycleSelectionStep.md
  /reference
    23-point-requirements.md
    gemini-analysis.md
    storybrand-document.md
```

**Each `.md` file should contain:**
- Objective statement
- Current state analysis
- Proposed changes (detailed)
- Technical requirements
- Component/file changes needed
- Success metrics
- Dependencies (what must be done first)
- Testing checklist

---

## Your Task as Claude CLI Agent

### PHASE 1: UNDERSTAND & DOCUMENT

**Step 1:** Read through this entire prompt carefully. Understand:
- The business model (not just kids bikes - 5 audience segments)
- Current page structure (18 sections)
- Booking flow (3-step form)
- StoryBrand framework principles
- 23-point requirements
- Implementation strategy (consolidate to 12 sections)

**Step 2:** Analyze the existing codebase:
- Locate the main landing page component (likely `TestRideLandingPage.jsx`)
- Identify all section components
- Map Gemini's section descriptions to actual component files
- Find the booking form components
- Check current state management approach
- Review routing structure

**Step 3:** Create the documentation structure outlined in TASK 10:
- Create `/docs` folder if it doesn't exist
- Create all subdirectories and markdown files
- Fill each markdown file with detailed implementation plans based on TASKS 1-9
- Each plan should be actionable, specific to this codebase, not generic

**Questions to ask yourself while documenting:**
- Which components need to be created new?
- Which components need to be modified?
- Which components need to be removed/hidden?
- What are the dependencies between changes?
- What's the safest order to implement changes?
- How can I preserve existing functionality while refactoring?

### PHASE 2: IMPLEMENT CHANGES SYSTEMATICALLY

**Order of Implementation (Safest to Most Complex):**

**Week 1 - Low Risk, High Impact:**
1. Create PostPaymentConfirmation component and route (TASK 4)
2. Move "Why ₹99?" section from position 7 to 4 (TASK 6)
3. Add sticky mobile CTA (TASK 5, sub-task 1)
4. Update Hero section copy for broader audience (TASK 1, hero only)
5. Create consolidated social proof section (TASK 2)

**Week 2 - Medium Risk, Critical Features:**
6. Add cycle selection step to booking form (TASK 3)
7. Reduce profiling questions from 10 to 8 (TASK 3)
8. Hide/remove sections for Phase 2 (Community, Showroom, Happy Riders details, etc.)
9. Expand Problem/Solution section for multi-audience (TASK 8)
10. Enhance Product Grid with filtering (TASK 9)

**Week 3 - Higher Risk, Structural Changes:**
11. Optimize mobile layouts across all sections (TASK 5, complete)
12. Expand Safety Features for all audiences (TASK 7)
13. Final page consolidation (18→12 sections)
14. Add analytics and tracking setup
15. Create A/B testing framework

**For Each Change:**
- Reference the appropriate markdown file in `/docs/implementation-plans/`
- Create new components in appropriate directories
- Maintain consistent naming conventions
- Ensure responsive design (mobile-first approach)
- Test on multiple screen sizes
- Commit with clear messages referencing task number

### PHASE 3: TESTING & VALIDATION

**After Each Major Change:**
1. Test on desktop (Chrome, Firefox, Safari)
2. Test on mobile (iOS Safari, Android Chrome)
3. Test form functionality end-to-end
4. Check responsive breakpoints
5. Verify no console errors
6. Test with different user scenarios (parent vs. adult vs. senior flow)

**Before Declaring Complete:**
- All 10 tasks from documentation have implementation files
- All critical gaps addressed (post-payment screen, cycle selection, consolidation)
- Mobile experience is smooth (sticky CTA, proper touch targets, no zoom issues)
- Page loads in < 3 seconds
- Form submission works end-to-end with payment
- Broader audience messaging is present in hero, problem/solution, and throughout

### PHASE 4: REPORT BACK

**Create a summary document:** `/docs/implementation-summary.md`

**Contents:**
- What was changed (list of all modifications)
- What was added (new components, features)
- What was removed/hidden (components moved to Phase 2)
- Current page structure (12 sections listed)
- Testing results (what works, what needs attention)
- Known issues or TODOs
- Recommendations for Phase 2
- Performance metrics (if measurable)

---

## Important Implementation Guidelines

### Code Style & Standards
- Use existing coding patterns in the project
- Maintain TypeScript typing if project uses TS (or add PropTypes if JS)
- Follow existing Tailwind utility class patterns
- Keep components small and focused (single responsibility)
- Use meaningful variable and function names
- Add comments for complex logic

### Responsive Design
- Mobile-first approach (start with mobile styles, use `md:` and `lg:` for larger screens)
- Test breakpoints: 320px, 375px, 768px, 1024px, 1440px
- Ensure touch targets are 44px × 44px minimum
- Font sizes: minimum 16px for form inputs (prevents iOS zoom)

### Performance Considerations
- Lazy load images below the fold
- Use `webp` format for images where possible
- Optimize video embeds (use poster images, lazy load)
- Minimize JavaScript bundle size
- Avoid large dependencies if alternatives exist

### State Management
- Use existing state management patterns (Redux, Context, or local state)
- For form state, consider using existing form library or creating clean local state
- Persist booking form data to localStorage (in case user refreshes)
- Clear sensitive data after successful submission

### Accessibility
- Semantic HTML (use `<button>`, `<nav>`, `<main>`, etc. appropriately)
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators visible
- Alt text for all images
- Color contrast ratios meet WCAG AA standards

### Git Practices
- Commit frequently with clear messages
- Use feature branches if appropriate
- Don't commit commented-out code (remove unused sections entirely for Phase 1)
- Update `.gitignore` if adding new directories

---

## Clarifications Needed (Ask Human Before Implementation)

Before starting implementation, you may need to ask the human:

1. **KYC Requirement (Point #14):** Is KYC legally required before payment, or can it be collected after booking confirmation?

2. **Point #12 Meaning:** What does "on pot booking section" mean? (On-the-spot booking? One-pot system?)

3. **Point #15 Meaning:** What does "10 top friction creations - 5ved" mean?

4. **Reference Websites (Point #9):** What are the specific reference websites from Arsalan that should be reviewed?

5. **Current Metrics:** Do you have access to analytics showing:
   - Current conversion rate
   - Bounce rate
   - Average session duration
   - Most common exit points

6. **Payment Gateway:** Is Razorpay already fully integrated and tested, or needs setup?

7. **Backend API:** What endpoints are available for:
   - Form submission
   - Payment processing
   - Booking confirmation
   - KYC verification
   - Sending WhatsApp messages

8. **Content Assets:** Are the following available:
   - Process video (or placeholder needed?)
   - Diverse testimonial videos (parent + adult + senior)
   - Product images for all bikes in inventory
   - Real customer photos for testimonials

---

## Success Criteria

**You'll know you've succeeded when:**

1. ✅ All 10 implementation plan markdown files are created and detailed
2. ✅ Page is consolidated from 18 sections to 12 sections
3. ✅ Post-payment confirmation screen is live and functional
4. ✅ Booking form includes cycle selection step
5. ✅ Messaging speaks to all 5 audience segments (not just kids)
6. ✅ Social proof is consolidated into one powerful section
7. ✅ Mobile experience is smooth with sticky CTA
8. ✅ "Why ₹99?" section is positioned early (position 4)
9. ✅ Product grid has filtering and expansion options
10. ✅ All critical gaps from Gemini analysis are addressed
11. ✅ No broken links or console errors
12. ✅ Form works end-to-end from selection to payment to confirmation
13. ✅ Page loads quickly (< 3 seconds on good connection)
14. ✅ Design is consistent and professional across all sections
15. ✅ Implementation summary document is complete

---

## Final Notes

**Remember:**
- This is a real business serving real customers
- Conversion rate goal is 30% (100 visitors → 30 bookings)
- Every change should reduce cognitive load
- Don't remove sections that answer critical objections
- Mobile experience is crucial (majority of traffic likely mobile)
- StoryBrand principles guide everything: Curiosity → Enlightenment → Commitment

**Philosophy:**
- Clarity always wins over cleverness
- Simple is better than complex
- Show, don't just tell (use videos, images, visual hierarchies)
- Trust is earned through consistency and professionalism
- The ₹99 booking is the product, not the bikes themselves

**Your role:**
- Understand the strategic intent, not just execute code changes
- Ask questions when requirements are unclear
- Make informed decisions when minor details are unspecified
- Document everything for future reference
- Think about maintainability and scalability

---

## Begin Implementation

Start with **PHASE 1: UNDERSTAND & DOCUMENT**. Create the full documentation structure first. Once all markdown files are created and detailed, move to PHASE 2 implementation.

Good luck! 🚀
