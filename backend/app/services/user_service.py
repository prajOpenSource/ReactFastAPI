from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate, UserUpdate


class UserService:

    def __init__(self):

        self.repository = UserRepository()


    # --------------------------------
    # GET ALL USERS
    # --------------------------------

    def get_users(
        self,
        db: Session
    ):

        return self.repository.get_all(db)


    # --------------------------------
    # GET USER
    # --------------------------------

    def get_user(
        self,
        db: Session,
        user_id: int
    ):

        user = self.repository.get_by_id(
            db,
            user_id
        )

        if user is None:

            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return user


    # --------------------------------
    # CREATE USER
    # --------------------------------

    def create_user(
        self,
        db: Session,
        user_data: UserCreate
    ):

        # Check duplicate email
        existing_user = self.repository.get_by_email(
            db,
            user_data.email
        )

        if existing_user:

            raise HTTPException(
                status_code=409,
                detail="Email already registered"
            )


        return self.repository.create(
            db,
            user_data
        )


    # --------------------------------
    # UPDATE USER
    # --------------------------------

    def update_user(
        self,
        db: Session,
        user_id: int,
        user_data: UserUpdate
    ):

        user = self.get_user(
            db,
            user_id
        )


        # Check whether email belongs
        # to another user
        existing_user = self.repository.get_by_email(
            db,
            user_data.email
        )

        if (
            existing_user
            and existing_user.id != user_id
        ):

            raise HTTPException(
                status_code=409,
                detail="Email already registered"
            )


        return self.repository.update(
            db,
            user,
            user_data
        )


    # --------------------------------
    # DELETE USER
    # --------------------------------

    def delete_user(
        self,
        db: Session,
        user_id: int
    ):

        user = self.get_user(
            db,
            user_id
        )

        self.repository.delete(
            db,
            user
        )