from app.database.connection import SessionLocal
from app.models.iam import Role


roles = [
    (
        "SUPER_ADMIN",
        "MSS platform administrator"
    ),

    (
        "ORG_ADMIN",
        "Organization administrator"
    ),

    (
        "EDITOR",
        "Can modify infrastructure"
    ),

    (
        "OPERATOR",
        "Operations user"
    ),

    (
        "VIEWER",
        "Read only user"
    )
]


db = SessionLocal()


for name,desc in roles:

    exists = db.query(Role)\
        .filter(Role.name==name)\
        .first()

    if not exists:

        db.add(
            Role(
                name=name,
                description=desc
            )
        )


db.commit()

print("Roles created")