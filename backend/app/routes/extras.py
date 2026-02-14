import random
from fastapi import APIRouter

router = APIRouter(prefix="/api/extras", tags=["Extras"])

MOTIVATIONAL_QUOTES = [
    {"quote": "You are stronger than you think, braver than you believe, and more loved than you know.", "author": "A.A. Milne"},
    {"quote": "Every day may not be good, but there is something good in every day.", "author": "Alice Morse Earle"},
    {"quote": "You don't have to control your thoughts. You just have to stop letting them control you.", "author": "Dan Millman"},
    {"quote": "The only way out is through.", "author": "Robert Frost"},
    {"quote": "Be gentle with yourself. You're doing the best you can.", "author": "Unknown"},
    {"quote": "Healing is not linear. Be patient with yourself.", "author": "Unknown"},
    {"quote": "Your feelings are valid. Your story matters. You matter.", "author": "Unknown"},
    {"quote": "It's okay to not be okay. It's okay to ask for help.", "author": "Unknown"},
    {"quote": "Self-care is not selfish. You cannot serve from an empty vessel.", "author": "Eleanor Brownn"},
    {"quote": "The sun will rise and we will try again.", "author": "Unknown"},
    {"quote": "You are not your anxiety. You are not your depression. You are not your thoughts.", "author": "Unknown"},
    {"quote": "One small positive thought can change your whole day.", "author": "Zig Ziglar"},
    {"quote": "Breathe. It's just a bad day, not a bad life.", "author": "Unknown"},
    {"quote": "You have survived 100% of your worst days. You're doing great.", "author": "Unknown"},
    {"quote": "Stars can't shine without darkness.", "author": "D.H. Sidebottom"},
    {"quote": "Sometimes the bravest thing you can do is ask for help.", "author": "Unknown"},
    {"quote": "Progress, not perfection.", "author": "Unknown"},
    {"quote": "You are allowed to be a masterpiece and a work in progress simultaneously.", "author": "Sophia Bush"},
    {"quote": "Tough times never last, but tough people do.", "author": "Robert H. Schuller"},
    {"quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.", "author": "Ralph Waldo Emerson"},
]

EMERGENCY_RESOURCES = [
    {
        "name": "National Suicide Prevention Lifeline",
        "contact": "988",
        "description": "24/7 free and confidential support for people in distress",
        "url": "https://988lifeline.org",
    },
    {
        "name": "Crisis Text Line",
        "contact": "Text HOME to 741741",
        "description": "Free 24/7 crisis support via text message",
        "url": "https://www.crisistextline.org",
    },
    {
        "name": "SAMHSA National Helpline",
        "contact": "1-800-662-4357",
        "description": "Free referral and information service for mental health and substance abuse",
        "url": "https://www.samhsa.gov/find-help/national-helpline",
    },
    {
        "name": "NAMI Helpline",
        "contact": "1-800-950-6264",
        "description": "Information and support for mental health conditions",
        "url": "https://www.nami.org/help",
    },
    {
        "name": "International Association for Suicide Prevention",
        "contact": "Visit website for local resources",
        "description": "Global network of crisis centers",
        "url": "https://www.iasp.info/resources/Crisis_Centres/",
    },
]

SAL_RESPONSES = {
    "greeting": "Hi there! I'm SAL, your friendly guide to AI Listener. I'm here to help you navigate the platform and make the most of your experience.",
    "how_to_use": "Here's how to use AI Listener:\n\n1. **Share your feelings** - Type or speak how you're feeling in the chat\n2. **Get support** - Our AI will respond with empathy and helpful tips\n3. **Listen** - Use the voice playback to hear comforting responses\n4. **Connect** - Find others who understand what you're going through\n5. **Track** - Monitor your emotional journey over time",
    "features": "AI Listener offers:\n- Emotional AI chat with empathetic responses\n- Voice input and output for a more personal experience\n- Mood tracking to visualize your emotional journey\n- Connection with understanding users\n- Daily motivational quotes\n- Emergency support resources",
    "voice": "You can use voice features by clicking the microphone button to speak your feelings, and the speaker button to hear AI responses in a calming voice. You can choose different voice styles in your profile settings!",
    "mood_tracking": "Your mood is automatically tracked when you chat. Visit your profile to see your emotional journey over time displayed as a beautiful chart.",
    "connections": "You can connect with other users who share similar feelings. Go to the Connections page to discover and match with others. You can chat via text, share images, and even send voice notes!",
    "emergency": "If you or someone you know is in crisis, please use the Emergency Resources section in the app. You can find numbers for suicide prevention hotlines and crisis support services.",
    "default": "I'm not sure I understand that question, but I'm here to help! You can ask me about:\n- How to use the platform\n- Voice features\n- Mood tracking\n- Connecting with others\n- Emergency resources",
}


@router.get("/quote")
async def get_daily_quote():
    quote = random.choice(MOTIVATIONAL_QUOTES)
    return quote


@router.get("/emergency-resources")
async def get_emergency_resources():
    return EMERGENCY_RESOURCES


@router.post("/sal")
async def sal_chat(query: dict):
    """SAL assistant - answers basic navigation questions."""
    text = query.get("message", "").lower()

    if any(w in text for w in ["hello", "hi", "hey", "greet"]):
        return {"response": SAL_RESPONSES["greeting"]}
    elif any(w in text for w in ["how", "use", "start", "begin", "guide"]):
        return {"response": SAL_RESPONSES["how_to_use"]}
    elif any(w in text for w in ["feature", "what can", "do", "offer"]):
        return {"response": SAL_RESPONSES["features"]}
    elif any(w in text for w in ["voice", "speak", "microphone", "listen", "audio"]):
        return {"response": SAL_RESPONSES["voice"]}
    elif any(w in text for w in ["mood", "track", "chart", "graph", "emotion log"]):
        return {"response": SAL_RESPONSES["mood_tracking"]}
    elif any(w in text for w in ["connect", "match", "friend", "people", "user"]):
        return {"response": SAL_RESPONSES["connections"]}
    elif any(w in text for w in ["emergency", "crisis", "help", "suicide", "danger"]):
        return {"response": SAL_RESPONSES["emergency"]}
    else:
        return {"response": SAL_RESPONSES["default"]}
