from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from localflavor.us.models import USZipCodeField, USStateField
from colorful.fields import RGBColorField
from django.db.models import *


class User(AbstractUser):

    name = CharField(_("Name of User"), blank=True, max_length=255)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

