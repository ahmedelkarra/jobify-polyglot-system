from django.http import JsonResponse
from rest_framework.views import csrf_exempt

# Create your views here.

@csrf_exempt
def register(request):
    return JsonResponse({'message':'Register API'},status=200)