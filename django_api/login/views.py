from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import json

# Create your views here.


@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username=data.get('username')
            password=data.get('password')
            user = User.objects.get(username=username)
            if user.check_password(password):  
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                return JsonResponse({'access': access_token,'refresh': refresh_token,}, status=200)
            else:
                return JsonResponse({'message': 'Worng username or password'}, status=404)                    
        except:
            return JsonResponse({'message': 'Worng username or password'}, status=404) 
    else:
        return JsonResponse({'message':'Method not allowed'},status=405)