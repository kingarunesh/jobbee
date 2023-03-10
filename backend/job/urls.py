from django.urls import path
from job import views


urlpatterns = [
    path("jobs/", view=views.getAllJobs, name="jobs"),
    path("jobs/new/", view=views.newJob, name="new_job"),
    path("jobs/<str:pk>/", view=views.getJob, name="job"),
    path("jobs/<str:pk>/update/", view=views.updateJob, name="update_job"),
    path("jobs/<str:pk>/delete/", view=views.deleteJob, name="delete_job"),
    path("stats/<str:topic>/", view=views.getTopicStats, name="get_topic_stats"),
    path("jobs/<str:pk>/apply/", view=views.applyToJob, name="apply_to_job"),
    path("me/jobs/applied/", view=views.getCurrentUserAppliedJobs, name="current_user_applied_jobs"),
    path("me/jobs/", view=views.getCurrentUserJobs, name="current_user_jobs"),
    path("jobs/<str:pk>/check/", view=views.isApplied, name="is_apply_to_job"),
    path("jobs/<str:pk>/condidates/", view=views.getCondidateAppliedJob, name="condidates_apply_job")
]