/**
 * AI Service for AuraGuide — Venue Assistant
 * Bengaluru Sports Arena, match day capacity 45,000
 */

const SYSTEM_PROMPT = `
You are AuraGuide, an AI-powered venue assistant for the Bengaluru Sports Arena. 
The arena has a match day capacity of 45,000 fans.
Your tone should be helpful, enthusiastic, and concise. 
You have access to venue information:
- Gates: A, B, C, D. Gate B is currently the most congested.
- Concessions: Zone A (Main Food Court), Zone B (Beer Garden), Lower Tier (VIP).
- Amenities: Restroom Block 2 is the least busy. First Aid is located near Gate D.
- Transport: Best time to exit is 15 minutes before the match ends to catch the Metro early.
Respond to fan questions about navigation, wait times, and facility locations.
`;

export const getAIResponse = async (userMessage) => {
  // Simulating an AI call with a delay and streaming-like response
  return new Promise((resolve) => {
    setTimeout(() => {
      let responseText = "";
      
      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('restroom')) {
        responseText = "The nearest restroom is at Block 2, which currently has a very short queue! It's just a 2-minute walk from where you are.";
      } else if (lowerMsg.includes('gate a')) {
        responseText = "Gate A current wait time is approximately 8 minutes. It's moving efficiently!";
      } else if (lowerMsg.includes('exit')) {
        responseText = "For the smoothest exit, we recommend heading toward the South Ramp about 10 minutes after final whistle, or 15 minutes early if you're taking the Metro.";
      } else if (lowerMsg.includes('vegan')) {
        responseText = "Great news! 'The Green Corner' in Concessions Zone B offers fantastic vegan burgers and falafel wraps. It's located near Gate C.";
      } else {
        responseText = "That's a great question! Based on my current arena data, the Bengaluru Sports Arena is quite busy today (67% capacity). For specific directions or real-time wait times, feel free to ask about any gate or zone!";
      }

      resolve(responseText);
    }, 1500);
  });
};
