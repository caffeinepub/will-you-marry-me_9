# Will You Marry Me

## Current State
New project, no existing app.

## Requested Changes (Diff)

### Add
- Single-page romantic proposal experience
- Animated floating hearts background
- Proposal message/question: "Will You Marry Me?"
- YES button (large, prominent, rose pink)
- NO button that escapes the cursor on hover (moves to a random position on screen)
- On YES click: show a love meme image with celebration animation (confetti/hearts burst)
- Pink and white romantic color scheme
- Mobile-friendly layout (optimized for Chrome on phone)

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Frontend-only interactive page
2. Floating animated hearts in background using CSS animations
3. Centered proposal card with script/serif fonts
4. YES button triggers celebration screen with meme image
5. NO button uses JS mouseover event to teleport to random screen position (touch-aware for mobile: also moves on touchstart)
6. Celebration screen with falling hearts/confetti animation overlay
7. Use generated love-you-meme image at /assets/generated/love-you-meme.dim_600x500.png
