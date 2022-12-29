from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Min, Max, Avg, Count

from job.models import Job
from job.serializers import JobSerializer
from job.filters import JobsFilter


#!  Get All Jobs
@api_view(["GET"])
def getAllJobs(request):
    
    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by("id"))

    serializer = JobSerializer(filterset.qs, many=True)
    # return Response(serializer.data)
    return Response({"total jobs": len(serializer.data), "jobs": serializer.data})



#!  Get Single Job
@api_view(["GET"])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)



#!  New Job
@api_view(["POST"])
def newJob(request):
    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)
    


#!  Update Job
@api_view(["PUT"])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    job.title = request.data["title"]
    job.description = request.data["description"]
    job.email = request.data["email"]
    job.address = request.data["address"]
    job.jobType = request.data["jobType"]
    job.education = request.data["education"]
    job.industry = request.data["industry"]
    job.experience = request.data["experience"]
    job.salary = request.data["salary"]
    job.positions = request.data["positions"]
    job.company = request.data["company"]

    job.save()

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)



#!  Delete Job
@api_view(["DELETE"])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    job.delete()

    return Response({"Message": "Job Delete"}, status=status.HTTP_200_OK)


#!  Get Stats
@api_view(["GET"])
def getTopicStats(request, topic):
    args = {"title__icontains": topic}

    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({"message": "Not stats found for {topic}".format(topic=topic)})
    
    stats = jobs.aggregate(
        total_jobs = Count("title"),
        avg_positions = Avg("positions"),
        avg_salary = Avg("salary"),
        min_salary = Min("salary"),
        max_salary = Max("salary")
    )

    return Response(stats)
