from sqlmodel import create_engine,Session
from sqlalchemy.pool import StaticPool

'''
Relax, this is just a prototype.
SQLite was the easiest way to get a DB running.
Eventually we will put something more serious.
'''
sqlite_url = "sqlite://"

engine = create_engine(
    sqlite_url,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

def get_session():
    with Session(engine) as session:
        yield session