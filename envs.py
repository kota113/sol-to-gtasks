import os
import dotenv

dotenv.load_dotenv()
OAUTH2_CLIENT_ID = os.environ["OAUTH2_CLIENT_ID"]
OAUTH2_CLIENT_SECRET = os.environ["OAUTH2_CLIENT_SECRET"]
SESSION_SECRET = os.environ["SESSION_SECRET"]
