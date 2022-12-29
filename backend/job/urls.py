from django.urls import path
from job import views


urlpatterns = [
    path("jobs/", view=views.getAllJobs, name="jobs"),
    path("jobs/new/", view=views.newJob, name="new_job"),
    path("jobs/<str:pk>/", view=views.getJob, name="job"),
]