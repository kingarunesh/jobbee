from django.urls import path
from job import views


urlpatterns = [
    path("jobs/", view=views.getAllJobs, name="jobs"),
    path("jobs/new/", view=views.newJob, name="new_job"),
    path("jobs/<str:pk>/", view=views.getJob, name="job"),
    path("jobs/<str:pk>/update/", view=views.updateJob, name="update_job"),
    path("jobs/<str:pk>/delete/", view=views.deleteJob, name="delete_job"),
    path("stats/<str:topic>/", view=views.getTopicStats, name="get_topic_stats")
]