from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self,email,name,user_name,password=None, **other_fields):
        if not email:
            raise ValueError('ERROR: Users must have an email address')
        if not user_name:
            raise ValueError('ERROR: Users must have an username')
        if not name:
            raise ValueError('ERROR: Users must have a name')
        
        email = self.normalize_email(email)
        user = self.model(email=email,name=name, user_name=user_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    
    def create_superuser(self, email, user_name, name, password, **other_fields):
        other_fields.setdefault('is_staff', True)

        if (other_fields.get('is_staff') is not True):
            raise ValueError('ERROR: Super user is_staff value must be true')
        
        return self.create_user(email, name, user_name, password, **other_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_profesor = models.BooleanField(default=False)

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email', 'user_name', 'name']

    def get_full_name(self):
        return self.name
    
    def __str__(self):
        return self.user_name


    
