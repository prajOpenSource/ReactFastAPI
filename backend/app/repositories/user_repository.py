from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate


class UserRepository:

    # --------------------------------
    # GET ALL USERS
    # --------------------------------

    def get_all(
        self,
        db: Session
    ):
        result = db.execute(
            select(User)
        )

        return result.scalars().all()


    # --------------------------------
    # GET USER BY ID
    # --------------------------------

    def get_by_id(
        self,
        db: Session,
        user_id: int
    ):
        result = db.execute(
            select(User).where(
                User.id == user_id
            )
        )

        return result.scalar_one_or_none()


    # --------------------------------
    # GET USER BY EMAIL
    # --------------------------------

    def get_by_email(
        self,
        db: Session,
        email: str
    ):
        result = db.execute(
            select(User).where(
                User.email == email
            )
        )

        return result.scalar_one_or_none()


    # --------------------------------
    # CREATE USER
    # --------------------------------

    def create(
        self,
        db: Session,
        user_data: UserCreate
    ):

        user = User(
            name=user_data.name,
            role=user_data.role,
            email=user_data.email
        )

        db.add(user)

        db.commit()

        db.refresh(user)

        return user


    # --------------------------------
    # UPDATE USER
    # --------------------------------

    def update(
        self,
        db: Session,
        user: User,
        user_data: UserUpdate
    ):

        user.name = user_data.name
        user.role = user_data.role
        user.email = user_data.email

        db.commit()

        db.refresh(user)

        return user


    # --------------------------------
    # DELETE USER
    # --------------------------------

    def delete(
        self,
        db: Session,
        user: User
    ):

        db.delete(user)

        db.commit()