import csv
from io import StringIO

def to_csv(data,headers):
    """
    Converts a JSON array of objects to CSV
    """
    buffer = StringIO()
    writer = csv.DictWriter(buffer, fieldnames=headers)
    writer.writeheader()
    writer.writerows(data)
    return buffer.getvalue()