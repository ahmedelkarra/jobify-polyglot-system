from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import json

@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user = User.objects.get(username=username)
            if user.check_password(password):
                Token.objects.filter(user=user).delete()
                token = Token.objects.create(user=user)
                return JsonResponse({'token': token.key}, status=200)
            else:
                return JsonResponse({'message': 'Wrong username or password'}, status=404)
        except:
            return JsonResponse({'message': 'Wrong username or password'}, status=404)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)
