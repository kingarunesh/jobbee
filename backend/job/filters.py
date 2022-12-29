from django_filters import rest_framework as filters
from job.models import Job


class JobsFilter(filters.FilterSet):
    min_salary = filters.NumberFilter(field_name="salary" or 0, lookup_expr="gte")
    max_salary = filters.NumberFilter(field_name="salary" or 1000000, lookup_expr="lte")

    class Meta:
        model = Job
        fields = ("education", "industry", "experience", "min_salary", "max_salary")