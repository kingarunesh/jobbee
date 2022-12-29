from rest_framework.response import Response
from rest_framework.decorators import api_view
from job.models import Job
from job.serializers import JobSerializer


@api_view(["GET"])
def getAllJobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)