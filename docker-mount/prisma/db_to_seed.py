import os
import sqlite3

# Connect to the database
conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'definitions.db'))
cursor = conn.cursor()

# Enable to see if it's the right database file
#print(cursor.execute("SELECT name FROM sqlite_master WHERE type = 'table'").fetchall())

# Fetch all rows from the table
template = """{ term: "%s", meaning: "%s" },"""
rows = cursor.execute('SELECT row_id, term, meaning FROM definitions order by row_id').fetchall()

for row in rows:
#    print(row)
    print(template % (row[1], row[2]))

# Convert into typescript code
