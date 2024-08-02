from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication

@csrf_exempt
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def user_api(request):
    if request.method == 'GET':
        user = request.user
        if user.is_authenticated:
            return JsonResponse({'first_name':user.first_name,'last_name':user.last_name,'username': user.username,'email': user.email,}, status=200)
        else:
            return JsonResponse({'message': 'Unauthorized'}, status=401)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)
