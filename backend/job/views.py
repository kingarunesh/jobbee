from rest_framework.response import Response
from rest_framework.decorators import api_view
from job.models import Job
from job.serializers import JobSerializer
from django.shortcuts import get_object_or_404


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