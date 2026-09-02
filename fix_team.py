content = open('e:/web/aboutus.html', 'r', encoding='utf-8').read()

# ---- 1. Fix CSS: update .team-avatar and .avatar-circle styles ----
# Find and replace the CSS block by looking for unique anchors
old_h = '      height: 160px;\n\n      background: linear-gradient(135deg, var(--primary-light), #d4e2f0);\n\n      display: flex;\n\n      align-items: center;\n\n      justify-content: center;\n\n    }\n\n    .team-avatar .avatar-circle {\n\n      width: 90px; height: 90px;\n\n      background: var(--primary);\n\n      border-radius: 50%;\n\n      display: flex;\n\n      align-items: center;\n\n      justify-content: center;\n\n      font-size: 1.8rem;\n\n      font-weight: 800;\n\n      color: #fff;\n\n      letter-spacing: -1px;\n\n    }'

new_h = """      height: 220px;
      background: linear-gradient(135deg, var(--primary-light), #d4e2f0);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .team-avatar.has-photo {
      height: 260px;
      background: #f0f4f8;
      padding: 0;
    }
    .team-avatar.has-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
      transition: transform 0.4s ease;
    }
    .team-card:hover .team-avatar.has-photo img {
      transform: scale(1.05);
    }
    .team-avatar .avatar-circle {
      width: 100px; height: 100px;
      background: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -1px;
    }"""

content2 = content.replace(old_h, new_h)
print("CSS fix applied:", content2 != content)

# ---- 2. Fix Hiren Patel card: replace broken avatar with proper photo ----
# Find the avatar-circle that has the broken img tag inside it
import re

# Pattern: the team-avatar div containing the broken avatar-circle with embedded img
pattern = r'(<div class="team-avatar">\s*\n\s*\n\s*<div class="avatar-circle">\s*<img src="E:\\web\\image\\3\.jpeg">NS</div>\s*\n\s*</div>)'
replacement = '''<div class="team-avatar has-photo">
            <img src="image/3.jpeg" alt="Hiren Patel" />
          </div>'''

content3, n = re.subn(pattern, replacement, content2)
print("Photo fix applied (regex):", n, "replacements")

if n == 0:
    # Fallback: manual string search using what we can see
    # Print a snippet around avatar-circle to debug
    idx = content2.find('avatar-circle')
    print("Snippet around avatar-circle:")
    print(repr(content2[idx-100:idx+200]))

open('e:/web/aboutus.html', 'w', encoding='utf-8').write(content3)
print("File written.")
