import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# --- App Settings ---
APP_NAME = "BizWiki Knowledge Platform"
API_PREFIX = "/api"

# --- Google Gemini Settings ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# --- Supabase Settings ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")