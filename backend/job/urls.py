from django.urls import path
from job import views


urlpatterns = [
    path("jobs/", view=views.getAllJobs, name="jobs")
]