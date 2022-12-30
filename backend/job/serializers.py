from rest_framework import serializers
from job.models import Job, CandidatesApplied


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"
    


class CandidatesAppliedSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    
    class Meta:
        model = CandidatesApplied
        fields = ("user", "resume", "job", "createdAt")