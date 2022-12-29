from django.urls import path
from account import views


urlpatterns = [
    path("register/", view=views.register, name="register"),
]