from rest_framework.response import Response
from rest_framework.decorators import api_view
from job.models import Job
from job.serializers import JobSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status


#!  Get All Jobs
@api_view(["GET"])
def getAllJobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)



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