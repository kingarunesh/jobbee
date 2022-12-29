from django.urls import path
from account import views


urlpatterns = [
    path("register/", view=views.register, name="register"),
    path("me/", view=views.currentUser, name="current_user"),
    path("me/update/", view=views.updateUser, name="update_user"),
]