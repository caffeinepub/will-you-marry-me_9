# Will You Marry Me - Proposal Page

## Current State
Project currently has a birthday page for Aakash Sir with glassmorphism styling.

## Requested Changes (Diff)

### Add
- Romantic proposal page replacing the current content
- Animated pink/white romantic background (floating hearts, soft gradients)
- Central card with proposal question: "Will you marry me?"
- Two buttons: "Yes" and "No"
- "No" button moves away on hover (desktop) and on touch/click (mobile), staying within viewport
- On "Yes" click: show celebration screen with love meme image and "Love you" message

### Modify
- Replace existing birthday content with proposal content

### Remove
- Birthday-specific text, confetti emojis, Aakash Sir references

## Implementation Plan
1. Replace App.tsx with romantic proposal page
2. Animated gradient background in pink/white/rose tones with floating hearts
3. Glassmorphism card in the center with proposal text
4. Yes button (pink, prominent) and No button (gray, evasive)
5. No button teleports randomly within viewport on mouseover and touchstart
6. Yes click shows celebration screen: hearts animation + meme image + "Love you" message
7. Mobile-first, large touch targets, fully responsive
