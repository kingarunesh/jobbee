from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Min, Max, Avg, Count
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone

from job.models import Job, CandidatesApplied
from job.serializers import JobSerializer, CandidatesAppliedSerializer
from job.filters import JobsFilter


#!  Get All Jobs
@api_view(["GET"])
def getAllJobs(request):
    
    #   filter
    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by("id"))
    total_jobs = filterset.qs.count()

    #   pagination
    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)

    return Response({
        "count": total_jobs,
        "resPerPage": resPerPage, 
        "jobs": serializer.data
        })



#!  Get Single Job
@api_view(["GET"])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    condidates = job.candidatesapplied_set.all().count()

    serializer = JobSerializer(job, many=False)
    
    return Response({
        "job": serializer.data,
        "candidates": condidates
    })



#!  New Job
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def newJob(request):

    request.data["user"] = request.user

    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)
    


#!  Update Job
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({"message": "You can not update this job."}, status=status.HTTP_403_FORBIDDEN)

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
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({"message": "You can not update this job."}, status=status.HTTP_403_FORBIDDEN)

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




#!  Apply To Job
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == "":
        return Response({"error": "Please upload your resume."}, status=status.HTTP_400_BAD_REQUEST)
    
    if job.lastDate < timezone.now():
        return Response({"error": "You can not apply to this job, date is over."}, status=status.HTTP_400_BAD_REQUEST)
    
    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()

    print(alreadyApplied)

    if alreadyApplied:
        return Response({"error": "You have already applied for this job"}, status=status.HTTP_400_BAD_REQUEST)
    

    jobApplied = CandidatesApplied.objects.create(
        job=job,
        user=user,
        resume=user.userprofile.resume
    )

    return Response({ "applied": True, "job_id": jobApplied.id }, status=status.HTTP_200_OK)



#!  Current User Applied All Jobs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCurrentUserAppliedJobs(request):

    args = {"user_id": request.user.id}

    jobs = CandidatesApplied.objects.filter(**args)

    serializer = CandidatesAppliedSerializer(jobs, many=True)

    return Response(serializer.data)



#!  Check user had apply or not for this job
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def isApplied(request, pk):
    
    user = request.user

    job = get_object_or_404(Job, id=pk)

    applied = job.candidatesapplied_set.filter(user=user).exists()

    return Response(applied)



#!  Get Current User Create All Jobs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCurrentUserJobs(request):
    
    args = {"user": request.user.id}

    jobs = Job.objects.filter(**args)

    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)




#!  candidate applied for job
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCondidateAppliedJob(request, pk):
    
    user = request.user

    job = get_object_or_404(Job, id=pk)

    if job.user != user:
        return Response({"error": "You do not have permission to check condidates"}, status=status.HTTP_403_FORBIDDEN)
    

    condidates = job.candidatesapplied_set.all()

    serializer = CandidatesAppliedSerializer(condidates, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)