import sys
import os

# Add parent directory to path to import main app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
