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


class PaintAdditive(Model):
    name = CharField(max_length=20)
    cost = DecimalField(decimal_places=2, max_digits=6)


class ColorField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 10
        super(ColorField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs['widget'] = ColorWidget
        return super(ColorField, self).formfield(**kwargs)


class Paint(Model):
    color = RGBColorField()
    additives = ManyToManyField(PaintAdditive)


class NamedPaint(Model):
    name = CharField(max_length=30)
    paint = ForeignKey(Paint, on_delete=PROTECT)


class Palette(Model):
    name = CharField(max_length=30)
    paints = ManyToManyField(NamedPaint)


class ShippingInfo(Model):
    name = CharField(max_length=30)
    address1 = CharField(max_length=30)
    address2 = CharField(max_length=30)
    state = USStateField()
    zip = USZipCodeField(max_length=9)


class PaymentInfo(Model):
    pass


class Order(Model):
    shipping = ForeignKey(ShippingInfo, on_delete=PROTECT)
    payment = ForeignKey(PaymentInfo, on_delete=PROTECT)
    user = ForeignKey(User, on_delete=PROTECT)


class OrderItem(Model):
    paint = ForeignKey(NamedPaint, on_delete=PROTECT)
    quantity = PositiveSmallIntegerField()
    order = ForeignKey(Order, on_delete=PROTECT)


